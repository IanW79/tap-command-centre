
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  CheckCircle2, 
  Clock, 
  Flame,
  Users,
  Share2,
  Calendar,
  User,
  Zap
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  fuelReward: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
  icon: React.ComponentType<any>;
  action: string;
}

interface DailyChallengesProps {
  onChallengeComplete?: (challengeId: string) => void;
}

export function DailyChallenges({ onChallengeComplete }: DailyChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    // Initialize daily challenges
    const dailyChallenges: Challenge[] = [
      {
        id: 'complete-bio',
        title: 'Complete Your Bio',
        description: 'Write or update your professional bio',
        fuelReward: 5,
        completed: false,
        progress: 0,
        maxProgress: 1,
        icon: User,
        action: 'Edit Profile'
      },
      {
        id: 'network-connections',
        title: 'Make New Connections',
        description: 'Connect with 2 new people today',
        fuelReward: 6,
        completed: false,
        progress: 0,
        maxProgress: 2,
        icon: Users,
        action: 'Browse Directory'
      },
      {
        id: 'share-profile',
        title: 'Share Your Profile',
        description: 'Share your ME Profile with someone new',
        fuelReward: 3,
        completed: false,
        progress: 0,
        maxProgress: 1,
        icon: Share2,
        action: 'Share Profile'
      },
      {
        id: 'attend-event',
        title: 'Join Community Event',
        description: 'Attend or schedule a community event',
        fuelReward: 8,
        completed: false,
        progress: 0,
        maxProgress: 1,
        icon: Calendar,
        action: 'View Events'
      }
    ];

    setChallenges(dailyChallenges);
    updateTimeUntilReset();
    
    const timer = setInterval(updateTimeUntilReset, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const updateTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    setTimeUntilReset(`${hours}h ${minutes}m`);
  };

  const handleChallengeAction = (challenge: Challenge) => {
    if (challenge.completed) return;
    
    // Simulate challenge progress
    const updatedChallenges = challenges.map(c => {
      if (c.id === challenge.id) {
        const newProgress = Math.min(c.maxProgress, c.progress + 1);
        const completed = newProgress >= c.maxProgress;
        
        if (completed && onChallengeComplete) {
          onChallengeComplete(c.id);
        }
        
        return { ...c, progress: newProgress, completed };
      }
      return c;
    });
    
    setChallenges(updatedChallenges);
  };

  const totalFuelAvailable = challenges.reduce((sum, challenge) => sum + challenge.fuelReward, 0);
  const earnedFuel = challenges
    .filter(c => c.completed)
    .reduce((sum, challenge) => sum + challenge.fuelReward, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-tapinto-blue" />
            Daily Challenges
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              <Clock className="w-3 h-3 mr-1" />
              Resets in {timeUntilReset}
            </Badge>
            <Badge className="bg-tapinto-blue text-white">
              <Flame className="w-3 h-3 mr-1" />
              {earnedFuel}/{totalFuelAvailable}%
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`p-4 rounded-lg border ${
              challenge.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200 hover:border-tapinto-blue/50'
            } transition-colors`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-2 rounded-lg ${
                  challenge.completed 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-blue-100 text-tapinto-blue'
                }`}>
                  {challenge.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <challenge.icon className="w-5 h-5" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{challenge.title}</h4>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Zap className="w-3 h-3 mr-1" />
                      +{challenge.fuelReward}%
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                  
                  {challenge.maxProgress > 1 && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(challenge.progress / challenge.maxProgress) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                size="sm"
                variant={challenge.completed ? "outline" : "default"}
                disabled={challenge.completed}
                onClick={() => handleChallengeAction(challenge)}
                className={challenge.completed ? "bg-green-50 text-green-700" : ""}
              >
                {challenge.completed ? "Completed" : challenge.action}
              </Button>
            </div>
          </div>
        ))}
        
        {earnedFuel === totalFuelAvailable && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="font-medium text-green-800">All Challenges Complete!</span>
            </div>
            <p className="text-sm text-gray-600">
              You've earned {totalFuelAvailable}% fuel today. Check back tomorrow for new challenges!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
