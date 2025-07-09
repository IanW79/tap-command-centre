
-- Add missing columns to package_builder_sessions table
ALTER TABLE public.package_builder_sessions 
ADD COLUMN IF NOT EXISTS current_step INTEGER DEFAULT 0;

ALTER TABLE public.package_builder_sessions 
ADD COLUMN IF NOT EXISTS completion_percentage INTEGER DEFAULT 0;

ALTER TABLE public.package_builder_sessions 
ADD COLUMN IF NOT EXISTS user_email TEXT;
