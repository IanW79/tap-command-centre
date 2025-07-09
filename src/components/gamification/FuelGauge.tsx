
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Flame, 
  Trophy, 
  Clock, 
  Star, 
  Zap,
  TrendingUp,
  AlertTriangle,
  Gift
} from 'lucide-react';

interface FuelData {
  currentFuel: number;
  profileCompletion: number;
  activityFuel: number;
  nextMilestone: number;
  daysUntilDecay: number;
  recentActivity: string[];
  achievements: string[];
}

interface FuelGaugeProps {
  fuelData: FuelData;
  onBoostFuel?: () => void;
}

export function FuelGauge({ fuelData, onBoostFuel }: FuelGaugeProps) {
  const [animatedFuel, setAnimatedFuel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedFuel(fuelData.currentFuel);
    }, 300);
    return () => clearTimeout(timer);
  }, [fuelData.currentFuel]);

  const getFuelColor = (fuel: number) => {
    if (fuel >= 150) return 'text-yellow-500'; // Gold
    if (fuel >= 100) return 'text-green-500'; // Green
    if (fuel >= 50) return 'text-amber-500'; // Amber
    return 'text-red-500'; // Red
  };

  const getFuelZone = (fuel: number) => {
    if (fuel >= 150) return { zone: 'Gold Zone', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    if (fuel >= 100) return { zone: 'Bonus Zone', color: 'bg-green-100 text-green-800 border-green-200' };
    if (fuel >= 50) return { zone: 'Active Zone', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    return { zone: 'Critical Zone', color: 'bg-red-100 text-red-800 border-red-200' };
  };

  const getNextReward = (fuel: number) => {
    if (fuel < 25) return { level: 25, reward: 'Basic networking features' };
    if (fuel < 50) return { level: 50, reward: 'Enhanced profile customization' };
    if (fuel < 75) return { level: 75, reward: 'Advanced analytics access' };
    if (fuel < 100) return { level: 100, reward: 'Affiliate account activation' };
    if (fuel < 125) return { level: 125, reward: 'Premium networking tools' };
    if (fuel < 150) return { level: 150, reward: 'Rewards Club bonus month' };
    if (fuel < 175) return { level: 175, reward: 'Exclusive events access' };
    if (fuel < 200) return { level: 200, reward: 'Maximum status + VIP badge' };
    return { level: 200, reward: 'Maximum level achieved!' };
  };

  const fuelZone = getFuelZone(fuelData.currentFuel);
  const nextReward = getNextReward(fuelData.currentFuel);
  const progressToNext = Math.min(100, (fuelData.currentFuel / nextReward.level) * 100);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Flame className={`w-6 h-6 ${getFuelColor(fuelData.currentFuel)}`} />
          Fuel Gauge
          <Badge variant="outline" className={fuelZone.color}>
            {fuelZone.zone}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Fuel Gauge */}
        <div className="relative">
          <div className="w-48 h-48 mx-auto relative">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-200"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(animatedFuel / 200) * 283} 283`}
                className={`${getFuelColor(fuelData.currentFuel)} transition-all duration-1000 ease-out`}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-3xl font-bold ${getFuelColor(fuelData.currentFuel)}`}>
                {Math.round(animatedFuel)}%
              </div>
              <div className="text-sm text-gray-600">Fuel Level</div>
              {fuelData.currentFuel >= 100 && (
                <Zap className="w-4 h-4 text-yellow-500 animate-pulse mt-1" />
              )}
            </div>
          </div>
        </div>

        {/* Fuel Breakdown */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Profile Completion</span>
              <span>{fuelData.profileCompletion}%</span>
            </div>
            <Progress value={fuelData.profileCompletion} className="h-2" />
          </div>
          
          {fuelData.activityFuel > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Activity Bonus</span>
                <span>+{fuelData.activityFuel}%</span>
              </div>
              <Progress value={Math.min(100, fuelData.activityFuel)} className="h-2" />
            </div>
          )}
        </div>

        {/* Next Milestone */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Next Milestone: {nextReward.level}%</span>
          </div>
          <p className="text-sm text-blue-700 mb-3">{nextReward.reward}</p>
          <Progress value={progressToNext} className="h-2" />
          <p className="text-xs text-blue-600 mt-1">
            {nextReward.level - fuelData.currentFuel}% to go
          </p>
        </div>

        {/* Decay Warning */}
        {fuelData.daysUntilDecay <= 2 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-900">Fuel Decay Warning</span>
            </div>
            <p className="text-sm text-red-700 mb-3">
              Your fuel will decrease by 2% in {fuelData.daysUntilDecay} day{fuelData.daysUntilDecay !== 1 ? 's' : ''}
            </p>
            <Button size="sm" onClick={onBoostFuel} className="bg-red-600 hover:bg-red-700">
              <Zap className="w-4 h-4 mr-1" />
              Boost Fuel Now
            </Button>
          </div>
        )}

        {/* Recent Achievements */}
        {fuelData.achievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Recent Achievements
            </h4>
            <div className="space-y-1">
              {fuelData.achievements.map((achievement, index) => (
                <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                  {achievement}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            View Progress
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Gift className="w-4 h-4 mr-1" />
            Daily Challenges
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
