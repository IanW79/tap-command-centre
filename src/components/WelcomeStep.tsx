import React from 'react';
import { FormData } from '@/types/packageBuilder';

interface WelcomeStepProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (field: keyof FormData, value: any) => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
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
    <div>
      <h2>Welcome!</h2>
      <p>Let's get to know you better.</p>

      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
      </div>

      <button onClick={onNext} disabled={!canProceed}>
        Continue
      </button>
    </div>
  );
};
