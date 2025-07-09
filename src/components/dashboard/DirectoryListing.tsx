
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  MapPin, 
  Phone, 
  Globe, 
  Clock,
  Eye,
  Save,
  Camera
} from 'lucide-react';

export function DirectoryListing() {
  const [businessData, setBusinessData] = useState({
    businessName: 'Smith Marketing Solutions',
    category: 'Marketing & Advertising',
    description: 'Full-service digital marketing agency specializing in small business growth.',
    address: '123 Main St, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    website: 'https://smithmarketing.com',
    email: 'info@smithmarketing.com',
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    }
  });

  const categories = [
    'Marketing & Advertising',
    'Technology Services',
    'Healthcare',
    'Real Estate',
    'Professional Services',
    'Retail',
    'Food & Beverage',
    'Education',
    'Finance',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Directory Listing</h1>
          <p className="text-gray-600 mt-1">Manage your business presence in the TAPinto directory</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Eye className="w-4 h-4" />
          Preview Listing
        </Button>
      </div>

      {/* Business Information */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Business Name</label>
            <Input
              value={businessData.businessName}
              onChange={(e) => setBusinessData({...businessData, businessName: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
            <Select value={businessData.category}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Business Description</label>
            <Textarea
              placeholder="Describe your business, services, and what makes you unique..."
              value={businessData.description}
              onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
              rows={4}
            />
            <p className="text-sm text-gray-500 mt-2">
              {businessData.description.length}/500 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Location */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Contact & Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Business Address</label>
            <Input
              value={businessData.address}
              onChange={(e) => setBusinessData({...businessData, address: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
              <Input
                value={businessData.phone}
                onChange={(e) => setBusinessData({...businessData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Website</label>
              <Input
                placeholder="https://yourbusiness.com"
                value={businessData.website}
                onChange={(e) => setBusinessData({...businessData, website: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Business Email</label>
            <Input
              type="email"
              value={businessData.email}
              onChange={(e) => setBusinessData({...businessData, email: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(businessData.hours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-700 capitalize">
                  {day}
                </div>
                <Input
                  value={hours}
                  onChange={(e) => setBusinessData({
                    ...businessData,
                    hours: { ...businessData.hours, [day]: e.target.value }
                  })}
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Images */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Business Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Add Photo</p>
                </div>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Add Photo</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Upload up to 10 photos of your business. First photo will be used as the main image.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Directory Listing Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{businessData.businessName}</h3>
                <Badge variant="outline" className="mt-1">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {businessData.category}
                </Badge>
              </div>
            </div>
            
            <p className="text-gray-600">{businessData.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {businessData.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {businessData.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                {businessData.website}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {businessData.hours.monday}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
          <Save className="w-4 h-4" />
          Save Directory Listing
        </Button>
      </div>
    </div>
  );
}
