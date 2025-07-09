
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FormData, UserType } from '@/types/packageBuilder';

interface SpecificQuestionsStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

const businessSizeOptions = [
  { value: 'solo', label: 'Solo Entrepreneur (Just me)' },
  { value: 'small', label: 'Small Team (2-10 employees)' },
  { value: 'growing', label: 'Growing Business (11-50 employees)' },
  { value: 'established', label: 'Established Company (51-250 employees)' },
  { value: 'enterprise', label: 'Large Enterprise (250+ employees)' }
];

const businessSectors = [
  'Technology & Software',
  'Healthcare & Medical',
  'Financial Services',
  'Retail & E-commerce',
  'Professional Services',
  'Manufacturing',
  'Construction & Property',
  'Education & Training',
  'Hospitality & Tourism',
  'Creative & Media',
  'Transport & Logistics',
  'Food & Beverage',
  'Other'
];

const businessOutcomes = [
  { id: 'me-profile', label: 'ME Profile Creation' },
  { id: 'lead-generation', label: 'Lead Generation Tools' },
  { id: 'directory-listing', label: 'Directory Listing & Visibility' },
  { id: 'client-management', label: 'Client Management System' },
  { id: 'networking', label: 'Business Networking' },
  { id: 'brand-development', label: 'Brand Development Support' },
  { id: 'digital-cards', label: 'Digital Business Cards' }
];

const charityOutcomes = [
  { id: 'fundraising', label: 'Fundraising Support' },
  { id: 'awareness', label: 'Awareness & Visibility' },
  { id: 'partnerships', label: 'Business Partnerships' },
  { id: 'volunteers', label: 'Volunteer Recruitment' },
  { id: 'social-impact', label: 'Social Impact Tracking' },
  { id: 'community-engagement', label: 'Community Engagement' }
];

const consumerOutcomes = [
  { id: 'save-money', label: 'Save money on purchases' },
  { id: 'meet-people', label: 'Meet like-minded people' },
  { id: 'support-causes', label: 'Support local causes' },
  { id: 'discover-businesses', label: 'Discover local businesses' },
  { id: 'cashback-rewards', label: 'Earn cashback & rewards' },
  { id: 'community-events', label: 'Access community events' }
];

export const SpecificQuestionsStep: React.FC<SpecificQuestionsStepProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleBusinessSizeChange = (value: string) => {
    onUpdate('businessSize', value);
  };

  const handleSectorChange = (value: string) => {
    onUpdate('sector', value);
  };

  const handleOutcomeChange = (outcomeId: string, checked: boolean) => {
    const currentOutcomes = formData.outcomes || [];
    const updatedOutcomes = checked
      ? [...currentOutcomes, outcomeId]
      : currentOutcomes.filter(id => id !== outcomeId);
    
    onUpdate('outcomes', updatedOutcomes);
  };

  const getOutcomeOptions = () => {
    switch (formData.userType) {
      case 'business':
        return businessOutcomes;
      case 'charity':
        return charityOutcomes;
      default:
        return consumerOutcomes;
    }
  };

  const getTitle = () => {
    switch (formData.userType) {
      case 'business':
        return 'Tell us about your business';
      case 'charity':
        return 'Tell us about your organisation';
      default:
        return 'What are you looking for?';
    }
  };

  const canProceed = () => {
    if (formData.userType === 'business' || formData.userType === 'charity') {
      return formData.businessSize && formData.sector && (formData.outcomes || []).length > 0;
    }
    return (formData.outcomes || []).length > 0;
  };

  const showBusinessQuestions = formData.userType === 'business' || formData.userType === 'charity';

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          {getTitle()}
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Just a few more details to create your perfect TAPinto package.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-8">
        {showBusinessQuestions && (
          <>
            {/* Business Size */}
            <div>
              <Label className="text-lg font-semibold text-slate-700 mb-4 block">
                {formData.userType === 'charity' ? 'Organisation size:' : 'Company size:'}
              </Label>
              <RadioGroup
                value={formData.businessSize || ''}
                onValueChange={handleBusinessSizeChange}
                className="space-y-3"
              >
                {businessSizeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <RadioGroupItem
                      value={option.value}
                      id={`size-${option.value}`}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor={`size-${option.value}`}
                      className="text-slate-700 cursor-pointer font-medium flex-1"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Sector */}
            <div>
              <Label className="text-lg font-semibold text-slate-700 mb-4 block">
                {formData.userType === 'charity' ? 'Cause/focus area:' : 'Industry sector:'}
              </Label>
              <RadioGroup
                value={formData.sector || ''}
                onValueChange={handleSectorChange}
                className="space-y-3 max-h-60 overflow-y-auto"
              >
                {businessSectors.map((sector) => (
                  <div key={sector} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <RadioGroupItem
                      value={sector}
                      id={`sector-${sector}`}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor={`sector-${sector}`}
                      className="text-slate-700 cursor-pointer font-medium flex-1"
                    >
                      {sector}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </>
        )}

        {/* Outcomes */}
        <div>
          <Label className="text-lg font-semibold text-slate-700 mb-4 block">
            What would you like to achieve? (Select all that apply)
          </Label>
          <div className="grid gap-4 md:grid-cols-2">
            {getOutcomeOptions().map((outcome) => (
              <div key={outcome.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <Checkbox
                  id={outcome.id}
                  checked={(formData.outcomes || []).includes(outcome.id)}
                  onCheckedChange={(checked) => handleOutcomeChange(outcome.id, checked as boolean)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label
                  htmlFor={outcome.id}
                  className="text-slate-700 cursor-pointer font-medium"
                >
                  {outcome.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <Button
            onClick={onNext}
            disabled={!canProceed()}
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
          >
            Generate My Package
          </Button>
        </div>
      </div>
    </div>
  );
};
