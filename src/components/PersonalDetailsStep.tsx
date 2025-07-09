import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/packageBuilder';

interface PersonalDetailsStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

export const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    onUpdate(field, value);
  };

  const canProceed = formData.firstName.trim() && formData.lastName.trim() && 
                    formData.email.trim() && formData.phone.trim();

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Let's get to know you
        </h2>
        <p className="text-lg text-slate-600">
          We'll use these details to personalise your <strong>TAPinto®️</strong> experience.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="text-lg font-semibold text-slate-700 mb-3 block">
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="text-lg py-3 px-4 border-2 border-slate-200 focus:border-tapinto-blue rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="text-lg font-semibold text-slate-700 mb-3 block">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="text-lg py-3 px-4 border-2 border-slate-200 focus:border-tapinto-blue rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-lg font-semibold text-slate-700 mb-3 block">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="text-lg py-3 px-4 border-2 border-slate-200 focus:border-tapinto-blue rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-lg font-semibold text-slate-700 mb-3 block">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
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
