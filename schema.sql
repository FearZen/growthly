-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1️⃣ USERS TABLE
CREATE TYPE user_role AS ENUM ('admin', 'viewer');
CREATE TYPE user_plan AS ENUM ('basic', 'pro', 'enterprise');
CREATE TYPE user_status AS ENUM ('active', 'trial', 'suspended');

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'viewer',
    plan user_plan DEFAULT 'basic',
    status user_status DEFAULT 'trial',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- users policies
CREATE POLICY "Users can view their own profile." 
ON users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users." 
ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can update users." 
ON users FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can insert users." 
ON users FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can delete users." 
ON users FOR DELETE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- 2️⃣ TRANSACTIONS TABLE
CREATE TYPE transaction_status AS ENUM ('paid', 'pending', 'failed');

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status transaction_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions." 
ON transactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions." 
ON transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);


-- 3️⃣ REVENUE_METRICS TABLE
CREATE TABLE revenue_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month DATE NOT NULL UNIQUE,  -- e.g., '2023-01-01'
    mrr NUMERIC(15, 2) NOT NULL,
    growth_percentage NUMERIC(5, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE revenue_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view revenue metrics." 
ON revenue_metrics FOR SELECT USING (auth.role() = 'authenticated');


-- 4️⃣ ANALYTICS_METRICS TABLE
CREATE TABLE analytics_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month DATE NOT NULL UNIQUE,
    retention_rate NUMERIC(5, 2) NOT NULL,
    churn_rate NUMERIC(5, 2) NOT NULL,
    avg_session_duration INTEGER NOT NULL, -- in seconds
    device_distribution JSONB NOT NULL DEFAULT '{"desktop": 0, "mobile": 0, "tablet": 0}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE analytics_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view analytics metrics." 
ON analytics_metrics FOR SELECT USING (auth.role() = 'authenticated');


-- Helper Function & Trigger to automatically create a user profile when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role, plan, status)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'), 
    new.email,
    'viewer',
    'basic',
    'trial'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Dummy Data for initial testing
INSERT INTO revenue_metrics (month, mrr, growth_percentage) VALUES 
('2023-11-01', 12500.00, 5.2),
('2023-12-01', 14200.00, 13.6),
('2024-01-01', 15800.00, 11.2),
('2024-02-01', 18450.00, 16.7),
('2024-03-01', 22100.00, 19.7);

INSERT INTO analytics_metrics (month, retention_rate, churn_rate, avg_session_duration, device_distribution) VALUES
('2024-03-01', 94.5, 3.2, 420, '{"desktop": 65, "mobile": 30, "tablet": 5}');
