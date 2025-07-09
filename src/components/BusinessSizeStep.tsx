import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/packageBuilder';

interface BusinessSizeStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

const businessSizes = [
  { value: 'solo', label: 'Just me', description: '1 person' },
  { value: 'small', label: 'Small team', description: '2-10 people' },
  { value: 'growing', label: 'Growing business', description: '11-50 people' },
  { value: 'established', label: 'Established company', description: '51-250 people' },
  { value: 'enterprise', label: 'Large enterprise', description: '250+ people' }
];

export const BusinessSizeStep: React.FC<BusinessSizeStepProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleSizeChange = (value: string) => {
    onUpdate('businessSize', value);
  };

  const canProceed = formData.businessSize.length > 0;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          How many people work in your business?
        </h2>
        <p className="text-lg text-slate-600">
          This helps us understand your business structure and recommend the right features.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <RadioGroup value={formData.businessSize} onValueChange={handleSizeChange}>
          <div className="space-y-4">
            {businessSizes.map((size) => (
              <div key={size.value} className="flex items-center space-x-4 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <RadioGroupItem value={size.value} id={size.value} />
                <Label 
                  htmlFor={size.value} 
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-700">
                      {size.label}
                    </span>
                    <span className="text-slate-500">
                      {size.description}
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="pt-8">
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
