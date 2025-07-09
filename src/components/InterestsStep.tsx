import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/packageBuilder';

interface InterestsStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

const interestOptions = [
  { id: 'local-deals', label: 'Local deals & discounts' },
  { id: 'networking', label: 'Networking opportunities' },
  { id: 'social-impact', label: 'Social impact projects' },
  { id: 'professional-development', label: 'Professional development' },
  { id: 'community-events', label: 'Community events' },
  { id: 'cashback-rewards', label: 'Cashback rewards' },
  { id: 'supporting-local', label: 'Supporting local businesses' },
  { id: 'business-growth', label: 'Business growth' },
  { id: 'fundraising', label: 'Fundraising' }
];

export const InterestsStep: React.FC<InterestsStepProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleInterestChange = (interestId: string, checked: boolean) => {
    const currentInterests = formData.interests || [];
    const updatedInterests = checked
      ? [...currentInterests, interestId]
      : currentInterests.filter(id => id !== interestId);
    
    onUpdate('interests', updatedInterests);
  };

  const canProceed = (formData.interests || []).length > 0;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          What <span className="text-tapinto-orange">interests</span> you most?
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Select all that apply - this helps us personalise your <strong>TAPinto®️</strong> experience perfectly.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold text-slate-700 mb-4 block">
              Choose your interests:
            </Label>
            <div className="grid gap-4 md:grid-cols-2">
              {interestOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <Checkbox
                    id={option.id}
                    checked={(formData.interests || []).includes(option.id)}
                    onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                    className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-slate-700 cursor-pointer font-medium"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={onNext}
              disabled={!canProceed}
              className="w-full py-4 text-lg font-semibold tapinto-gradient hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
