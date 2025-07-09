
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw, Eye, Save } from 'lucide-react';

interface NavigationHeaderProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onJumpToStep: (step: number) => void;
  onStartOver: () => void;
  onPreview: () => void;
  canProceed: boolean;
  isStepComplete: (step: number) => boolean;
  getMaxAccessibleStep: () => number;
  hasUnsavedChanges: boolean;
  canShowPreview: boolean;
  stepTitle?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentStep,
  totalSteps,
  onPrevStep,
  onNextStep,
  onJumpToStep,
  onStartOver,
  onPreview,
  canProceed,
  isStepComplete,
  getMaxAccessibleStep,
  hasUnsavedChanges,
  canShowPreview,
  stepTitle
}) => {
  const maxAccessible = getMaxAccessibleStep();

  const getStepLabel = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return 'Details';
      case 2: return 'Business';
      case 3: return 'Location';
      case 4: return 'Interests';
      case 5: return 'Situation';
      case 6: return 'Specifics';
      default: return `Step ${stepNumber}`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
      {/* Top Row - Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            onClick={onPrevStep}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-tapinto-blue text-tapinto-blue hover:bg-tapinto-blue hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            onClick={onStartOver}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-slate-600 hover:bg-slate-100"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 text-tapinto-orange text-sm">
              <Save className="w-4 h-4" />
              Auto-saving...
            </div>
          )}
          
          {canShowPreview && (
            <Button
              onClick={onPreview}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-tapinto-blue text-tapinto-blue hover:bg-tapinto-blue hover:text-white"
            >
              <Eye className="w-4 h-4" />
              Preview Package
            </Button>
          )}
          
          <Button
            onClick={onNextStep}
            disabled={!canProceed}
            size="sm"
            className="flex items-center gap-2 tapinto-gradient hover:opacity-90 disabled:opacity-50 text-white"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar with Clickable Steps */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600">
            {stepTitle ? `${stepTitle} - ` : ''}Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-slate-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        
        {/* Clickable Step Indicators */}
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = isStepComplete(index + 1);
            const isCurrent = currentStep === stepNumber;
            const isAccessible = stepNumber <= maxAccessible || stepNumber <= currentStep;
            
            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <button
                  onClick={() => isAccessible ? onJumpToStep(stepNumber) : undefined}
                  disabled={!isAccessible}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200
                    ${isCurrent 
                      ? 'tapinto-gradient text-white shadow-lg scale-110' 
                      : isCompleted 
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer' 
                        : isAccessible
                          ? 'bg-slate-200 text-slate-600 hover:bg-slate-300 cursor-pointer'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isCompleted && !isCurrent ? '✓' : stepNumber}
                </button>
                <span className={`text-xs mt-1 ${isCurrent ? 'text-tapinto-blue font-medium' : 'text-slate-500'}`}>
                  {getStepLabel(stepNumber)}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="tapinto-gradient h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
