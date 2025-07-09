import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/packageBuilder';

interface OutcomesStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

const outcomes = [
  { id: 'me-profile', label: 'ME Profile for key team members', description: 'Professional profiles that showcase expertise' },
  { id: 'company-pages', label: 'Professional company pages', description: 'Branded pages that represent your business' },
  { id: 'directory-listing', label: 'Directory listing visibility', description: 'Get found by potential clients and partners' },
  { id: 'employee-benefits', label: 'Employee benefits access', description: 'Exclusive perks and benefits for your team' },
  { id: 'lead-generation', label: 'Lead generation tools', description: 'Attract and convert new customers' },
  { id: 'client-management', label: 'Client management system', description: 'Organize and nurture client relationships' },
  { id: 'social-impact', label: 'Social impact tracking', description: 'Measure and showcase your community contribution' },
  { id: 'networking', label: 'Networking opportunities', description: 'Connect with like-minded businesses' },
  { id: 'brand-development', label: 'Brand development', description: 'Build and strengthen your brand presence' },
  { id: 'digital-cards', label: 'Digital business cards', description: 'Modern, shareable contact solutions' }
];

export const OutcomesStep: React.FC<OutcomesStepProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleOutcomeChange = (outcomeId: string, checked: boolean) => {
    const currentOutcomes = formData.outcomes || [];
    let newOutcomes;
    
    if (checked) {
      newOutcomes = [...currentOutcomes, outcomeId];
    } else {
      newOutcomes = currentOutcomes.filter(id => id !== outcomeId);
    }
    
    onUpdate('outcomes', newOutcomes);
  };

  const canProceed = formData.outcomes && formData.outcomes.length > 0;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          What would you like to achieve?
        </h2>
        <p className="text-lg text-slate-600">
          Select all the outcomes that matter to your business. We'll create a package that delivers on these goals.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="space-y-4 mb-8">
          {outcomes.map((outcome) => (
            <div key={outcome.id} className="flex items-start space-x-4 p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
              <Checkbox
                id={outcome.id}
                checked={formData.outcomes?.includes(outcome.id) || false}
                onCheckedChange={(checked) => handleOutcomeChange(outcome.id, checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor={outcome.id} className="flex-1 cursor-pointer">
                <div>
                  <div className="text-lg font-semibold text-slate-700 mb-1">
                    {outcome.label}
                  </div>
                  <div className="text-slate-500 text-sm">
                    {outcome.description}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-slate-500 mb-6">
          Selected: {formData.outcomes?.length || 0} outcomes
        </div>

        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
        >
          Create My Package
        </Button>
      </div>
    </div>
  );
};
