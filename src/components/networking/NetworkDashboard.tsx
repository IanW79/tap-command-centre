
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Eye, 
  Heart, 
  UserPlus, 
  MessageCircle,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useNetworking } from '@/hooks/useNetworking';
import { useAuth } from '@/hooks/useAuth';

export function NetworkDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { networkingData, loading, respondToConnectionRequest, toggleFavourite } = useNetworking();
  const [activeTab, setActiveTab] = useState('overview');

  console.log('NetworkDashboard render state:', { 
    user: !!user, 
    authLoading, 
    loading, 
    networkingData 
  });

  const handleConnectionResponse = async (requestId: string, accept: boolean) => {
    await respondToConnectionRequest(requestId, accept);
  };

  const handleToggleFavourite = async (profileId: string) => {
    await toggleFavourite(profileId);
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tapinto-blue"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Use mock data for preview when no user is authenticated or when loading
  const mockAnalytics = user && !loading && networkingData.analytics ? networkingData.analytics : {
    profile_views_count: 42,
    connections_count: 18,
    messages_sent_count: 35,
    messages_received_count: 28,
    referrals_count: 5
  };

  const mockConnections = user && !loading && networkingData.connections.length > 0 ? networkingData.connections : [
    {
      id: '1',
      user1_id: 'user1',
      user2_id: 'user2',
      connected_at: new Date().toISOString(),
      connection_source: 'request'
    },
    {
      id: '2',
      user1_id: 'user1',
      user2_id: 'user3',
      connected_at: new Date(Date.now() - 86400000).toISOString(),
      connection_source: 'linkedin'
    }
  ];

  const mockProfileViews = user && !loading && networkingData.profileViews.length > 0 ? networkingData.profileViews : [
    {
      id: '1',
      viewed_profile_id: 'profile1',
      viewer_name: 'John Smith',
      viewer_email: 'john@example.com',
      created_at: new Date().toISOString(),
      referral_source: 'linkedin'
    },
    {
      id: '2',
      viewed_profile_id: 'profile1',
      viewer_name: 'Sarah Johnson',
      viewer_email: 'sarah@example.com',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      referral_source: 'direct'
    },
    {
      id: '3',
      viewed_profile_id: 'profile1',
      viewer_name: null,
      viewer_email: null,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      referral_source: 'qr_code'
    }
  ];

  const pendingRequests = user && !loading ? networkingData.connectionRequests.filter(req => req.status === 'pending') : [
    {
      id: '1',
      requester_id: 'user4',
      recipient_id: 'current_user',
      message: 'I would love to connect and discuss potential collaboration opportunities.',
      status: 'pending',
      created_at: new Date(Date.now() - 1800000).toISOString()
    }
  ];

  const mockFavourites = user && !loading && networkingData.favourites.length > 0 ? networkingData.favourites : [
    {
      id: '1',
      user_id: 'current_user',
      favourited_profile_id: 'profile2',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  const analytics = mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analytics?.profile_views_count || 0}</p>
                <p className="text-sm text-gray-600">Profile Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockConnections.length}</p>
                <p className="text-sm text-gray-600">Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingRequests.length}</p>
                <p className="text-sm text-gray-600">Pending Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analytics?.referrals_count || 0}</p>
                <p className="text-sm text-gray-600">Referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-tapinto-blue" />
            My Network
            {!user && (
              <Badge variant="outline" className="ml-2">
                Preview Mode
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requests">
                Requests
                {pendingRequests.length > 0 && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    {pendingRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="favourites">Favourites</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Recent Profile Views</h3>
                {mockProfileViews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No profile views yet</p>
                ) : (
                  <div className="space-y-3">
                    {mockProfileViews.slice(0, 5).map((view) => (
                      <div key={view.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {view.viewer_name ? view.viewer_name.charAt(0) : '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {view.viewer_name || 'Anonymous Viewer'}
                            </p>
                            <p className="text-xs text-gray-600">
                              {new Date(view.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {view.referral_source && (
                          <Badge variant="outline" className="text-xs">
                            {view.referral_source}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="mt-4">
              <div className="space-y-4">
                {pendingRequests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending connection requests</p>
                ) : (
                  pendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {request.requester_id.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Connection Request</p>
                          {request.message && (
                            <p className="text-sm text-gray-600 mt-1">{request.message}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {user ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleConnectionResponse(request.id, false)}
                            className="gap-1"
                          >
                            <XCircle className="w-3 h-3" />
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleConnectionResponse(request.id, true)}
                            className="gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Accept
                          </Button>
                        </div>
                      ) : (
                        <Badge variant="outline">Login to respond</Badge>
                      )}
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="connections" className="mt-4">
              <div className="space-y-4">
                {mockConnections.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No connections yet</p>
                ) : (
                  mockConnections.map((connection) => (
                    <div key={connection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Connected User</p>
                          <p className="text-xs text-gray-600">
                            Connected {new Date(connection.connected_at).toLocaleDateString()}
                          </p>
                          {connection.connection_source && (
                            <Badge variant="outline" className="text-xs mt-1">
                              via {connection.connection_source}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <MessageCircle className="w-3 h-3" />
                        Message
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="favourites" className="mt-4">
              <div className="space-y-4">
                {user ? (
                  mockFavourites.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No favourites yet</p>
                  ) : (
                    mockFavourites.map((favourite) => (
                      <div key={favourite.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>F</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Favourited Profile</p>
                            <p className="text-xs text-gray-600">
                              Added {new Date(favourite.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleFavourite(favourite.favourited_profile_id)}
                          className="gap-1"
                        >
                          <Heart className="w-3 h-3 fill-current" />
                          Remove
                        </Button>
                      </div>
                    ))
                  )
                ) : (
                  <p className="text-gray-500 text-center py-8">Login to see your favourites</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
