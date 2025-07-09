import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Phone, 
  Globe, 
  Sparkles, 
  Save, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  MessageCircle
} from 'lucide-react';

interface ContactInformationProps {
  packageData?: any;
}

export function ContactInformation({ packageData }: ContactInformationProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsapp: '',
    location: '',
    jobTitle: '',
    company: '',
    website: '',
    allowEmail: true,
    allowPhone: true,
    allowWhatsApp: true,
    showInDirectory: true
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

useEffect(() => {
  if (packageData?.individual) {
    const individual = packageData.individual;
    const organisation = packageData.organisation;
    
    setFormData(prev => ({
      ...prev,
      firstName: individual.firstName || '',
      lastName: individual.lastName || '',
      email: individual.email || '',
      phone: individual.phone || '',
      whatsapp: individual.whatsapp || individual.phone || '',
      location: individual.location || '',
      jobTitle: individual.profession || '',
      company: organisation?.companyName || '',
      website: organisation?.website || ''
    }));
  }
}, [packageData]);

const handleInputChange = (field: string, value: string | boolean) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  setHasUnsavedChanges(true);
  setSaveSuccess(false);
  setSaveError('');
};

const handleSave = async () => {
  setSaving(true);
  setSaveError('');
  setSaveSuccess(false);

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Contact information saved:', formData);
    
    setHasUnsavedChanges(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    
  } catch (error) {
    console.error('❌ Error saving contact information:', error);
    setSaveError('Failed to save contact information. Please try again.');
  } finally {
    setSaving(false);
  }
};
const isPrePopulated = (field: string) => {
  if (!packageData?.individual) return false;
  
  switch (field) {
    case 'firstName':
    case 'lastName':
    case 'email':
    case 'phone':
    case 'location':
      return !!packageData.individual[field];
    case 'jobTitle':
      return !!packageData.individual.profession;
    case 'company':
    case 'website':
      return !!packageData?.organisation?.[field === 'company' ? 'companyName' : field];
    default:
     return false;
  }
};
  
return (
  <div className="space-y-6">
    {/* Save Success Alert */}
    {saveSuccess && (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Contact information saved successfully! ✨
        </AlertDescription>
      </Alert>
    )}

    {/* Save Error Alert */}
    {saveError && (
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          {saveError}
        </AlertDescription>
      </Alert>
    )}

    {/* Pre-population Notice */}
    {packageData && (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-900">Information Pre-filled</h4>
              <p className="text-sm text-blue-700">
                Fields marked with a badge have been pre-filled from your package responses. You can edit any information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )}

    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-tapinto-blue" />
            Contact Information
          </CardTitle>
          {hasUnsavedChanges && (
            <Button 
              onClick={handleSave} 
              size="sm" 
              disabled={saving}
              className="bg-tapinto-blue hover:bg-tapinto-blue/90"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-tapinto-blue" />
            Personal Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="firstName">First Name *</Label>
                {isPrePopulated('firstName') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="lastName">Last Name *</Label>
                {isPrePopulated('lastName') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="location">Location</Label>
              {isPrePopulated('location') && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  From Package
                </Badge>
              )}
            </div>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, Country"
            />
          </div>
        </div>

                {/* Contact Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Phone className="w-5 h-5 text-tapinto-blue" />
            Contact Methods
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email">Email Address *</Label>
                {isPrePopulated('email') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isPrePopulated('phone') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+44 123 456 7890"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-600" />
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
            </div>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              placeholder="+44 123 456 7890 (can be same as phone)"
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-tapinto-blue" />
            Professional Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="jobTitle">Job Title / Profession</Label>
                {isPrePopulated('jobTitle') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="e.g. Marketing Director"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="company">Company</Label>
                {isPrePopulated('company') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your company name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-tapinto-blue" />
              <Label htmlFor="website">Website</Label>
              {isPrePopulated('website') && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  From Package
                </Badge>
              )}
            </div>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

                {/* Contact Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Preferences</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">
              Choose how people can reach you through your ME profile
            </p>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={formData.allowEmail}
                  onChange={(e) => handleInputChange('allowEmail', e.target.checked)}
                  className="rounded" 
                />
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Allow email contact</span>
              </label>
              <label className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={formData.allowPhone}
                  onChange={(e) => handleInputChange('allowPhone', e.target.checked)}
                  className="rounded" 
                />
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Allow phone contact</span>
              </label>
              <label className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={formData.allowWhatsApp}
                  onChange={(e) => handleInputChange('allowWhatsApp', e.target.checked)}
                  className="rounded" 
                />
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Allow WhatsApp contact</span>
              </label>
              <label className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={formData.showInDirectory}
                  onChange={(e) => handleInputChange('showInDirectory', e.target.checked)}
                  className="rounded" 
                />
                <Globe className="w-4 h-4 text-tapinto-blue" />
                <span className="text-sm">Show in TAPinto directory</span>
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  );
}
