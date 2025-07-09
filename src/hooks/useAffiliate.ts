import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client'; // Disabled - using AWS
import { awsAPI } from '@/integrations/aws/client';
import { useAuth } from '@/hooks/useAuth';

interface AffiliateLink {
  id: string;
  link_code: string;
  campaign_name: string;
  user_id: string;
  created_at: string;
  commission_rate?: number;
  clicks?: number;
  conversions?: number;
}

export function useAffiliate() {
  const { user } = useAuth();
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate affiliate URL using TAPinto structure
  const generateAffiliateUrl = (baseUrl: string, affiliateCode: string) => {
    // From context: "TAPinto affiliate URLs are created by adding /ref/[ID]/ to any tapinto.me URL"
    return `${baseUrl}/ref/${affiliateCode}/`;
  };

  // AWS-integrated affiliate link fetching
  const fetchAffiliateLinks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      console.log('🔗 Fetching affiliate links from AWS...');

      // Try to fetch from AWS
      const result = await awsAPI.getUserAffiliateLinks(user.id);
      
      if (result && result.affiliateLinks) {
        setAffiliateLinks(result.affiliateLinks);
        console.log('✅ Affiliate links loaded from AWS:', result.affiliateLinks.length);
      } else {
        // Create default affiliate links for new users
        const defaultLinks = await createDefaultAffiliateLinks();
        setAffiliateLinks(defaultLinks);
      }

    } catch (error) {
      console.error('❌ Error fetching affiliate links:', error);
      
      // Fallback to demo affiliate links
      const demoLinks = createDemoAffiliateLinks();
      setAffiliateLinks(demoLinks);
      setError('Using demo affiliate links - AWS integration pending');
      
    } finally {
      setLoading(false);
    }
  };

  // Create demo affiliate links for development
  const createDemoAffiliateLinks = (): AffiliateLink[] => {
    if (!user) return [];

    const userPrefix = user.email.split('@')[0];
    const timestamp = Date.now().toString(36);

    return [
      {
        id: 'demo_rewards',
        link_code: `${userPrefix}-rewards-${timestamp}`,
        campaign_name: 'Rewards Club Referral',
        user_id: user.id,
        created_at: new Date().toISOString(),
        commission_rate: 25, // From context: GB News partnership offers 25% commission
        clicks: 0,
        conversions: 0
      },
      {
        id: 'demo_business',
        link_code: `${userPrefix}-business-${timestamp}`,
        campaign_name: 'Business Directory',
        user_id: user.id,
        created_at: new Date().toISOString(),
        commission_rate: 15,
        clicks: 0,
        conversions: 0
      },
      {
        id: 'demo_profile',
        link_code: `${userPrefix}-profile-${timestamp}`,
        campaign_name: 'ME Profile Referral',
        user_id: user.id,
        created_at: new Date().toISOString(),
        commission_rate: 10,
        clicks: 0,
        conversions: 0
      }
    ];
  };

  // Create default affiliate links for new users
  const createDefaultAffiliateLinks = async (): Promise<AffiliateLink[]> => {
    if (!user) return [];

    try {
      const defaultLinksData = {
        userId: user.id,
        email: user.email,
        linkTypes: [
          { type: 'rewards', commission: 25 },
          { type: 'business', commission: 15 },
          { type: 'profile', commission: 10 }
        ]
      };

      const result = await awsAPI.createDefaultAffiliateLinks(defaultLinksData);
      
      if (result && result.createdLinks) {
        console.log('✅ Default affiliate links created:', result.createdLinks.length);
        return result.createdLinks;
      }

    } catch (error) {
      console.warn('⚠️ Could not create default affiliate links:', error);
    }

    // Fallback to demo links
    return createDemoAffiliateLinks();
  };

  // Create new affiliate link
  const createAffiliateLink = async (campaignName: string, commissionRate: number = 10) => {
    if (!user) return null;

    try {
      setLoading(true);
      
      const userPrefix = user.email.split('@')[0];
      const campaignSlug = campaignName.toLowerCase().replace(/\s+/g, '-');
      const timestamp = Date.now().toString(36);
      
      const linkData = {
        userId: user.id,
        campaignName: campaignName,
        linkCode: `${userPrefix}-${campaignSlug}-${timestamp}`,
        commissionRate: commissionRate
      };

      const result = await awsAPI.createAffiliateLink(linkData);
      
      if (result && result.affiliateLink) {
        setAffiliateLinks(prev => [...prev, result.affiliateLink]);
        console.log('✅ New affiliate link created:', result.affiliateLink);
        return result.affiliateLink;
      }

    } catch (error) {
      console.error('❌ Error creating affiliate link:', error);
      setError('Failed to create affiliate link');
    } finally {
      setLoading(false);
    }

    return null;
  };

  // Get affiliate statistics
  const getAffiliateStats = async () => {
    if (!user) return null;

    try {
      const result = await awsAPI.getAffiliateStats(user.id);
      return result;
    } catch (error) {
      console.error('❌ Error fetching affiliate stats:', error);
      return {
        totalClicks: 0,
        totalConversions: 0,
        totalCommissions: 0,
        monthlyCommissions: 0
      };
    }
  };

  useEffect(() => {
    if (user) {
      fetchAffiliateLinks();
    }
  }, [user]);

  return {
    affiliateLinks,
    loading,
    error,
    createAffiliateLink,
    refreshLinks: fetchAffiliateLinks,
    generateAffiliateUrl,
    getAffiliateStats
  };
}
