
-- Create affiliate tracking tables
CREATE TABLE public.affiliate_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  link_code TEXT NOT NULL UNIQUE,
  campaign_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  clicks_count INTEGER DEFAULT 0,
  conversions_count INTEGER DEFAULT 0
);

CREATE TABLE public.affiliate_referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_user_id UUID REFERENCES auth.users NOT NULL,
  referred_user_id UUID REFERENCES auth.users,
  referral_source TEXT, -- 'link', 'profile_view', 'networking'
  affiliate_link_id UUID REFERENCES public.affiliate_links,
  commission_rate DECIMAL(5,2) NOT NULL,
  commission_amount DECIMAL(10,2) DEFAULT 0,
  commission_type TEXT NOT NULL, -- 'direct', 'introducer', 'network'
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'paid'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.affiliate_payouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payout_method TEXT NOT NULL,
  payout_details JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE,
  transaction_id TEXT
);

CREATE TABLE public.affiliate_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  total_referrals INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  current_balance DECIMAL(10,2) DEFAULT 0,
  this_month_earnings DECIMAL(10,2) DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  top_performing_link_id UUID REFERENCES public.affiliate_links,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.nfc_card_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  card_type TEXT NOT NULL, -- 'standard', 'premium', 'custom'
  quantity INTEGER NOT NULL DEFAULT 1,
  delivery_address JSONB NOT NULL,
  order_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered'
  tracking_number TEXT,
  cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfc_card_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their affiliate links" 
  ON public.affiliate_links FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their referrals" 
  ON public.affiliate_referrals FOR SELECT 
  USING (auth.uid() = affiliate_user_id);

CREATE POLICY "Users can view their payouts" 
  ON public.affiliate_payouts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their analytics" 
  ON public.affiliate_analytics FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their NFC orders" 
  ON public.nfc_card_orders FOR ALL 
  USING (auth.uid() = user_id);

-- Function to generate unique affiliate codes
CREATE OR REPLACE FUNCTION public.generate_affiliate_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    code := upper(substring(md5(random()::text) from 1 for 8));
    SELECT EXISTS(SELECT 1 FROM public.affiliate_links WHERE link_code = code) INTO exists_check;
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate commission rates based on user tier
CREATE OR REPLACE FUNCTION public.get_commission_rate(user_tier TEXT, commission_type TEXT)
RETURNS DECIMAL AS $$
BEGIN
  IF commission_type = 'direct' THEN
    RETURN 1.5; -- Fixed 1.5% for direct referrals
  ELSIF commission_type = 'introducer' THEN
    CASE user_tier
      WHEN 'bronze' THEN RETURN 5.0;
      WHEN 'silver' THEN RETURN 7.5;
      WHEN 'gold' THEN RETURN 10.0;
      WHEN 'platinum' THEN RETURN 15.0;
      ELSE RETURN 5.0;
    END CASE;
  ELSIF commission_type = 'network' THEN
    RETURN 3.0; -- Network referrals
  ELSE
    RETURN 0.0;
  END IF;
END;
$$ LANGUAGE plpgsql;
