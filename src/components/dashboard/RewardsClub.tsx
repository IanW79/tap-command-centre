
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gift, 
  CreditCard, 
  TrendingUp, 
  Users,
  Star,
  Link,
  Wallet,
  Award,
  Percent,
  Share2,
  History,
  Store
} from 'lucide-react';

export function RewardsClub() {
  const [activeTab, setActiveTab] = useState('overview');

  const membershipTiers = [
    { name: 'Bronze', price: 10, discount: 15, color: 'bg-amber-600', current: false },
    { name: 'Silver', price: 25, discount: 30, color: 'bg-gray-400', current: true },
    { name: 'Gold', price: 50, discount: 50, color: 'bg-yellow-500', current: false },
    { name: 'Platinum', price: 100, discount: 75, color: 'bg-purple-600', current: false }
  ];

  const recentCashback = [
    { merchant: 'Amazon', amount: 12.50, date: '2024-01-15', status: 'Paid' },
    { merchant: 'John Lewis', amount: 8.75, date: '2024-01-14', status: 'Pending' },
    { merchant: 'Tesco', amount: 3.20, date: '2024-01-13', status: 'Paid' }
  ];

  const affiliateStats = {
    referrals: 23,
    commissionRate: 7.5,
    totalEarnings: 156.80,
    thisMonth: 47.25
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rewards Club</h1>
          <p className="text-gray-600 mt-1">Manage your membership and track rewards</p>
        </div>
        <Button variant="outline" className="gap-2">
          <CreditCard className="w-4 h-4" />
          Order NFC Card
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="cashback">Cashback</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Tier</p>
                    <p className="text-2xl font-bold">Silver</p>
                    <p className="text-sm text-blue-600">30% discount</p>
                  </div>
                  <Award className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cashback This Month</p>
                    <p className="text-2xl font-bold">£24.45</p>
                    <p className="text-sm text-green-600">+£12 vs last month</p>
                  </div>
                  <Wallet className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                    <p className="text-2xl font-bold">{affiliateStats.referrals}</p>
                    <p className="text-sm text-purple-600">{affiliateStats.commissionRate}% commission</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold">£{affiliateStats.totalEarnings}</p>
                    <p className="text-sm text-orange-600">£{affiliateStats.thisMonth} this month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Cashback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCashback.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{transaction.merchant}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+£{transaction.amount}</p>
                      <Badge className={
                        transaction.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membership Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Next tier: Gold (£50/month)</p>
                  <Progress value={50} className="mt-2" />
                  <p className="text-sm text-gray-500 mt-1">£25 more to unlock Gold benefits</p>
                </div>
                <div className="space-y-2">
                  {membershipTiers.map((tier, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${tier.current ? 'border-tapinto-blue bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                          <span className="font-medium">{tier.name}</span>
                          {tier.current && <Badge className="bg-tapinto-blue">Current</Badge>}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£{tier.price}/month</p>
                          <p className="text-sm text-gray-600">{tier.discount}% discount</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="membership" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Membership Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {membershipTiers.map((tier, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${tier.current ? 'border-tapinto-blue bg-blue-50' : ''}`}>
                    <div className="text-center">
                      <div className={`w-12 h-12 ${tier.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg">{tier.name}</h3>
                      <p className="text-2xl font-bold text-tapinto-blue">£{tier.price}</p>
                      <p className="text-sm text-gray-600">per month</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{tier.discount}% discount</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Up to £50 cashback</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{tier.discount / 5}% commission</span>
                        </div>
                      </div>
                      <Button className={`w-full mt-4 ${tier.current ? 'bg-tapinto-blue' : ''}`} variant={tier.current ? 'default' : 'outline'}>
                        {tier.current ? 'Current Plan' : 'Upgrade'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashback" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cashback History</CardTitle>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Available Balance</p>
                  <p className="text-xl font-bold text-green-600">£47.25</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCashback.map((transaction, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Store className="w-8 h-8 text-gray-400" />
                        <div>
                          <h3 className="font-semibold">{transaction.merchant}</h3>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">+£{transaction.amount}</p>
                        <Badge className={
                          transaction.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Your Referral Link</h3>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
                  <Link className="w-5 h-5 text-gray-500" />
                  <code className="flex-1 text-sm">https://tapinto.com/ref/yourcode123</code>
                  <Button size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{affiliateStats.referrals}</p>
                  <p className="text-sm text-gray-600">Total Referrals</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Percent className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{affiliateStats.commissionRate}%</p>
                  <p className="text-sm text-gray-600">Commission Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">£{affiliateStats.thisMonth}</p>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Partner Merchants</CardTitle>
              <p className="text-gray-600">4,500+ retailers via Auxilium Gives integration</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Amazon', 'John Lewis', 'Tesco', 'M&S', 'ASOS', 'Boots', 'Argos', 'Next'].map((merchant) => (
                  <div key={merchant} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                    <p className="font-medium">{merchant}</p>
                    <p className="text-sm text-green-600">Up to 5% back</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-gray-500" />
                  <span>Complete transaction history and payout records</span>
                </div>
                <p className="text-gray-600">Detailed transaction history interface would go here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
