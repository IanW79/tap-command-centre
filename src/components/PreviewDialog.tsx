import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, Heart, MapPin, Users, Building } from 'lucide-react';
import { FormData } from '@/types/packageBuilder';

interface PreviewDialogProps {
  formData: FormData;
  onClose: () => void;
  onContinueEditing: () => void;
  onProceedToResults: () => void;
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({
  formData,
  onClose,
  onContinueEditing,
  onProceedToResults
}) => {
  const getUserTypeInfo = () => {
    switch (formData.userType) {
      case 'consumer':
        return { icon: User, label: 'Consumer/Individual', color: 'bg-blue-500' };
      case 'business':
        return { icon: Briefcase, label: 'Business Owner', color: 'bg-emerald-500' };
      case 'charity':
        return { icon: Heart, label: 'Charity/Social Enterprise', color: 'bg-purple-500' };
      default:
        return { icon: User, label: 'Unknown', color: 'bg-gray-500' };
    }
  };

  const userTypeInfo = getUserTypeInfo();
  const IconComponent = userTypeInfo.icon;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Package Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Summary */}
          <div className="bg-slate-50 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 ${userTypeInfo.color} rounded-xl flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className="text-slate-600">{userTypeInfo.label}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <span className="text-slate-600">{formData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                <span className="text-slate-600">{formData.phone}</span>
              </div>
              {formData.companyName && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">{formData.companyName}</span>
                </div>
              )}
              {formData.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">{formData.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Business Details */}
          {(formData.businessSize || formData.sector) && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-800">Business Information</h4>
              <div className="flex flex-wrap gap-3">
                {formData.businessSize && (
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {formData.businessSize === 'solo' ? 'Solo Business' :
                     formData.businessSize === 'small' ? 'Small Team (2-10)' :
                     formData.businessSize === 'growing' ? 'Growing Business (11-50)' :
                     formData.businessSize === 'established' ? 'Established Company (51-250)' :
                     'Large Enterprise (250+)'}
                  </Badge>
                )}
                {formData.sector && (
                  <Badge variant="outline">
                    {formData.sector === 'Other' && formData.otherSector ? formData.otherSector : formData.sector}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Selected Outcomes */}
          {formData.outcomes && formData.outcomes.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-800">Desired Outcomes</h4>
              <div className="grid grid-cols-1 gap-2">
                {formData.outcomes.map((outcome) => {
                  const outcomeLabels: { [key: string]: string } = {
                    'me-profile': 'ME Profile for key team members',
                    'company-pages': 'Professional company pages',
                    'directory-listing': 'Directory listing visibility',
                    'employee-benefits': 'Employee benefits access',
                    'lead-generation': 'Lead generation tools',
                    'client-management': 'Client management system',
                    'social-impact': 'Social impact tracking',
                    'networking': 'Networking opportunities',
                    'brand-development': 'Brand development',
                    'digital-cards': 'Digital business cards'
                  };
                  
                  return (
                    <div key={outcome} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-slate-700">{outcomeLabels[outcome] || outcome}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Package Preview Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-3">
              Your Personalized TAPinto Package
            </h4>
            <p className="text-slate-600 mb-4">
              Based on your selections, we're creating a tailored package that will help you achieve your goals. 
              {formData.outcomes && formData.outcomes.length > 0 && 
                ` Your package will include ${formData.outcomes.length} key features designed specifically for your needs.`
              }
            </p>
            <div className="text-sm text-slate-500">
              Complete the remaining steps to see your full package details and pricing.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={onContinueEditing}
            variant="outline"
            className="flex-1"
          >
            Continue Editing
          </Button>
          <Button
            onClick={onProceedToResults}
            className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
          >
            See Full Package
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
