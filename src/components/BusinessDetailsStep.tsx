
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/packageBuilder';

interface BusinessDetailsStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

export const BusinessDetailsStep: React.FC<BusinessDetailsStepProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    onUpdate(field, value);
  };

  const canProceed = formData.companyName.trim();

  const getTitle = () => {
    return formData.userType === 'charity' 
      ? 'Tell us about your organisation'
      : 'Tell us about your business';
  };

  const getCompanyLabel = () => {
    return formData.userType === 'charity' 
      ? 'Organisation Name *'
      : 'Company Name *';
  };

  const getCompanyPlaceholder = () => {
    return formData.userType === 'charity' 
      ? 'Enter your organisation name'
      : 'Enter your company name';
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          {getTitle()}
        </h2>
        <p className="text-lg text-slate-600">
          These details help us understand your organisation better.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="companyName" className="text-lg font-semibold text-slate-700 mb-3 block">
              {getCompanyLabel()}
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder={getCompanyPlaceholder()}
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="text-lg py-3 px-4 border-2 border-slate-200 focus:border-tapinto-blue rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="website" className="text-lg font-semibold text-slate-700 mb-3 block">
              Website URL <span className="text-slate-500 font-normal">(Optional)</span>
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://www.yourwebsite.com"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="text-lg py-3 px-4 border-2 border-slate-200 focus:border-tapinto-blue rounded-xl"
            />
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
