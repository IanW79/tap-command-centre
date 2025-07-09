import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { TAPintoBrand } from '@/components/TAPintoBrand';
import { FormData } from '@/types/packageBuilder';

interface PackageResultsProps {
  formData: FormData;
}

export const PackageResults: React.FC<PackageResultsProps> = ({ formData }) => {
  const getBusinessSizeLabel = (size: string) => {
    const sizes: Record<string, string> = {
      'solo': 'Solo Entrepreneur',
      'small': 'Small Team',
      'growing': 'Growing Business',
      'established': 'Established Company',
      'enterprise': 'Large Enterprise'
    };
    return sizes[size] || size;
  };

  const getSectorDisplay = () => {
    return formData.sector === 'Other' ? formData.otherSector : formData.sector;
  };

  const getPackageName = () => {
    const sizeNames: Record<string, string> = {
      'solo': 'Entrepreneur',
      'small': 'Starter',
      'growing': 'Growth',
      'established': 'Professional',
      'enterprise': 'Enterprise'
    };
    return `TAPinto®️ ${sizeNames[formData.businessSize] || 'Custom'} Package`;
  };

  const getEstimatedROI = () => {
    const baseROI = formData.outcomes.length * 150;
    const sizeMultiplier: Record<string, number> = {
      'solo': 1,
      'small': 1.5,
      'growing': 2,
      'established': 3,
      'enterprise': 5
    };
    return Math.round(baseROI * (sizeMultiplier[formData.businessSize] || 1));
  };

  const outcomeLabels: Record<string, string> = {
    'me-profile': 'ME Profile Creation',
    'company-pages': 'Professional Company Pages',
    'directory-listing': 'Directory Listing & Visibility',
    'employee-benefits': 'Employee Benefits Access',
    'lead-generation': 'Lead Generation Tools',
    'client-management': 'Client Management System',
    'social-impact': 'Social Impact Tracking',
    'networking': 'Networking Opportunities',
    'brand-development': 'Brand Development Support',
    'digital-cards': 'Digital Business Cards'
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          Your Bespoke <TAPintoBrand size="lg" /> Package
        </h2>
        <p className="text-lg text-slate-600">
          Perfectly tailored for your {getBusinessSizeLabel(formData.businessSize).toLowerCase()} in {getSectorDisplay()}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Package Header */}
        <div className="tapinto-gradient text-white p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">{getPackageName()}</h3>
          <p className="text-blue-100">
            Custom-built for {formData.location} • {getSectorDisplay()}
          </p>
        </div>

        <div className="p-8">
          {/* Package Description */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-slate-800 mb-4">
              What's Included in Your Package
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Based on your selections, we've created a comprehensive package that includes 
              {formData.outcomes.length} key features designed specifically for {getBusinessSizeLabel(formData.businessSize).toLowerCase()}s 
              in the {getSectorDisplay()} sector. This package will help you achieve your business goals 
              while providing maximum value and growth potential.
            </p>
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-slate-800 mb-4">
              Key Features & Benefits
            </h4>
            <div className="grid gap-3">
              {formData.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">
                    {outcomeLabels[outcome]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Section */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h4 className="text-xl font-semibold text-slate-800 mb-4">
              Estimated Monthly Value
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 mb-2">
                  Based on industry averages and your selected features
                </p>
                <div className="text-3xl font-bold text-emerald-600">
                  £{getEstimatedROI().toLocaleString()}
                </div>
                <p className="text-sm text-slate-500">
                  Potential monthly business value
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-slate-700">
                  Package Investment
                </div>
                <div className="text-2xl font-bold text-tapinto-blue">
                  From £99/month
                </div>
                <p className="text-sm text-slate-500">
                  Flexible pricing available
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button className="w-full py-4 text-xl font-bold tapinto-gradient hover:opacity-90 rounded-xl mb-4 transition-all duration-200 text-white">
              Start Your <strong>TAPinto®️</strong> Journey
            </Button>
            <p className="text-sm text-slate-500">
              Speak with our team to discuss your custom package and pricing options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
