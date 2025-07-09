
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessType } from '@/pages/Index';
import { 
  Building2, 
  Users, 
  Briefcase, 
  User, 
  Heart, 
  Globe 
} from 'lucide-react';

interface BusinessTypeSelectorProps {
  selectedType: BusinessType | '';
  onSelect: (type: BusinessType) => void;
}

const businessTypes = [
  {
    type: 'company' as BusinessType,
    icon: Building2,
    title: 'Company',
    description: 'Traditional limited company structure',
    features: ['Corporate governance', 'Team management', 'Lead generation', 'B2B networking']
  },
  {
    type: 'llp' as BusinessType,
    icon: Users,
    title: 'LLP (Limited Liability Partnership)',
    description: 'Partnership with limited liability protection',
    features: ['Partner management', 'Professional services', 'Client management', 'Compliance tools']
  },
  {
    type: 'llc' as BusinessType,
    icon: Briefcase,
    title: 'LLC (Limited Liability Company)',
    description: 'Flexible business structure with liability protection',
    features: ['Business flexibility', 'Tax advantages', 'Professional profile', 'Growth tools']
  },
  {
    type: 'self-employed' as BusinessType,
    icon: User,
    title: 'Self Employed',
    description: 'Individual freelancer or sole trader',
    features: ['Personal branding', 'Client acquisition', 'Portfolio showcase', 'Networking']
  },
  {
    type: 'charity' as BusinessType,
    icon: Heart,
    title: 'Charity',
    description: 'Registered charitable organisation',
    features: ['Fundraising tools', 'Volunteer management', 'Impact tracking', 'Community engagement']
  },
  {
    type: 'cic' as BusinessType,
    icon: Globe,
    title: 'CIC (Community Interest Company)',
    description: 'Social enterprise with community focus',
    features: ['Social impact', 'Community benefits', 'Stakeholder engagement', 'Purpose-driven networking']
  }
];

export const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  selectedType,
  onSelect
}) => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          What type of organisation is this?
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          This helps us tailor the features and compliance requirements for your specific business structure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessTypes.map((business) => {
          const IconComponent = business.icon;
          const isSelected = selectedType === business.type;
          
          return (
            <Card 
              key={business.type}
              className={`
                cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl border-2 h-full
                ${isSelected 
                  ? 'border-tapinto-blue bg-blue-50 transform scale-105' 
                  : 'border-slate-200 hover:border-tapinto-blue'
                }
              `}
              onClick={() => onSelect(business.type)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors
                  ${isSelected ? 'bg-tapinto-blue text-white' : 'bg-slate-100 text-slate-600'}
                `}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">{business.title}</CardTitle>
                <p className="text-sm text-slate-600">{business.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700 mb-3">Key features:</p>
                  {business.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={`
                        w-1.5 h-1.5 rounded-full
                        ${isSelected ? 'bg-tapinto-blue' : 'bg-slate-400'}
                      `}></div>
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {isSelected && (
                  <Button className="w-full mt-6 bg-tapinto-blue hover:bg-tapinto-blue/90">
                    Continue with {business.title}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
