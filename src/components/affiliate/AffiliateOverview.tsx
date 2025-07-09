
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Award,
  Zap
} from 'lucide-react';

interface AffiliateOverviewProps {
  analytics: {
    total_referrals: number;
    total_earnings: number;
    current_balance: number;
    this_month_earnings: number;
    conversion_rate: number;
  } | null;
  userTier: string;
}

export function AffiliateOverview({ analytics, userTier }: AffiliateOverviewProps) {
  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'platinum': return 'bg-purple-600';
      default: return 'bg-gray-400';
    }
  };

  const getCommissionRate = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze': return '5%';
      case 'silver': return '7.5%';
      case 'gold': return '10%';
      case 'platinum': return '15%';
      default: return '5%';
    }
  };

  const monthlyTarget = 500; // £500 monthly target
  const progress = analytics ? (analytics.this_month_earnings / monthlyTarget) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Tier Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${getTierColor(userTier)} rounded-full flex items-center justify-center`}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold capitalize">{userTier} Affiliate</h3>
                <p className="text-gray-600">Introducer Commission: {getCommissionRate(userTier)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Direct Referrals</p>
              <p className="text-xl font-bold text-tapinto-blue">1.5%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">
                  £{analytics?.total_earnings?.toFixed(2) || '0.00'}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold text-blue-600">
                  £{analytics?.current_balance?.toFixed(2) || '0.00'}
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold text-purple-600">
                  {analytics?.total_referrals || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-600">
                  {analytics?.conversion_rate?.toFixed(1) || '0.0'}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Monthly Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>This Month: £{analytics?.this_month_earnings?.toFixed(2) || '0.00'}</span>
            <span>Target: £{monthlyTarget}</span>
          </div>
          <Progress value={Math.min(100, progress)} className="h-3" />
          <div className="text-center">
            {progress >= 100 ? (
              <Badge className="bg-green-100 text-green-800">🎉 Target Achieved!</Badge>
            ) : (
              <p className="text-sm text-gray-600">
                £{(monthlyTarget - (analytics?.this_month_earnings || 0)).toFixed(2)} to reach target
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
