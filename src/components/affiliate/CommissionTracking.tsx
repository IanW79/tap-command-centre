
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AffiliateReferral {
  id: string;
  referred_user_id: string;
  referral_source: string;
  commission_rate: number;
  commission_amount: number;
  commission_type: string;
  status: string;
  created_at: string;
}

interface CommissionTrackingProps {
  referrals: AffiliateReferral[];
}

export function CommissionTracking({ referrals }: CommissionTrackingProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommissionTypeIcon = (type: string) => {
    switch (type) {
      case 'direct':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'introducer':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'network':
        return <Users className="w-4 h-4 text-green-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalPending = referrals
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.commission_amount, 0);

  const totalConfirmed = referrals
    .filter(r => r.status === 'confirmed')
    .reduce((sum, r) => sum + r.commission_amount, 0);

  const totalPaid = referrals
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + r.commission_amount, 0);

  return (
    <div className="space-y-6">
      {/* Commission Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold">£{totalPending.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-xl font-bold">£{totalConfirmed.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Paid Out</p>
                <p className="text-xl font-bold">£{totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Commissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Commissions</CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No commissions yet</h3>
              <p className="text-gray-600">Start referring users to earn your first commission</p>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.slice(0, 10).map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getCommissionTypeIcon(referral.commission_type)}
                    <div>
                      <p className="font-medium capitalize">
                        {referral.commission_type} Referral
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(referral.created_at).toLocaleDateString()} • 
                        {referral.commission_rate}% rate
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold">£{referral.commission_amount.toFixed(2)}</p>
                      <Badge className={getStatusColor(referral.status)}>
                        {getStatusIcon(referral.status)}
                        <span className="ml-1 capitalize">{referral.status}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
