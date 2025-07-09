
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NetworkDashboard } from '@/components/networking/NetworkDashboard';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';

export function NetworkingHub() {
  const { user, loading } = useAuth();

  console.log('NetworkingHub render state:', { user: !!user, loading });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Networking Hub</h1>
          <p className="text-gray-600 mt-1">
            Manage your professional connections and grow your network
          </p>
          {!user && (
            <Badge variant="outline" className="mt-2">
              Preview Mode - Login to access full functionality
            </Badge>
          )}
        </div>
      </div>

      <NetworkDashboard />
    </div>
  );
}
