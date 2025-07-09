
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  MessageSquare, 
  Lock,
  Settings,
  Plus,
  Eye,
  UserPlus,
  Activity,
  FileText,
  Calendar
} from 'lucide-react';

export function SecureCommunities() {
  const [activeTab, setActiveTab] = useState('overview');

  const communities = [
    {
      id: 1,
      name: 'Business Leaders Network',
      members: 47,
      activity: 89,
      privacy: 'Private',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Tech Innovators Hub',
      members: 23,
      activity: 67,
      privacy: 'Invite-only',
      status: 'Active'
    }
  ];

  const recentActivity = [
    { user: 'Sarah Chen', action: 'Posted in Business Leaders Network', time: '2 hours ago' },
    { user: 'Mike Johnson', action: 'Joined Tech Innovators Hub', time: '4 hours ago' },
    { user: 'Emma Davis', action: 'Shared document in Business Leaders', time: '6 hours ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Secure Communities</h1>
          <p className="text-gray-600 mt-1">Manage your private communities and member networks</p>
        </div>
        <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
          <Plus className="w-4 h-4" />
          Create Community
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Communities</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <Shield className="w-8 h-8 text-tapinto-blue" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold">70</p>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Messages Today</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Communities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {communities.map((community) => (
                  <div key={community.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-tapinto-blue rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{community.name}</h3>
                        <p className="text-sm text-gray-600">{community.members} members • {community.privacy}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">{community.status}</Badge>
                      <p className="text-sm text-gray-600 mt-1">{community.activity}% active</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-tapinto-blue rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm"><span className="font-medium">{activity.user}</span> {activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communities.map((community) => (
                  <div key={community.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-tapinto-blue" />
                        <div>
                          <h3 className="font-semibold">{community.name}</h3>
                          <p className="text-sm text-gray-600">{community.members} members</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Settings
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Privacy: {community.privacy}</span>
                      <span>Activity: {community.activity}%</span>
                      <Badge className="bg-green-100 text-green-800">{community.status}</Badge>
                    </div>
                    <Progress value={community.activity} className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Member Management</CardTitle>
                <Button variant="outline" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Invite Members
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Member management interface would go here with invite, approve, and moderate functionality.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Community Guidelines Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span>Content Filtering Rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gray-500" />
                  <span>Reported Content Review</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">End-to-End Encryption</h4>
                    <p className="text-sm text-gray-600">Secure messaging with encryption</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Ownership</h4>
                    <p className="text-sm text-gray-600">Full control over your community data</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">You Own</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Algorithm Independence</h4>
                    <p className="text-sm text-gray-600">No external algorithms affect your content</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Independent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
