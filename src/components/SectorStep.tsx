import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/packageBuilder';

interface SectorStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

const sectors = [
  'Professional Services',
  'Retail & E-commerce',
  'Technology & Software',
  'Healthcare & Wellness',
  'Construction & Property',
  'Manufacturing',
  'Hospitality & Tourism',
  'Education & Training',
  'Finance & Insurance',
  'Creative & Media',
  'Other'
];

export const SectorStep: React.FC<SectorStepProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleSectorChange = (value: string) => {
    onUpdate('sector', value);
    if (value !== 'Other') {
      onUpdate('otherSector', '');
    }
  };

  const handleOtherSectorChange = (value: string) => {
    onUpdate('otherSector', value);
  };

  const canProceed = formData.sector && (formData.sector !== 'Other' || formData.otherSector?.trim());

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          What sector is your business in?
        </h2>
        <p className="text-lg text-slate-600">
          Understanding your industry helps us tailor the perfect package for your specific needs.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold text-slate-700 mb-3 block">
              Select your business sector
            </Label>
            <Select value={formData.sector} onValueChange={handleSectorChange}>
              <SelectTrigger className="text-lg py-3 px-4 border-2 border-slate-200 focus:border-blue-500 rounded-xl">
                <SelectValue placeholder="Choose your sector..." />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.sector === 'Other' && (
            <div className="animate-fade-in">
              <Label className="text-lg font-semibold text-slate-700 mb-3 block">
                Please specify your sector
              </Label>
              <Input
                type="text"
                placeholder="e.g., Agriculture, Non-profit, Government..."
                value={formData.otherSector || ''}
                onChange={(e) => handleOtherSectorChange(e.target.value)}
                className="text-lg py-3 px-4 border-2 border-slate-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          )}

          <div className="pt-6">
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
    </div>
  );
};
