
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Package, 
  TrendingUp,
  Calendar,
  MessageSquare,
  Star,
  ArrowRight,
  Zap
} from 'lucide-react';
import { FuelGauge } from '@/components/gamification/FuelGauge';
import { DailyChallenges } from '@/components/gamification/DailyChallenges';
import { FuelLeaderboard } from '@/components/gamification/FuelLeaderboard';

export function WelcomeDashboard() {
  console.log('WelcomeDashboard component is rendering');

  // Sample fuel data - in real app this would come from your data source
  const fuelData = {
    currentFuel: 67,
    profileCompletion: 45,
    activityFuel: 22,
    nextMilestone: 75,
    daysUntilDecay: 3,
    recentActivity: [
      'Profile updated',
      'New connection made',
      'Event attended'
    ],
    achievements: [
      'Profile Photo Added',
      'First Connection'
    ]
  };

  const stats = [
    {
      title: 'Active Packages',
      value: '12',
      change: '+2.1%',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Network Connections',
      value: '247', 
      change: '+5.4%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$3,240',
      change: '+12.5%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Events This Month',
      value: '8',
      change: '+1',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  const recentActivity = [
    { action: 'New package created', time: '2 hours ago', type: 'package' },
    { action: 'Profile updated', time: '4 hours ago', type: 'profile' },
    { action: 'Event scheduled', time: '1 day ago', type: 'event' },
    { action: 'New connection', time: '2 days ago', type: 'network' }
  ];

  const handleBoostFuel = () => {
    console.log('Boost fuel action triggered');
    // This would trigger fuel boost actions
  };

  const handleChallengeComplete = (challengeId: string) => {
    console.log('Challenge completed:', challengeId);
    // This would update fuel based on challenge completion
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your business today.</p>
        </div>
        <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90">
          Create New Package
        </Button>
      </div>

      {/* Fuel Gauge Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FuelGauge fuelData={fuelData} onBoostFuel={handleBoostFuel} />
        </div>
        
        <div className="lg:col-span-2">
          <DailyChallenges onChallengeComplete={handleChallengeComplete} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-between">
              Create Package
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Update Profile
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              View Directory
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Schedule Event
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100"
              onClick={() => window.location.href = '/tap-command'}
            >
              <span className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-600" />
                T.A.P. Command
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-tapinto-blue rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Package Engagement</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-tapinto-blue h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Network Growth</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Event Attendance</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Section */}
      <FuelLeaderboard />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Latest Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New Communities Feature</p>
                  <p className="text-xs text-gray-600">Create secure private communities for your network</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">New</Badge>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">E-Commerce Integration</p>
                  <p className="text-xs text-gray-600">Sell products directly through your packages</p>
                </div>
                <Badge className="bg-green-100 text-green-800">New</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Success Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium">Package Builder Success</p>
                <p className="text-xs text-gray-600">Your marketing package generated 15 new leads this week!</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium">Network Expansion</p>
                <p className="text-xs text-gray-600">Connected with 8 new professionals in your industry</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
