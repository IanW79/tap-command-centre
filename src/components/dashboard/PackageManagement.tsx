import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  Check, 
  ArrowUpRight,
  Calendar,
  CreditCard,
  DollarSign
} from 'lucide-react';

export function PackageManagement() {
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');

  const currencies = [
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
  ];

  const exchangeRates = {
    GBP: 1,
    USD: 1.27,
    EUR: 1.17,
    CAD: 1.71,
    AUD: 1.91
  };

  const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency) || currencies[0];

  const convertPrice = (gbpPrice: number) => {
    const rate = exchangeRates[selectedCurrency as keyof typeof exchangeRates] || 1;
    return Math.round(gbpPrice * rate);
  };

  const formatPrice = (gbpPrice: number) => {
    const currency = getCurrentCurrency();
    const convertedPrice = convertPrice(gbpPrice);
    return `${currency.symbol}${convertedPrice}`;
  };

  const currentPackage = {
    name: 'Business Growth Package',
    priceGBP: 199,
    renewalDate: '2024-07-15',
    status: 'active'
  };

  const features = [
    { name: 'ME Profile Creation', included: true, usage: '1/1', limit: '1' },
    { name: 'Directory Listing', included: true, usage: '1/3', limit: '3' },
    { name: 'Social Media Integration', included: true, usage: '5/10', limit: '10' },
    { name: 'Analytics Dashboard', included: true, usage: 'Unlimited', limit: 'Unlimited' },
    { name: 'Custom Branding', included: true, usage: 'Active', limit: 'Available' },
    { name: 'Priority Support', included: true, usage: 'Available', limit: 'Available' }
  ];

  const availablePackages = [
    {
      name: 'Professional Plus',
      priceGBP: 299,
      description: 'Enhanced features for growing businesses',
      features: ['Everything in Business Growth', 'Advanced Analytics', 'API Access', 'White-label Options']
    },
    {
      name: 'Enterprise',
      priceGBP: null,
      description: 'Full-featured solution for large organizations',
      features: ['Everything in Professional Plus', 'Dedicated Support', 'Custom Integrations', 'Training & Onboarding']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Currency Selector */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
          <p className="text-gray-600 mt-1">Manage your subscription and explore upgrade options</p>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gray-500" />
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name} ({currency.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Current Package */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-tapinto-blue rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{currentPackage.name}</CardTitle>
                <p className="text-gray-600">{formatPrice(currentPackage.priceGBP)}/month</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {currentPackage.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Next Renewal</span>
              </div>
              <p className="text-lg font-semibold">{currentPackage.renewalDate}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Billing</span>
              </div>
              <p className="text-lg font-semibold">Monthly Automatic</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              Manage Billing
            </Button>
            <Button variant="outline">
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Usage */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Feature Usage & Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-medium">{feature.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{feature.usage}</p>
                  {feature.limit !== 'Unlimited' && feature.limit !== 'Available' && (
                    <p className="text-xs text-gray-500">of {feature.limit}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upgrade Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availablePackages.map((pkg) => (
            <Card key={pkg.name} className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {pkg.name}
                  <span className="text-tapinto-blue font-bold">
                    {pkg.priceGBP ? formatPrice(pkg.priceGBP) : 'Custom'}
                  </span>
                </CardTitle>
                <p className="text-gray-600">{pkg.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
                  {!pkg.priceGBP ? 'Contact Sales' : 'Upgrade Now'}
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
