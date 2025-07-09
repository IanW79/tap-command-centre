import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client'; // Disabled - using AWS
import { awsAPI } from '@/integrations/aws/client';
import { useAuth } from '@/hooks/useAuth';

interface NetworkingConnection {
  id: string;
  user_id: string;
  connected_user_id: string;
  connection_type: 'business' | 'social' | 'affiliate';
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  profile_data?: {
    name: string;
    company?: string;
    industry?: string;
    location?: string;
    avatar_url?: string;
  };
}

export function useNetworking() {
  const { user } = useAuth();
  const [connections, setConnections] = useState<NetworkingConnection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AWS-integrated networking data fetch
  const fetchNetworkingData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      console.log('🌐 Fetching networking data from AWS...');

      // Try to fetch from AWS
      const result = await awsAPI.getUserNetworkingData(user.id);
      
      if (result && result.connections) {
        setConnections(result.connections);
        console.log('✅ Networking data loaded from AWS:', result.connections.length);
      } else {
        // Create demo networking data for development
        const demoConnections = createDemoNetworkingData();
        setConnections(demoConnections);
      }

    } catch (error) {
      console.error('❌ Error fetching networking data:', error);
      
      // Fallback to demo data
      const demoConnections = createDemoNetworkingData();
      setConnections(demoConnections);
      setError('Using demo networking data - AWS integration pending');
      
    } finally {
      setLoading(false);
    }
  };

  // Create demo networking data
  const createDemoNetworkingData = (): NetworkingConnection[] => {
    if (!user) return [];

    return [
      {
        id: 'demo_conn_1',
        user_id: user.id,
        connected_user_id: 'demo_user_1',
        connection_type: 'business',
        status: 'accepted',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        profile_data: {
          name: 'Sarah Johnson',
          company: 'Digital Marketing Pro',
          industry: 'Marketing',
          location: 'London, UK'
        }
      },
      {
        id: 'demo_conn_2',
        user_id: user.id,
        connected_user_id: 'demo_user_2',
        connection_type: 'affiliate',
        status: 'accepted',
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        profile_data: {
          name: 'Michael Chen',
          company: 'TechFlow Solutions',
          industry: 'Technology',
          location: 'Manchester, UK'
        }
      },
      {
        id: 'demo_conn_3',
        user_id: user.id,
        connected_user_id: 'demo_user_3',
        connection_type: 'social',
        status: 'pending',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        profile_data: {
          name: 'Emma Wilson',
          company: 'Community Impact CIC',
          industry: 'Non-profit',
          location: 'Birmingham, UK'
        }
      }
    ];
  };

  // Send connection request
  const sendConnectionRequest = async (targetUserId: string, connectionType: NetworkingConnection['connection_type'] = 'business') => {
    if (!user) return null;

    try {
      setLoading(true);
      
      const connectionData = {
        userId: user.id,
        targetUserId: targetUserId,
        connectionType: connectionType
      };

      const result = await awsAPI.sendConnectionRequest(connectionData);
      
      if (result && result.connection) {
        setConnections(prev => [...prev, result.connection]);
        console.log('✅ Connection request sent:', result.connection);
        return result.connection;
      }

    } catch (error) {
      console.error('❌ Error sending connection request:', error);
      setError('Failed to send connection request');
    } finally {
      setLoading(false);
    }

    return null;
  };

  // Accept connection request
  const acceptConnection = async (connectionId: string) => {
    try {
      const result = await awsAPI.acceptConnectionRequest(connectionId);
      
      if (result && result.success) {
        setConnections(prev => 
          prev.map(conn => 
            conn.id === connectionId 
              ? { ...conn, status: 'accepted' as const }
              : conn
          )
        );
        console.log('✅ Connection accepted:', connectionId);
      }
    } catch (error) {
      console.error('❌ Error accepting connection:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNetworkingData();
    }
  }, [user]);

  return {
    connections,
    loading,
    error,
    sendConnectionRequest,
    acceptConnection,
    refreshConnections: fetchNetworkingData,
    // Statistics
    totalConnections: connections.length,
    businessConnections: connections.filter(c => c.connection_type === 'business').length,
    affiliateConnections: connections.filter(c => c.connection_type === 'affiliate').length,
    pendingRequests: connections.filter(c => c.status === 'pending').length
  };
}
