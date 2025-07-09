
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, User, ArrowRight, X } from 'lucide-react';

interface OrganisationOptionProps {
  hasOrganisation: boolean;
  onUpdate: (hasOrganisation: boolean) => void;
  onSkip: () => void;
}

export const OrganisationOption: React.FC<OrganisationOptionProps> = ({
  hasOrganisation,
  onUpdate,
  onSkip
}) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Do you have an organisation?
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Adding your business unlocks additional features like team management, 
          business networking, and enhanced lead generation tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Yes, I have an organisation */}
        <Card 
          className={`
            cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl border-2
            ${hasOrganisation ? 'border-tapinto-blue bg-blue-50' : 'border-slate-200 hover:border-tapinto-blue'}
          `}
          onClick={() => onUpdate(true)}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-tapinto-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Yes, I have an organisation</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-600 mb-6">
              Perfect! Let's set up your business profile and unlock advanced features.
            </p>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-tapinto-blue rounded-full"></div>
                <span>Team member management</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-tapinto-blue rounded-full"></div>
                <span>Business directory listing</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-tapinto-blue rounded-full"></div>
                <span>Enhanced lead generation</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-tapinto-blue rounded-full"></div>
                <span>Advanced analytics</span>
              </div>
            </div>
            
            {hasOrganisation && (
              <Button className="w-full mt-6 bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
                Continue with Organisation
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </CardContent>
        </Card>

        {/* No, just personal */}
        <Card 
          className={`
            cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl border-2
            ${!hasOrganisation && hasOrganisation !== null ? 'border-tapinto-orange bg-orange-50' : 'border-slate-200 hover:border-tapinto-orange'}
          `}
          onClick={() => onUpdate(false)}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-tapinto-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">No, just personal</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-600 mb-6">
              No problem! We'll create your perfect personal TAPinto experience.
            </p>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-tapinto-orange rounded-full"></div>
                <span>Personal ME Profile</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-tapinto-orange rounded-full"></div>
                <span>Local deals & cashback</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-tapinto-orange rounded-full"></div>
                <span>Community networking</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-tapinto-orange rounded-full"></div>
                <span>Social impact tracking</span>
              </div>
            </div>
            
            {!hasOrganisation && hasOrganisation !== null && (
              <Button 
                onClick={onSkip}
                className="w-full mt-6 bg-tapinto-orange hover:bg-tapinto-orange/90 gap-2"
              >
                Continue Personal Only
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-slate-500 mb-4">
          Don't worry - you can always add an organisation later
        </p>
        <Button 
          variant="ghost" 
          onClick={onSkip}
          className="text-slate-600 hover:text-slate-800 gap-2"
        >
          <X className="w-4 h-4" />
          Skip for now
        </Button>
      </div>
    </div>
  );
};
