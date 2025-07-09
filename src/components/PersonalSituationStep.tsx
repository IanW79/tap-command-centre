import React from 'react';
import { FormData } from '@/types/packageBuilder';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PersonalSituationStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

const situationOptions = [
  { value: 'working-professional', label: 'Working professional' },
  { value: 'business-owner', label: 'Business owner' },
  { value: 'student-graduate', label: 'Student/Graduate' },
  { value: 'retired', label: 'Retired' },
  { value: 'job-seeking', label: 'Job seeking' },
  { value: 'parent-carer', label: 'Parent/Carer' },
  { value: 'charity-worker', label: 'Charity worker/Volunteer' },
  { value: 'freelancer-consultant', label: 'Freelancer/Consultant' },
  { value: 'other', label: 'Other' }
];

export const PersonalSituationStep: React.FC<PersonalSituationStepProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleSituationChange = (value: string) => {
    onUpdate('personalSituation', value);
  };

  const canProceed = !!formData.personalSituation;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          What best <span className="text-tapinto-orange">describes</span> you?
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          This helps us understand your needs and create the perfect package for your situation.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold text-slate-700 mb-4 block">
              Select your current situation:
            </Label>
            <RadioGroup
              value={formData.personalSituation || ''}
              onValueChange={handleSituationChange}
              className="space-y-3"
            >
              {situationOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-slate-700 cursor-pointer font-medium flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
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
