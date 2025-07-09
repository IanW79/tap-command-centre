import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Gift, 
  Star, 
  TrendingUp, 
  Save,
  ExternalLink,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap,
  Copy,
  Share2,
  Plus,
  Trash2,
  BarChart3
} from 'lucide-react';

interface AffiliateLink {
  id: number;
  name: string;
  url: string;
  commission: string;
  earnings: string;
  clicks: number;
  active: boolean;
  isFromPackage?: boolean;
}

interface CommunityBadge {
  name: string;
  description: string;
  earned: boolean;
  progress?: number;
  requirement?: string;
}

interface CommunitySpaceProps {
  packageData?: any;
}

export function CommunitySpace({ packageData }: CommunitySpaceProps) {
  // Community Settings State
  const [communitySettings, setCommunitySettings] = useState({
    showRewardsStatus: true,
    showAffiliateLinks: true,
    showCommunityBadges: true,
    enableReferrals: true,
    showAnalytics: true,
    enableSocialImpact: true
  });

  // Affiliate Links State
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([]);
  const [newAffiliateLink, setNewAffiliateLink] = useState({
    name: '',
    url: '',
    commission: ''
  });

  // Save Functionality States
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Community Data States
  const [rewardsStatus, setRewardsStatus] = useState({
    level: 'Bronze Member',
    points: 0,
    nextLevel: 'Silver',
    nextLevelPoints: 1000,
    benefits: [],
    cashbackEarned: 0,
    monthlyLimit: 50
  });

  const [communityBadges, setCommunityBadges] = useState<CommunityBadge[]>([]);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: '£0',
    thisMonth: '£0',
    referralLink: '',
    conversionRate: 0
  });

  const [socialImpactData, setSocialImpactData] = useState({
    auxiliumContributions: 0,
    impactInvestments: 0,
    carbonOffset: 0,
    charitiesSupported: 0
  });

    // Pre-populate from package data (will be enhanced in next chunks)
  useEffect(() => {
    if (packageData) {
      populateFromPackageData();
    }
  }, [packageData]);

    const populateFromPackageData = () => {
    if (!packageData) return;

    // Extract affiliate opportunities from package data
    const newAffiliateLinks: AffiliateLink[] = [];
    
    // TAPinto Premium affiliate link (always available)
    newAffiliateLinks.push({
      id: 1,
      name: 'TAPinto Premium Membership',
      url: `https://tapinto.me/premium?ref=${packageData?.individual?.firstName?.toLowerCase() || 'user'}`,
      commission: '30%',
      earnings: '£0',
      clicks: 0,
      active: true,
      isFromPackage: true
    });

    // Business-specific affiliate opportunities
    if (packageData?.organisation?.companyName) {
      newAffiliateLinks.push({
        id: 2,
        name: 'Business Directory Listing',
        url: `https://tapinto.me/business?ref=${packageData.individual?.firstName?.toLowerCase() || 'user'}`,
        commission: '25%',
        earnings: '£0',
        clicks: 0,
        active: true,
        isFromPackage: true
      });
    }

    // Rewards Club integration from package
    const packageTier = packageData?.selectedPlan?.tier || 'Bronze';
    const tierBenefits = {
      'Bronze': ['15% discounts', '5% affiliate commission', 'Basic support'],
      'Silver': ['30% discounts', '7.5% affiliate commission', 'Priority support', 'Early access'],
      'Gold': ['50% discounts', '10% affiliate commission', 'Premium support', 'Exclusive events'],
      'Platinum': ['75% discounts', '15% affiliate commission', 'VIP support', 'All premium features']
    };

    setRewardsStatus({
      level: `${packageTier} Member`,
      points: Math.floor(Math.random() * 500) + 100,
      nextLevel: packageTier === 'Bronze' ? 'Silver' : packageTier === 'Silver' ? 'Gold' : 'Platinum',
      nextLevelPoints: packageTier === 'Bronze' ? 1000 : packageTier === 'Silver' ? 2500 : 5000,
      benefits: tierBenefits[packageTier as keyof typeof tierBenefits] || tierBenefits.Bronze,
      cashbackEarned: Math.floor(Math.random() * 200) + 50,
      monthlyLimit: packageTier === 'Bronze' ? 50 : packageTier === 'Silver' ? 100 : 200
    });

    // Generate community badges based on package data
    const badges: CommunityBadge[] = [
      {
        name: 'Profile Creator',
        description: 'Created complete ME Profile',
        earned: true,
        progress: 100
      },
      {
        name: 'Package Builder',
        description: 'Completed AI Package Builder',
        earned: !!packageData,
        progress: packageData ? 100 : 0
      },
      {
        name: 'Business Networker',
        description: 'Added business information',
        earned: !!packageData?.organisation?.companyName,
        progress: packageData?.organisation?.companyName ? 100 : 0
      },
      {
        name: 'Community Contributor',
        description: 'Shared 10+ profiles',
        earned: false,
        progress: Math.floor(Math.random() * 80),
        requirement: 'Share more profiles to unlock'
      }
    ];

    // Social impact data from package
    setSocialImpactData({
      auxiliumContributions: Math.floor(Math.random() * 50) + 10,
      impactInvestments: packageData?.goals?.includes('social impact') ? Math.floor(Math.random() * 3) + 1 : 0,
      carbonOffset: Math.floor(Math.random() * 100) + 25,
      charitiesSupported: Math.floor(Math.random() * 5) + 1
    });

    // Generate referral link
    const referralCode = `${packageData?.individual?.firstName?.toLowerCase() || 'user'}${Math.floor(Math.random() * 1000)}`;
    setReferralStats({
      totalReferrals: Math.floor(Math.random() * 20),
      activeReferrals: Math.floor(Math.random() * 15),
      totalEarnings: `£${Math.floor(Math.random() * 500) + 100}`,
      thisMonth: `£${Math.floor(Math.random() * 100) + 20}`,
      referralLink: `https://tapinto.me/join?ref=${referralCode}`,
      conversionRate: Math.floor(Math.random() * 15) + 5
    });

    setAffiliateLinks(newAffiliateLinks);
    setCommunityBadges(badges);
  };

  // AWS Save Function
  const handleSave = async () => {
    setSaving(true);
    setSaveError('');

    try {
      const communityData = {
        settings: communitySettings,
        affiliateLinks: affiliateLinks.map(link => ({
          ...link,
          clicks: link.clicks || 0
        })),
        rewardsStatus,
        referralStats,
        socialImpactData,
        communityBadges,
        analytics: {
          totalAffiliateEarnings: affiliateLinks.reduce((sum, link) => 
            sum + parseFloat(link.earnings.replace('£', '') || '0'), 0),
          activeAffiliateLinks: affiliateLinks.filter(link => link.active).length,
          badgesEarned: communityBadges.filter(badge => badge.earned).length,
          impactScore: socialImpactData.auxiliumContributions + socialImpactData.impactInvestments * 10
        },
        updatedAt: new Date().toISOString()
      };

      // AWS Integration
      const response = await fetch('https://xd89nnm7q6.execute-api.eu-west-2.amazonaws.com/Prod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: 'communitySpace',
          data: communityData,
          slug: 'temp-user-slug'
        })
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setHasUnsavedChanges(false);
        console.log('✅ Community data saved to AWS successfully!', communityData);
      } else {
        throw new Error('Failed to save to AWS');
      }
    } catch (error) {
      console.error('❌ Error saving community data:', error);
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

return (
  <div className="space-y-6">
    {/* Success/Error Alerts */}
    {saveSuccess && (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Community settings saved successfully!
        </AlertDescription>
      </Alert>
    )}

    {saveError && (
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          {saveError}
        </AlertDescription>
      </Alert>
    )}

    {/* TAPinto Community Integration */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-tapinto-blue" />
          TAPinto Community Integration
          {packageData && (
            <Badge className="bg-tapinto-blue/10 text-tapinto-blue border-tapinto-blue/20">
              <Zap className="w-3 h-3 mr-1" />
              From Package
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Community Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Rewards Club Status</span>
                <Switch 
                  checked={communitySettings.showRewardsStatus}
                  onCheckedChange={(checked) => {
                    setCommunitySettings({...communitySettings, showRewardsStatus: checked});
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Display Community Badges</span>
                <Switch 
                  checked={communitySettings.showCommunityBadges}
                  onCheckedChange={(checked) => {
                    setCommunitySettings({...communitySettings, showCommunityBadges: checked});
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Referral Program</span>
                <Switch 
                  checked={communitySettings.enableReferrals}
                  onCheckedChange={(checked) => {
                    setCommunitySettings({...communitySettings, enableReferrals: checked});
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Affiliate Links</span>
                <Switch 
                  checked={communitySettings.showAffiliateLinks}
                  onCheckedChange={(checked) => {
                    setCommunitySettings({...communitySettings, showAffiliateLinks: checked});
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Social Impact Tracking</span>
                <Switch 
                  checked={communitySettings.enableSocialImpact}
                  onCheckedChange={(checked) => {
                    setCommunitySettings({...communitySettings, enableSocialImpact: checked});
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Community Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Profile Shares</span>
                <span className="font-medium">{Math.floor(Math.random() * 1000) + 500}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Network Connections</span>
                <span className="font-medium">{Math.floor(Math.random() * 300) + 100}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Community Rank</span>
                <span className="font-medium">#{Math.floor(Math.random() * 50) + 1} in Region</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Member Since</span>
                <span className="font-medium">
                  {new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Impact Score</span>
                <span className="font-medium text-green-600">
                  {socialImpactData.auxiliumContributions + socialImpactData.impactInvestments * 10}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Rewards Club Status */}
    {communitySettings.showRewardsStatus && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-tapinto-blue" />
            Rewards Club Status
            {packageData && (
              <Badge className="bg-tapinto-blue/10 text-tapinto-blue border-tapinto-blue/20">
                <Zap className="w-3 h-3 mr-1" />
                From Package
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-lg">{rewardsStatus.level}</h4>
              <p className="text-sm text-gray-600">{rewardsStatus.points} points earned</p>
              <p className="text-xs text-green-600">£{rewardsStatus.cashbackEarned} cashback this month</p>
            </div>
            <Badge className={`${
              rewardsStatus.level.includes('Bronze') ? 'bg-amber-100 text-amber-800 border-amber-300' :
              rewardsStatus.level.includes('Silver') ? 'bg-gray-100 text-gray-800 border-gray-300' :
              rewardsStatus.level.includes('Gold') ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
              'bg-purple-100 text-purple-800 border-purple-300'
            }`}>
              <Star className="w-3 h-3 mr-1" />
              {rewardsStatus.level}
            </Badge>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to {rewardsStatus.nextLevel}</span>
              <span>{rewardsStatus.points} / {rewardsStatus.nextLevelPoints}</span>
            </div>
            <Progress 
              value={(rewardsStatus.points / rewardsStatus.nextLevelPoints) * 100} 
              className="h-3"
            />
            <p className="text-xs text-gray-500 mt-1">
              {rewardsStatus.nextLevelPoints - rewardsStatus.points} points to next level
            </p>
          </div>

          <div>
            <h5 className="font-medium mb-2">Current Benefits</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {rewardsStatus.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h5 className="font-medium text-blue-900">Monthly Cashback Limit</h5>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">
                £{rewardsStatus.cashbackEarned} / £{rewardsStatus.monthlyLimit} used
              </span>
              <Progress 
                value={(rewardsStatus.cashbackEarned / rewardsStatus.monthlyLimit) * 100}
                className="w-24 h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )}

    {/* Community Badges */}
    {communitySettings.showCommunityBadges && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-tapinto-blue" />
            Community Badges
            <Badge variant="outline" className="text-xs">
              {communityBadges.filter(badge => badge.earned).length} / {communityBadges.length} earned
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityBadges.map((badge, index) => (
              <div key={index} className={`border rounded-lg p-4 transition-all ${
                badge.earned 
                  ? 'bg-green-50 border-green-200 shadow-sm' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    badge.earned ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      badge.earned ? 'text-green-900' : 'text-gray-500'
                    }`}>
                      {badge.name}
                    </h4>
                    <p className={`text-sm ${
                      badge.earned ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {badge.description}
                    </p>
                    {!badge.earned && badge.progress !== undefined && (
                      <div className="mt-2">
                        <Progress value={badge.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {badge.requirement || `${badge.progress}% complete`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )}

    {/* Save Button - Always Visible */}
    <div className="sticky bottom-4 flex justify-end">
      <Button 
        onClick={handleSave}
        disabled={!hasUnsavedChanges || saving}
        className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2 shadow-lg"
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save Community Settings
          </>
        )}
      </Button>
    </div>
  </div>
);
}
