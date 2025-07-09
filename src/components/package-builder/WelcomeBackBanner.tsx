
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';

interface WelcomeBackBannerProps {
  completionPercentage: number;
  lastUpdated: Date;
  currentStep: number;
  totalSteps: number;
  onContinue: () => void;
  onStartOver: () => void;
}

export function WelcomeBackBanner({
  completionPercentage,
  lastUpdated,
  currentStep,
  totalSteps,
  onContinue,
  onStartOver
}: WelcomeBackBannerProps) {
  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'less than an hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const getEstimatedTime = () => {
    const remainingSteps = totalSteps - currentStep;
    return Math.max(remainingSteps * 2, 1); // Estimate 2 minutes per step
  };

  return (
    <Card className="border-tapinto-blue/20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h2>
              <Badge className="bg-tapinto-blue text-white">
                {completionPercentage}% Complete
              </Badge>
            </div>
            
            <p className="text-gray-600 max-w-md">
              You're making great progress on your personalized package. 
              Let's continue where you left off.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Last saved {getTimeAgo(lastUpdated)}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Step {currentStep + 1} of {totalSteps}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>~{getEstimatedTime()} minutes remaining</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={onContinue}
              className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2"
            >
              Continue Journey
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button 
              onClick={onStartOver}
              variant="outline"
              size="sm"
              className="text-gray-600"
            >
              Start Over
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
