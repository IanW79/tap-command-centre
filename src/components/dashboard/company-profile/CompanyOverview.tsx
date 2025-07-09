
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  Globe
} from 'lucide-react';

interface CompanyOverviewProps {
  onDataChange: () => void;
}

export function CompanyOverview({ onDataChange }: CompanyOverviewProps) {
  const [companyData, setCompanyData] = useState({
    name: 'TechFlow Solutions',
    tagline: 'Innovative Technology Solutions for Modern Business',
    industry: 'Technology',
    size: '50-100',
    location: 'New York, NY',
    description: 'We provide cutting-edge technology solutions that help businesses streamline their operations and achieve digital transformation.',
    values: 'Innovation, Integrity, Excellence, Collaboration',
    phone: '+1 (555) 123-4567',
    email: 'contact@techflow.com',
    website: 'https://techflow.com',
    address: '123 Tech Street, New York, NY 10001'
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Real Estate', 'Marketing', 'Consulting', 'Other'
  ];

  const companySizes = [
    '1-10', '11-25', '26-50', '51-100', '101-250', '251-500', '500+'
  ];

  const updateData = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
    onDataChange();
  };

  return (
    <div className="space-y-6">
      {/* Company Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Branding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Logo</p>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Company Name</label>
                <Input
                  value={companyData.name}
                  onChange={(e) => updateData('name', e.target.value)}
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tagline</label>
                <Input
                  value={companyData.tagline}
                  onChange={(e) => updateData('tagline', e.target.value)}
                  placeholder="Brief company tagline"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Details */}
      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Industry</label>
              <Select value={companyData.industry} onValueChange={(value) => updateData('industry', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Company Size</label>
              <Select value={companyData.size} onValueChange={(value) => updateData('size', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size} employees
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
              <Input
                value={companyData.location}
                onChange={(e) => updateData('location', e.target.value)}
                placeholder="City, State/Country"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Company Description</label>
            <Textarea
              value={companyData.description}
              onChange={(e) => updateData('description', e.target.value)}
              placeholder="Describe your company, what you do, and what makes you unique..."
              rows={4}
            />
            <p className="text-sm text-gray-500 mt-2">{companyData.description.length}/500 characters</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Company Values</label>
            <Textarea
              value={companyData.values}
              onChange={(e) => updateData('values', e.target.value)}
              placeholder="List your company's core values..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  value={companyData.phone}
                  onChange={(e) => updateData('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  value={companyData.email}
                  onChange={(e) => updateData('email', e.target.value)}
                  placeholder="contact@company.com"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                value={companyData.website}
                onChange={(e) => updateData('website', e.target.value)}
                placeholder="https://yourcompany.com"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Business Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                value={companyData.address}
                onChange={(e) => updateData('address', e.target.value)}
                placeholder="123 Business Street, City, State 12345"
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
