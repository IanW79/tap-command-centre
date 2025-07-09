
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, 
  Flame, 
  TrendingUp, 
  Users, 
  Crown,
  Medal,
  Star
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  fuelLevel: number;
  fuelGain: number;
  position: number;
  badge?: string;
}

export function FuelLeaderboard() {
  const [activeTab, setActiveTab] = useState('fuel-gainers');

  const topFuelGainers: LeaderboardEntry[] = [
    { id: '1', name: 'Sarah Chen', fuelLevel: 185, fuelGain: 25, position: 1, badge: 'Fuel Master' },
    { id: '2', name: 'Mike Johnson', fuelLevel: 162, fuelGain: 22, position: 2, badge: 'Networking Pro' },
    { id: '3', name: 'Emma Wilson', fuelLevel: 158, fuelGain: 20, position: 3 },
    { id: '4', name: 'David Brown', fuelLevel: 145, fuelGain: 18, position: 4 },
    { id: '5', name: 'Lisa Garcia', fuelLevel: 142, fuelGain: 16, position: 5 }
  ];

  const activeNetworkers: LeaderboardEntry[] = [
    { id: '1', name: 'Alex Thompson', fuelLevel: 172, fuelGain: 15, position: 1, badge: 'Super Connector' },
    { id: '2', name: 'Rachel Kim', fuelLevel: 165, fuelGain: 14, position: 2 },
    { id: '3', name: 'Tom Anderson', fuelLevel: 159, fuelGain: 13, position: 3 },
    { id: '4', name: 'Maria Santos', fuelLevel: 154, fuelGain: 12, position: 4 },
    { id: '5', name: 'James Lee', fuelLevel: 148, fuelGain: 11, position: 5 }
  ];

  const profileChampions: LeaderboardEntry[] = [
    { id: '1', name: 'Jennifer Taylor', fuelLevel: 195, fuelGain: 8, position: 1, badge: 'Profile Perfect' },
    { id: '2', name: 'Chris Martin', fuelLevel: 178, fuelGain: 7, position: 2 },
    { id: '3', name: 'Amanda Davis', fuelLevel: 174, fuelGain: 6, position: 3 },
    { id: '4', name: 'Robert Miller', fuelLevel: 169, fuelGain: 5, position: 4 },
    { id: '5', name: 'Sophie Clark', fuelLevel: 163, fuelGain: 4, position: 5 }
  ];

  const communityContributors: LeaderboardEntry[] = [
    { id: '1', name: 'Kevin Walsh', fuelLevel: 167, fuelGain: 19, position: 1, badge: 'Community Star' },
    { id: '2', name: 'Nicole Turner', fuelLevel: 161, fuelGain: 17, position: 2 },
    { id: '3', name: 'Ryan Cooper', fuelLevel: 156, fuelGain: 16, position: 3 },
    { id: '4', name: 'Hannah Brooks', fuelLevel: 152, fuelGain: 15, position: 4 },
    { id: '5', name: 'Mark Phillips', fuelLevel: 147, fuelGain: 14, position: 5 }
  ];

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">
          {position}
        </span>;
    }
  };

  const getFuelColor = (fuel: number) => {
    if (fuel >= 150) return 'text-yellow-500';
    if (fuel >= 100) return 'text-green-500';
    if (fuel >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  const renderLeaderboard = (entries: LeaderboardEntry[], icon: React.ReactNode) => (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className={`flex items-center gap-4 p-4 rounded-lg ${
            index === 0 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200' :
            index === 1 ? 'bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200' :
            index === 2 ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200' :
            'bg-gray-50 border border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {getPositionIcon(entry.position)}
            <Avatar className="w-10 h-10">
              <AvatarImage src={entry.avatar} />
              <AvatarFallback>{entry.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{entry.name}</span>
              {entry.badge && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  {entry.badge}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1">
                <Flame className={`w-4 h-4 ${getFuelColor(entry.fuelLevel)}`} />
                <span className="text-sm font-medium">{entry.fuelLevel}%</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+{entry.fuelGain}%</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-tapinto-blue" />
          Weekly Leaderboards
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="fuel-gainers" className="text-xs">
              <Flame className="w-3 h-3 mr-1" />
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="networkers" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Networkers
            </TabsTrigger>
            <TabsTrigger value="profiles" className="text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              Profiles
            </TabsTrigger>
            <TabsTrigger value="community" className="text-xs">
              <Star className="w-3 h-3 mr-1" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fuel-gainers" className="mt-4">
            {renderLeaderboard(topFuelGainers, <Flame className="w-5 h-5" />)}
          </TabsContent>

          <TabsContent value="networkers" className="mt-4">
            {renderLeaderboard(activeNetworkers, <Users className="w-5 h-5" />)}
          </TabsContent>

          <TabsContent value="profiles" className="mt-4">
            {renderLeaderboard(profileChampions, <Trophy className="w-5 h-5" />)}
          </TabsContent>

          <TabsContent value="community" className="mt-4">
            {renderLeaderboard(communityContributors, <Star className="w-5 h-5" />)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
