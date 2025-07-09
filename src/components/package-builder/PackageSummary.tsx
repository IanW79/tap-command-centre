
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, ArrowRight } from 'lucide-react';

interface PackageSummaryProps {
  packageData: any;
  onContinue: () => void;
}

export function PackageSummary({ packageData, onContinue }: PackageSummaryProps) {
  const getPackagePrice = () => {
    const basePrice = packageData.pricing?.basePrice || 199;
    const modifiers = packageData.pricing?.modifiers || [];
    const totalModifiers = modifiers.reduce((sum: number, mod: any) => sum + (mod.adjustment || 0), 0);
    return basePrice + totalModifiers;
  };

  const getPackageFeatures = () => {
    const features = [
      'ME Profile Creation & Management',
      'Directory Listing',
      'Social Media Integration',
      'Analytics Dashboard',
      'Custom Branding',
      'Priority Support'
    ];

    // Add business-specific features
    if (packageData.organisation?.hasOrganisation) {
      features.push(
        'Company Profile Management',
        'Team Overview & Structure',
        'Employee Directory',
        'HR Tools Integration'
      );
    }

    // Add values-based features
    if (packageData.individual?.values?.includes('sustainability')) {
      features.push('Sustainability Tracking');
    }

    return features;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Your Perfect Package
        </h1>
        <p className="text-xl text-gray-600">
          Tailored specifically for {packageData.individual?.firstName || 'you'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Package Details */}
        <Card className="shadow-lg border-tapinto-blue/20">
          <CardHeader className="bg-gradient-to-r from-tapinto-blue to-blue-600 text-white">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Star className="w-6 h-6" />
              {packageData.organisation?.hasOrganisation ? 'Business Growth' : 'Professional'} Package
            </CardTitle>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">£{getPackagePrice()}</span>
              <span className="text-blue-100">/month</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {getPackageFeatures().map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {packageData.pricing?.modifiers && packageData.pricing.modifiers.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Values-Based Enhancements:</h4>
                  {packageData.pricing.modifiers.map((modifier: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{modifier.name}</span>
                      <Badge variant="secondary">+£{modifier.adjustment}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Personalised Benefits */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Why This Package is Perfect for You</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              {packageData.individual?.profession && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-tapinto-blue rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Professional Focus</p>
                    <p className="text-sm text-gray-600">
                      Optimised for {packageData.individual.profession} professionals
                    </p>
                  </div>
                </div>
              )}

              {packageData.individual?.goals && packageData.individual.goals.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-tapinto-blue rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Goal Alignment</p>
                    <p className="text-sm text-gray-600">
                      Supports your goals: {packageData.individual.goals.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>
              )}

              {packageData.organisation?.hasOrganisation && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-tapinto-blue rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Business Integration</p>
                    <p className="text-sm text-gray-600">
                      Includes company profile and team management features
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-tapinto-blue rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Growth Potential</p>
                  <p className="text-sm text-gray-600">
                    Designed to scale with your professional journey
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  🎯 Perfect Match Score: 95%
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Based on your responses and professional needs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="text-center pt-4">
        <Button 
          onClick={onContinue}
          size="lg"
          className="bg-tapinto-blue hover:bg-tapinto-blue/90 px-8 py-3 text-lg gap-2"
        >
          Create Account & Get Started
          <ArrowRight className="w-5 h-5" />
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          30-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
}
