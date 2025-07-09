import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Save, Sparkles } from 'lucide-react';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  completionPercentage: number;
  isSaving?: boolean;
  lastSaved?: Date | null;
  timeEstimate?: number; // minutes
  phase?: string; // New prop for handling special phases
}

export function ProgressTracker({
  currentStep,
  totalSteps,
  completionPercentage,
  isSaving = false,
  lastSaved,
  timeEstimate,
  phase
}: ProgressTrackerProps) {
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // ✅ FIX 1: Enhanced step title logic with phase handling
  const getStepTitle = (step: number) => {
    const titles = [
      'Welcome',
      'Personal Details', 
      'Organisation',
      'Business Type',
      'Business Details'
    ];
    return titles[step] || 'Step';
  };

  // ✅ FIX 1: New function to handle progress display with phase logic
  const getProgressDisplay = () => {
    // Handle special phases
    if (phase === 'generation' || phase === 'package-creation') {
      return {
        title: 'Package Generation',
        step: 'AI Processing',
        icon: <Sparkles className="w-4 h-4 text-blue-500" />
      };
    }
    
    if (phase === 'registration') {
      return {
        title: 'Account Setup',
        step: 'Registration',
        icon: <CheckCircle className="w-4 h-4 text-green-500" />
      };
    }

    if (phase === 'customization') {
      return {
        title: 'Package Customization',
        step: 'Personalising',
        icon: <Sparkles className="w-4 h-4 text-purple-500" />
      };
    }
    
    // Cap steps at maximum for normal flow
    const maxSteps = 5;
    const displayStep = Math.min(currentStep + 1, maxSteps);
    
    return {
      title: getStepTitle(currentStep),
      step: `Step ${displayStep} of ${maxSteps}`,
      icon: null
    };
  };

  const progressInfo = getProgressDisplay();

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">Your Progress</h3>
          <Badge 
            variant={phase === 'generation' ? 'default' : 'secondary'} 
            className={`text-xs ${phase === 'generation' ? 'bg-blue-100 text-blue-800' : ''}`}
          >
            <div className="flex items-center gap-1">
              {progressInfo.icon}
              {progressInfo.step}
            </div>
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {isSaving ? (
            <div className="flex items-center gap-1">
              <Save className="w-3 h-3 animate-pulse" />
              <span>Saving...</span>
            </div>
          ) : lastSaved ? (
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Saved {getTimeAgo(lastSaved)}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{completionPercentage}% Complete</span>
          {timeEstimate && (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span>~{timeEstimate} min remaining</span>
            </div>
          )}
        </div>
        
        <Progress 
          value={completionPercentage} 
          className={`h-2 ${phase === 'generation' ? 'progress-animated' : ''}`}
        />
      </div>

      {/* Step Indicators */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Current: {progressInfo.title}</span>
          {/* Show next step only for normal flow */}
          {!phase && currentStep < totalSteps - 1 && (
            <span>Next: {getStepTitle(currentStep + 1)}</span>
          )}
          {phase === 'generation' && (
            <span>Creating your perfect package...</span>
          )}
        </div>
        
        {/* Dynamic step indicators based on phase */}
        <div className="flex gap-1">
          {phase === 'generation' ? (
            // Special progress bar for generation
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 animate-pulse"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          ) : (
            // Normal step indicators
            Array.from({ length: Math.min(totalSteps, 5) }, (_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500'
                    : index === currentStep
                    ? 'bg-tapinto-blue'
                    : 'bg-gray-200'
                }`}
              />
            ))
          )}
        </div>
      </div>

      {/* Special phase messaging */}
      {phase === 'generation' && (
        <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI is analysing your responses to create your perfect package...</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Add CSS for animated progress (add to your global CSS)
const styles = `
.progress-animated .progress-bar {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}
`;
