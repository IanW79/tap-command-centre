
-- Create enhanced user authentication and package management tables

-- First, let's add a trigger to auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create package_builder_sessions table to store conversation data
CREATE TABLE IF NOT EXISTS public.package_builder_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT UNIQUE NOT NULL,
    conversation_data JSONB NOT NULL DEFAULT '{}',
    generated_package JSONB,
    pricing_data JSONB,
    values_modifiers JSONB DEFAULT '[]',
    completion_status TEXT DEFAULT 'in_progress' CHECK (completion_status IN ('in_progress', 'completed', 'converted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create me_profile_urls table for unique URL generation
CREATE TABLE IF NOT EXISTS public.me_profile_urls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    url_slug TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_package_subscriptions table to link users to their packages
CREATE TABLE IF NOT EXISTS public.user_package_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    package_builder_session_id UUID REFERENCES public.package_builder_sessions(id),
    package_data JSONB NOT NULL,
    pricing_data JSONB NOT NULL,
    subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'paused', 'cancelled')),
    billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'yearly')),
    stripe_subscription_id TEXT,
    activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profile_completion_tracking table
CREATE TABLE IF NOT EXISTS public.profile_completion_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    package_builder_completed BOOLEAN DEFAULT false,
    account_created BOOLEAN DEFAULT false,
    payment_completed BOOLEAN DEFAULT false,
    me_profile_started BOOLEAN DEFAULT false,
    me_profile_completed BOOLEAN DEFAULT false,
    company_profile_started BOOLEAN DEFAULT false,
    company_profile_completed BOOLEAN DEFAULT false,
    overall_completion_percentage INTEGER DEFAULT 0,
    current_step TEXT DEFAULT 'package_builder',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.package_builder_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.me_profile_urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_package_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_completion_tracking ENABLE ROW LEVEL SECURITY;

-- RLS policies for package_builder_sessions (public read, authenticated write)
CREATE POLICY "Anyone can read package builder sessions" ON public.package_builder_sessions
    FOR SELECT USING (true);

CREATE POLICY "Anyone can create package builder sessions" ON public.package_builder_sessions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update package builder sessions" ON public.package_builder_sessions
    FOR UPDATE USING (true);

-- RLS policies for me_profile_urls
CREATE POLICY "Users can read their own profile URLs" ON public.me_profile_urls
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile URLs" ON public.me_profile_urls
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile URLs" ON public.me_profile_urls
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for user_package_subscriptions
CREATE POLICY "Users can read their own subscriptions" ON public.user_package_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions" ON public.user_package_subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON public.user_package_subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for profile_completion_tracking
CREATE POLICY "Users can read their own completion tracking" ON public.profile_completion_tracking
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own completion tracking" ON public.profile_completion_tracking
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own completion tracking" ON public.profile_completion_tracking
    FOR UPDATE USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_package_builder_sessions_updated_at
    BEFORE UPDATE ON public.package_builder_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_me_profile_urls_updated_at
    BEFORE UPDATE ON public.me_profile_urls
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_package_subscriptions_updated_at
    BEFORE UPDATE ON public.user_package_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_completion_tracking_updated_at
    BEFORE UPDATE ON public.profile_completion_tracking
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to generate unique ME Profile URL slug
CREATE OR REPLACE FUNCTION generate_profile_url_slug(first_name TEXT, last_name TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Create base slug from first and last name
    base_slug := lower(trim(regexp_replace(first_name || '-' || last_name, '[^a-zA-Z0-9\-]', '', 'g')));
    final_slug := base_slug;
    
    -- Check if slug exists and increment counter if needed
    WHILE EXISTS (SELECT 1 FROM public.me_profile_urls WHERE url_slug = final_slug AND is_active = true) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter::TEXT;
    END LOOP;
    
    RETURN final_slug;
END;
$$;
