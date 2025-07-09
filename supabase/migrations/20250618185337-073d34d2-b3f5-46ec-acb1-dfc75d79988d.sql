
-- Create networking and connection tables
CREATE TABLE public.profile_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  viewed_profile_id UUID REFERENCES auth.users NOT NULL,
  viewer_id UUID REFERENCES auth.users,
  viewer_email TEXT,
  viewer_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  referral_source TEXT,
  converted_to_user BOOLEAN DEFAULT false
);

CREATE TABLE public.connection_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID REFERENCES auth.users NOT NULL,
  recipient_id UUID REFERENCES auth.users NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(requester_id, recipient_id)
);

CREATE TABLE public.connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user1_id UUID REFERENCES auth.users NOT NULL,
  user2_id UUID REFERENCES auth.users NOT NULL,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  connection_source TEXT, -- 'profile_view', 'mutual', 'suggestion'
  UNIQUE(user1_id, user2_id)
);

CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users NOT NULL,
  recipient_id UUID REFERENCES auth.users NOT NULL,
  thread_id UUID NOT NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  file_attachments JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE public.favourites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  favourited_profile_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, favourited_profile_id)
);

CREATE TABLE public.networking_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  profile_views_count INTEGER DEFAULT 0,
  connections_count INTEGER DEFAULT 0,
  messages_sent_count INTEGER DEFAULT 0,
  messages_received_count INTEGER DEFAULT 0,
  referrals_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.networking_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profile_views
CREATE POLICY "Users can view their own profile views" 
  ON public.profile_views FOR SELECT 
  USING (auth.uid() = viewed_profile_id);

CREATE POLICY "Anyone can create profile views" 
  ON public.profile_views FOR INSERT 
  WITH CHECK (true);

-- RLS Policies for connection_requests
CREATE POLICY "Users can view their connection requests" 
  ON public.connection_requests FOR SELECT 
  USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create connection requests" 
  ON public.connection_requests FOR INSERT 
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their connection requests" 
  ON public.connection_requests FOR UPDATE 
  USING (auth.uid() = recipient_id OR auth.uid() = requester_id);

-- RLS Policies for connections
CREATE POLICY "Users can view their connections" 
  ON public.connections FOR SELECT 
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can create connections" 
  ON public.connections FOR INSERT 
  WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

-- RLS Policies for messages
CREATE POLICY "Users can view their messages" 
  ON public.messages FOR SELECT 
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" 
  ON public.messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages" 
  ON public.messages FOR UPDATE 
  USING (auth.uid() = recipient_id);

-- RLS Policies for favourites
CREATE POLICY "Users can view their favourites" 
  ON public.favourites FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their favourites" 
  ON public.favourites FOR ALL 
  USING (auth.uid() = user_id);

-- RLS Policies for networking_analytics
CREATE POLICY "Users can view their analytics" 
  ON public.networking_analytics FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their analytics" 
  ON public.networking_analytics FOR ALL 
  USING (auth.uid() = user_id);

-- Functions for networking analytics
CREATE OR REPLACE FUNCTION public.update_networking_analytics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update analytics when profile views are added
  IF TG_TABLE_NAME = 'profile_views' THEN
    INSERT INTO public.networking_analytics (user_id, profile_views_count)
    VALUES (NEW.viewed_profile_id, 1)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      profile_views_count = networking_analytics.profile_views_count + 1,
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for updating analytics
CREATE TRIGGER update_networking_analytics_trigger
  AFTER INSERT ON public.profile_views
  FOR EACH ROW EXECUTE FUNCTION public.update_networking_analytics();
