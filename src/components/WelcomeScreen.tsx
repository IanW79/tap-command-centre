
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Briefcase, Heart } from 'lucide-react';
import { TAPintoBrand } from '@/components/TAPintoBrand';
import { FormData, UserType } from '@/types/packageBuilder';

interface WelcomeScreenProps {
  formData: FormData;
  onNext: () => void;
  onUpdate: (userType: UserType) => void;
}

const userTypeOptions = [
  {
    type: 'consumer' as UserType,
    icon: User,
    title: 'Consumer/Individual',
    description: 'Access local deals, networking, and social impact opportunities'
  },
  {
    type: 'business' as UserType,
    icon: Briefcase,
    title: 'Business Owner/Professional',
    description: 'Grow your business with our comprehensive B2B platform'
  },
  {
    type: 'charity' as UserType,
    icon: Heart,
    title: 'Charity/Social Enterprise',
    description: 'Connect with businesses and amplify your social impact'
  }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  formData,
  onNext,
  onUpdate
}) => {
  const handleUserTypeSelect = (userType: UserType) => {
    onUpdate(userType);
    onNext();
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Welcome to <TAPintoBrand size="lg" trademarkStyle="black-small" />
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Let's create your perfect experience. What best describes you?
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {userTypeOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = formData.userType === option.type;
          
          return (
            <button
              key={option.type}
              onClick={() => handleUserTypeSelect(option.type)}
              className={`
                bg-white rounded-2xl shadow-lg border-2 p-8 hover:shadow-xl transition-all duration-300 text-left group
                ${isSelected 
                  ? 'border-tapinto-blue bg-blue-50' 
                  : 'border-slate-200 hover:border-tapinto-blue'
                }
              `}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 tapinto-gradient
                  `}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`
                    text-2xl font-bold mb-3 group-hover:text-tapinto-blue transition-colors
                    ${isSelected ? 'text-tapinto-blue' : 'text-slate-800'}
                  `}>
                    {option.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
