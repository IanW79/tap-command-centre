import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  DollarSign, 
  Link, 
  CreditCard,
  TrendingUp,
  Award,
  Zap,
  Gift,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useAffiliate } from '@/hooks/useAffiliate';
import { useAuth } from '@/hooks/useAuth';
import { AffiliateOverview } from '@/components/affiliate/AffiliateOverview';
import { ReferralLinks } from '@/components/affiliate/ReferralLinks';
import { CommissionTracking } from '@/components/affiliate/CommissionTracking';
import { PayoutManagement } from '@/components/affiliate/PayoutManagement';

export function AffiliateCenter() {
  const { user, loading: authLoading } = useAuth();
  const {
    affiliateLinks,
    referrals,
    analytics,
    payouts,
    loading,
    error,
    createAffiliateLink,
    requestPayout,
    refreshData
  } = useAffiliate();

  const [activeTab, setActiveTab] = useState('overview');

  // Mock user tier - in real app, get from user profile
  const userTier = 'silver';

  console.log('AffiliateCenter render state:', { 
    user: !!user, 
    authLoading,
    loading, 
    error, 
    linksCount: affiliateLinks.length,
    referralsCount: referrals.length,
    analytics: !!analytics 
  });

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // For now, show the affiliate center with mock data if no user
  // This allows you to preview the functionality
  const mockAnalytics = analytics || {
    total_referrals: 12,
    total_earnings: 450.00,
    current_balance: 125.50,
    this_month_earnings: 85.25,
    conversion_rate: 8.5
  };

  const mockLinks = affiliateLinks.length > 0 ? affiliateLinks : [
    {
      id: '1',
      link_code: 'DEMO123',
      campaign_name: 'Social Media Campaign',
      clicks_count: 145,
      conversions_count: 12,
      is_active: true,
      created_at: new Date().toISOString()
    }
  ];

  const mockReferrals = referrals.length > 0 ? referrals : [
    {
      id: '1',
      referred_user_id: 'user1',
      referral_source: 'social',
      commission_rate: 7.5,
      commission_amount: 45.00,
      commission_type: 'introducer',
      status: 'confirmed',
      created_at: new Date().toISOString()
    }
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Affiliate Center</h1>
            <p className="text-gray-600 mt-1">
              Earn commissions by referring new users and introducing investments
            </p>
          </div>
          <Button onClick={refreshData} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Affiliate Center</h1>
          <p className="text-gray-600 mt-1">
            Earn commissions by referring new users and introducing investments
          </p>
          {!user && (
            <Badge variant="outline" className="mt-2">
              Preview Mode - Login to access full functionality
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-800">
            <Zap className="w-3 h-3 mr-1" />
            Fuel Boost Active
          </Badge>
          <Button variant="outline" className="gap-2">
            <Gift className="w-4 h-4" />
            Upgrade Tier
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="links">Referral Links</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="tools">Marketing Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AffiliateOverview analytics={mockAnalytics} userTier={userTier} />
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          <ReferralLinks 
            links={mockLinks} 
            onCreateLink={createAffiliateLink}
          />
        </TabsContent>

        <TabsContent value="commissions" className="space-y-6">
          <CommissionTracking referrals={mockReferrals} />
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <PayoutManagement 
            payouts={payouts}
            currentBalance={mockAnalytics?.current_balance || 0}
            onRequestPayout={requestPayout}
          />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Social Graphics</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm">Email Templates</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm">Success Stories</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                      <Link className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm">Training Guides</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NFC Card Programme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Physical NFC Cards</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Order custom NFC cards with your referral link for events and networking
                  </p>
                  <Button className="gap-2">
                    <CreditCard className="w-4 h-4" />
                    Order Cards
                  </Button>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  * Pricing: £5 per card (minimum 10 cards)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
