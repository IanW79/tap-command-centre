
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Check, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Shield,
  Calendar,
  BarChart,
  Palette,
  Heart,
  Zap,
  Users,
  RefreshCw
} from 'lucide-react';
import { ConversationData } from '@/pages/Index';

interface Feature {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'core' | 'premium' | 'values' | 'bundle';
  icon: React.ComponentType<any>;
  removable: boolean;
  recommended: boolean;
  dependency?: string[];
  valuesBased?: string[];
  popularityScore?: number;
}

interface PackageCustomizationProps {
  conversationData: ConversationData;
  generatedPackage: any;
  onContinue: (customizedPackage: any) => void;
  onBack: () => void;
}

export function PackageCustomization({ 
  conversationData, 
  generatedPackage, 
  onContinue, 
  onBack 
}: PackageCustomizationProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [showBundles, setShowBundles] = useState(false);

  const allFeatures: Feature[] = [
    // Core Features
    {
      id: 'basic-profile',
      name: 'Basic ME Profile',
      description: 'Create and manage your professional profile',
      price: 0,
      category: 'core',
      icon: Users,
      removable: false,
      recommended: true
    },
    {
      id: 'directory-listing',
      name: 'Directory Listing',
      description: 'Be discoverable in our professional directory',
      price: 0,
      category: 'core',
      icon: BarChart,
      removable: false,
      recommended: true
    },
    {
      id: 'community-access',
      name: 'Community Access',
      description: 'Read-only access to professional communities',
      price: 0,
      category: 'core',
      icon: Users,
      removable: false,
      recommended: true
    },

    // Premium Add-ons
    {
      id: 'advanced-analytics',
      name: 'Advanced ME Profile Analytics',
      description: 'Detailed insights into profile views and engagement',
      price: 4.99,
      category: 'premium',
      icon: BarChart,
      removable: true,
      recommended: true,
      popularityScore: 78
    },
    {
      id: 'calendar-integration',
      name: 'Calendar Integration',
      description: 'Sync with Google Calendar and Outlook',
      price: 3.99,
      category: 'premium',
      icon: Calendar,
      removable: true,
      recommended: false,
      popularityScore: 65
    },
    {
      id: 'custom-branding',
      name: 'Custom Branding Options',
      description: 'Customize your profile with brand colors and logos',
      price: 6.99,
      category: 'premium',
      icon: Palette,
      removable: true,
      recommended: conversationData.organisation.hasOrganisation,
      popularityScore: 82
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: 'Get help faster with priority customer support',
      price: 2.99,
      category: 'premium',
      icon: Shield,
      removable: true,
      recommended: false,
      popularityScore: 71
    },
    {
      id: 'enhanced-security',
      name: 'Enhanced Security Features',
      description: 'Two-factor authentication and advanced privacy controls',
      price: 5.99,
      category: 'premium',
      icon: Shield,
      removable: true,
      recommended: false,
      popularityScore: 58
    },

    // Values-Based Features
    {
      id: 'impact-wallet',
      name: 'Impact Wallet (5% contribution)',
      description: 'Automatically contribute to community causes',
      price: 2.50,
      category: 'values',
      icon: Heart,
      removable: true,
      recommended: conversationData.individual.interests?.includes('community') || 
                   conversationData.individual.interests?.includes('charity'),
      valuesBased: ['community', 'charity', 'sustainability'],
      popularityScore: 45
    },
    {
      id: 'business-growth',
      name: 'Business Growth Tools',
      description: 'Lead generation and CRM integration tools',
      price: 7.99,
      category: 'values',
      icon: TrendingUp,
      removable: true,
      recommended: conversationData.organisation.hasOrganisation,
      valuesBased: ['business', 'entrepreneurship', 'leadership'],
      popularityScore: 89
    },
    {
      id: 'personal-development',
      name: 'Personal Development Access',
      description: 'Exclusive content and mentorship opportunities',
      price: 4.99,
      category: 'values',
      icon: Sparkles,
      removable: true,
      recommended: conversationData.individual.interests?.includes('personal-development'),
      valuesBased: ['personal-development', 'learning', 'growth'],
      popularityScore: 67
    },
    {
      id: 'early-access',
      name: 'Early Feature Access',
      description: 'Be first to try new features and updates',
      price: 3.99,
      category: 'values',
      icon: Zap,
      removable: true,
      recommended: conversationData.individual.interests?.includes('technology'),
      valuesBased: ['technology', 'innovation'],
      popularityScore: 73
    }
  ];

  // Initialize selected features based on AI recommendations
  useEffect(() => {
    const recommendedFeatures = allFeatures
      .filter(feature => feature.recommended)
      .map(feature => feature.id);
    
    setSelectedFeatures(recommendedFeatures);
    
    const initialPrice = allFeatures
      .filter(feature => recommendedFeatures.includes(feature.id))
      .reduce((sum, feature) => sum + feature.price, 0);
    
    setTotalPrice(initialPrice);
    setOriginalPrice(initialPrice);
  }, []);

  const toggleFeature = (featureId: string) => {
    const feature = allFeatures.find(f => f.id === featureId);
    if (!feature || !feature.removable) return;

    setSelectedFeatures(prev => {
      const isSelected = prev.includes(featureId);
      let newSelected;

      if (isSelected) {
        newSelected = prev.filter(id => id !== featureId);
      } else {
        newSelected = [...prev, featureId];
      }

      // Calculate new price
      const newPrice = allFeatures
        .filter(f => newSelected.includes(f.id))
        .reduce((sum, f) => sum + f.price, 0);
      
      setTotalPrice(newPrice);
      return newSelected;
    });
  };

  const restoreRecommendations = () => {
    const recommendedFeatures = allFeatures
      .filter(feature => feature.recommended)
      .map(feature => feature.id);
    
    setSelectedFeatures(recommendedFeatures);
    setTotalPrice(originalPrice);
  };

  const getFeaturesByCategory = (category: string) => {
    return allFeatures.filter(feature => feature.category === category);
  };

  const getSavingsAmount = () => {
    return originalPrice - totalPrice;
  };

  const getBundleDiscount = () => {
    const premiumCount = selectedFeatures.filter(id => 
      allFeatures.find(f => f.id === id)?.category === 'premium'
    ).length;
    
    if (premiumCount >= 3) return 0.15; // 15% discount
    if (premiumCount >= 2) return 0.10; // 10% discount
    return 0;
  };

  const getFinalPrice = () => {
    const discount = getBundleDiscount();
    const discountAmount = totalPrice * discount;
    return totalPrice - discountAmount;
  };

  const handleContinue = () => {
    const customizedPackage = {
      ...generatedPackage,
      selectedFeatures: selectedFeatures.map(id => 
        allFeatures.find(f => f.id === id)
      ).filter(Boolean),
      pricing: {
        ...generatedPackage.pricing,
        basePrice: totalPrice,
        bundleDiscount: getBundleDiscount(),
        finalPrice: getFinalPrice()
      },
      customizations: {
        featuresAdded: selectedFeatures.filter(id => 
          !allFeatures.find(f => f.id === id)?.recommended
        ),
        featuresRemoved: allFeatures
          .filter(f => f.recommended && !selectedFeatures.includes(f.id))
          .map(f => f.id)
      }
    };

    onContinue(customizedPackage);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-tapinto-blue to-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Customize Your Perfect Package
        </h1>
        <p className="text-xl text-gray-600">
          Add or remove features to match your exact needs
        </p>
        <Progress value={90} className="w-full h-3 max-w-md mx-auto" />
        <p className="text-sm text-gray-500">Almost done! 90% complete</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Features Selection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Core Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Core Features (Included)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getFeaturesByCategory('core').map((feature) => (
                <div key={feature.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-tapinto-blue" />
                    <div>
                      <h4 className="font-medium">{feature.name}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Included</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Premium Add-ons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Premium Add-ons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getFeaturesByCategory('premium').map((feature) => (
                <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-tapinto-blue" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{feature.name}</h4>
                        {feature.recommended && (
                          <Badge className="bg-tapinto-blue text-white text-xs">Recommended</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                      {feature.popularityScore && (
                        <p className="text-xs text-green-600 mt-1">
                          {feature.popularityScore}% of users like you choose this
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">£{feature.price}/mo</span>
                    <Switch
                      checked={selectedFeatures.includes(feature.id)}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Values-Based Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Values-Based Features
                <Badge variant="outline" className="ml-2">Based on your interests</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getFeaturesByCategory('values').map((feature) => (
                <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-tapinto-blue" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{feature.name}</h4>
                        {feature.recommended && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Perfect Match</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">£{feature.price}/mo</span>
                    <Switch
                      checked={selectedFeatures.includes(feature.id)}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Price Summary Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Package Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base Features</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
                
                {getBundleDiscount() > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Bundle Discount (-{(getBundleDiscount() * 100).toFixed(0)}%)</span>
                    <span>-£{(totalPrice * getBundleDiscount()).toFixed(2)}</span>
                  </div>
                )}
                
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Monthly Total</span>
                  <span>£{getFinalPrice().toFixed(2)}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  Annual: £{(getFinalPrice() * 12 * 0.9).toFixed(2)} (Save 10%)
                </div>
              </div>

              {/* Savings Indicator */}
              {getSavingsAmount() > 0 && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    You're saving £{getSavingsAmount().toFixed(2)}/month
                  </p>
                </div>
              )}

              {/* Bundle Promotion */}
              {getBundleDiscount() > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    🎉 Bundle discount applied!
                  </p>
                </div>
              )}

              {/* Restore Recommendations */}
              <Button
                variant="outline"
                size="sm"
                onClick={restoreRecommendations}
                className="w-full gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Restore AI Recommendations
              </Button>

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full bg-tapinto-blue hover:bg-blue-700 text-white gap-2"
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={onBack}
                className="w-full gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Package
              </Button>

              {/* Trust Indicators */}
              <div className="text-center text-xs text-gray-500 space-y-1">
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Cancel anytime</p>
                <p>✓ No setup fees</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
