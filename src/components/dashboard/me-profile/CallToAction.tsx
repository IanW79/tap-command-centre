import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  Plus, 
  Save,
  ExternalLink,
  Settings,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  Users,
  MapPin,
  Gift,
  Link,
  Phone,
  Mail,
  Globe,
  Trash2
} from 'lucide-react';

interface CallToActionProps {
  packageData?: any;
}

export function CallToAction({ packageData }: CallToActionProps) {
  // Primary contact preferences
  const [primaryContact, setPrimaryContact] = useState({
    method: 'email', // email, phone, calendar, form
    email: '',
    phone: '',
    preferredTime: 'business-hours',
    responseTime: '24-hours',
    introduction: 'Thank you for your interest! I look forward to connecting with you.'
  });

  // Special offers and highlights
  const [specialOffers, setSpecialOffers] = useState([
    { 
      id: 1, 
      title: 'Free 30-Minute Consultation', 
      description: 'Discover how we can help grow your business',
      value: 'Worth £150',
      enabled: true,
      urgent: false
    }
  ]);

  // Calendar booking integration
  const [calendarSettings, setCalendarSettings] = useState({
    enabled: true,
    provider: 'calendly',
    url: '',
    title: 'Book a Consultation',
    description: 'Schedule a 30-minute discovery call to discuss your needs',
    duration: '30 minutes',
    availability: 'business-hours'
  });

  // Contact form builder
  const [contactForm, setContactForm] = useState({
    enabled: true,
    title: 'Get In Touch',
    description: 'Have a question? Send me a message and I\'ll get back to you.',
    fields: ['name', 'email', 'company', 'message'],
    autoReply: 'Thank you for your message! I\'ll respond within 24 hours.',
    redirectUrl: ''
  });

  // Network connection preferences
  const [networkingPrefs, setNetworkingPrefs] = useState({
    openToNetworking: true,
    travelWillingness: 'local', // local, regional, national, international
    meetingTypes: ['coffee', 'lunch', 'virtual', 'events'],
    industries: [],
    collaborationTypes: ['partnerships', 'referrals', 'joint-ventures', 'mentoring']
  });

  // Community and affiliate links
  const [communityLinks, setCommunityLinks] = useState([
    { id: 1, title: 'Join TAPinto Community', url: 'https://tapinto.me/community', type: 'community', enabled: true },
    { id: 2, title: 'Become an Affiliate', url: 'https://tapinto.me/affiliate', type: 'affiliate', enabled: true }
  ]);

  // Custom CTAs and payment links
  const [customCTAs, setCustomCTAs] = useState([]);
  const [paymentLinks, setPaymentLinks] = useState([]);

  // Save state management
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Pre-populate from package data
  useEffect(() => {
    if (packageData?.individual) {
      const individual = packageData.individual;
      const organisation = packageData.organisation;
      
      setPrimaryContact(prev => ({
        ...prev,
        email: individual.email || '',
        phone: individual.phone || '',
        introduction: individual.introduction || prev.introduction
      }));

      if (organisation?.website) {
        setCalendarSettings(prev => ({
          ...prev,
          url: `${organisation.website}/calendar` || prev.url
        }));
      }

      // Set networking preferences based on location
      if (individual.location) {
        setNetworkingPrefs(prev => ({
          ...prev,
          travelWillingness: individual.location.includes('London') ? 'national' : 'regional'
        }));
      }
    }
  }, [packageData]);

  // Handle primary contact changes
  const handlePrimaryContactChange = (field: string, value: string | boolean) => {
    setPrimaryContact(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
    setSaveError('');
  };

  // Handle calendar settings changes
  const handleCalendarChange = (field: string, value: string | boolean) => {
    setCalendarSettings(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Handle contact form changes
  const handleContactFormChange = (field: string, value: string | boolean | string[]) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Handle networking preferences changes
  const handleNetworkingChange = (field: string, value: string | boolean | string[]) => {
    setNetworkingPrefs(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Special offers management
  const addSpecialOffer = () => {
    const newOffer = {
      id: Date.now(),
      title: '',
      description: '',
      value: '',
      enabled: true,
      urgent: false
    };
    setSpecialOffers([...specialOffers, newOffer]);
    setHasUnsavedChanges(true);
  };

  const updateSpecialOffer = (id: number, field: string, value: string | boolean) => {
    setSpecialOffers(specialOffers.map(offer => 
      offer.id === id ? {...offer, [field]: value} : offer
    ));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  const removeSpecialOffer = (id: number) => {
    setSpecialOffers(specialOffers.filter(offer => offer.id !== id));
    setHasUnsavedChanges(true);
  };

  // Community links management
  const addCommunityLink = () => {
    const newLink = {
      id: Date.now(),
      title: '',
      url: '',
      type: 'custom',
      enabled: true
    };
    setCommunityLinks([...communityLinks, newLink]);
    setHasUnsavedChanges(true);
  };

  const updateCommunityLink = (id: number, field: string, value: string | boolean) => {
    setCommunityLinks(communityLinks.map(link => 
      link.id === id ? {...link, [field]: value} : link
    ));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  const removeCommunityLink = (id: number) => {
    setCommunityLinks(communityLinks.filter(link => link.id !== id));
    setHasUnsavedChanges(true);
  };

  // Custom CTA management
  const addCustomCTA = () => {
    const newCTA = {
      id: Date.now(),
      text: '',
      url: '',
      style: 'primary',
      enabled: true
    };
    setCustomCTAs([...customCTAs, newCTA]);
    setHasUnsavedChanges(true);
  };

  const updateCustomCTA = (id: number, field: string, value: string | boolean) => {
    setCustomCTAs(customCTAs.map(cta => 
      cta.id === id ? {...cta, [field]: value} : cta
    ));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  const removeCustomCTA = (id: number) => {
    setCustomCTAs(customCTAs.filter(cta => cta.id !== id));
    setHasUnsavedChanges(true);
  };

  // Save function with proper loading states
  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      // Simulate API call - replace with actual AWS save logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const callToActionData = {
        primaryContact,
        specialOffers,
        calendarSettings,
        contactForm,
        networkingPrefs,
        communityLinks,
        customCTAs,
        paymentLinks
      };
      
      console.log('✅ Call-to-action settings saved:', callToActionData);
      
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
      
    } catch (error) {
      console.error('❌ Error saving call-to-action settings:', error);
      setSaveError('Failed to save call-to-action settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Check if field is pre-populated
  const isPrePopulated = (field: string) => {
    if (!packageData?.individual) return false;
    
    switch (field) {
      case 'email':
      case 'phone':
        return !!packageData.individual[field];
      case 'website':
        return !!packageData?.organisation?.website;
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
            Call-to-action settings saved successfully! ✨
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
      {packageData?.individual && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900">Contact Information Pre-filled</h4>
                <p className="text-sm text-blue-700">
                  Fields marked with a badge have been pre-filled from your package responses. You can edit any information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Primary Contact Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-tapinto-blue" />
              Primary Contact Preferences
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredMethod">Preferred Contact Method</Label>
              <select 
                id="preferredMethod"
                className="w-full p-2 border rounded-md"
                value={primaryContact.method}
                onChange={(e) => handlePrimaryContactChange('method', e.target.value)}
              >
                <option value="email">Email</option>
                <option value="phone">Phone Call</option>
                <option value="calendar">Calendar Booking</option>
                <option value="form">Contact Form</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responseTime">Response Time</Label>
              <select 
                id="responseTime"
                className="w-full p-2 border rounded-md"
                value={primaryContact.responseTime}
                onChange={(e) => handlePrimaryContactChange('responseTime', e.target.value)}
              >
                <option value="1-hour">Within 1 hour</option>
                <option value="2-hours">Within 2 hours</option>
                <option value="24-hours">Within 24 hours</option>
                <option value="48-hours">Within 48 hours</option>
                <option value="same-day">Same day</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="contactEmail">Email Address</Label>
                {isPrePopulated('email') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="contactEmail"
                type="email"
                value={primaryContact.email}
                onChange={(e) => handlePrimaryContactChange('email', e.target.value)}
                placeholder="your.email@company.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="contactPhone">Phone Number</Label>
                {isPrePopulated('phone') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="contactPhone"
                type="tel"
                value={primaryContact.phone}
                onChange={(e) => handlePrimaryContactChange('phone', e.target.value)}
                placeholder="+44 7xxx xxx xxx"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredTime">Preferred Contact Time</Label>
            <select 
              id="preferredTime"
              className="w-full p-2 border rounded-md"
              value={primaryContact.preferredTime}
              onChange={(e) => handlePrimaryContactChange('preferredTime', e.target.value)}
            >
              <option value="business-hours">Business Hours (9am-5pm)</option>
              <option value="morning">Morning (9am-12pm)</option>
              <option value="afternoon">Afternoon (12pm-5pm)</option>
              <option value="evening">Evening (5pm-8pm)</option>
              <option value="anytime">Anytime</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="introduction">Introduction Message</Label>
            <Textarea
              id="introduction"
              value={primaryContact.introduction}
              onChange={(e) => handlePrimaryContactChange('introduction', e.target.value)}
              placeholder="Thank you for your interest! I look forward to connecting with you..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Special Offers & Highlights */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-tapinto-blue" />
            Special Offers & Highlights
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addSpecialOffer}>
            <Plus className="w-4 h-4 mr-1" />
            Add Offer
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {specialOffers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Gift className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No special offers added yet. Click "Add Offer" to highlight your value proposition.</p>
            </div>
          ) : (
            specialOffers.map((offer, index) => (
              <div key={offer.id} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-tapinto-blue">Offer #{index + 1}</h4>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={offer.enabled}
                      onCheckedChange={(checked) => updateSpecialOffer(offer.id, 'enabled', checked)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeSpecialOffer(offer.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`offer-title-${offer.id}`}>Offer Title *</Label>
                    <Input
                      id={`offer-title-${offer.id}`}
                      value={offer.title}
                      onChange={(e) => updateSpecialOffer(offer.id, 'title', e.target.value)}
                      placeholder="e.g., Free 30-Minute Consultation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`offer-value-${offer.id}`}>Value Statement</Label>
                    <Input
                      id={`offer-value-${offer.id}`}
                      value={offer.value}
                      onChange={(e) => updateSpecialOffer(offer.id, 'value', e.target.value)}
                      placeholder="e.g., Worth £150"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`offer-description-${offer.id}`}>Description</Label>
                  <Textarea
                    id={`offer-description-${offer.id}`}
                    value={offer.description}
                    onChange={(e) => updateSpecialOffer(offer.id, 'description', e.target.value)}
                    placeholder="Describe what this offer includes and why it's valuable..."
                    rows={2}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={offer.urgent}
                      onCheckedChange={(checked) => updateSpecialOffer(offer.id, 'urgent', checked)}
                    />
                    <Label>Mark as urgent/limited time</Label>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

            {/* Calendar Booking Integration */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-tapinto-blue" />
            Calendar Booking Integration
          </CardTitle>
          <Switch 
            checked={calendarSettings.enabled}
            onCheckedChange={(checked) => handleCalendarChange('enabled', checked)}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          {calendarSettings.enabled && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calendarTitle">Button Title</Label>
                  <Input
                    id="calendarTitle"
                    value={calendarSettings.title}
                    onChange={(e) => handleCalendarChange('title', e.target.value)}
                    placeholder="e.g., Book a Consultation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calendarProvider">Calendar Provider</Label>
                  <select 
                    id="calendarProvider"
                    className="w-full p-2 border rounded-md"
                    value={calendarSettings.provider}
                    onChange={(e) => handleCalendarChange('provider', e.target.value)}
                  >
                    <option value="calendly">Calendly</option>
                    <option value="acuity">Acuity Scheduling</option>
                    <option value="calendso">Cal.com</option>
                    <option value="outlook">Microsoft Bookings</option>
                    <option value="custom">Custom Link</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="calendarUrl">Calendar URL</Label>
                    {isPrePopulated('website') && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        Auto-generated
                      </Badge>
                    )}
                  </div>
                  <Input
                    id="calendarUrl"
                    value={calendarSettings.url}
                    onChange={(e) => handleCalendarChange('url', e.target.value)}
                    placeholder="https://calendly.com/yourname"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calendarDuration">Meeting Duration</Label>
                  <select 
                    id="calendarDuration"
                    className="w-full p-2 border rounded-md"
                    value={calendarSettings.duration}
                    onChange={(e) => handleCalendarChange('duration', e.target.value)}
                  >
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="60 minutes">60 minutes</option>
                    <option value="90 minutes">90 minutes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calendarDescription">Description</Label>
                <Textarea
                  id="calendarDescription"
                  value={calendarSettings.description}
                  onChange={(e) => handleCalendarChange('description', e.target.value)}
                  placeholder="Describe what visitors can expect from the booking..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calendarAvailability">Availability</Label>
                <select 
                  id="calendarAvailability"
                  className="w-full p-2 border rounded-md"
                  value={calendarSettings.availability}
                  onChange={(e) => handleCalendarChange('availability', e.target.value)}
                >
                  <option value="business-hours">Business Hours Only</option>
                  <option value="extended">Extended Hours</option>
                  <option value="weekends">Including Weekends</option>
                  <option value="24-7">24/7 Available</option>
                </select>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Calendar Preview</h4>
                <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2" disabled>
                  <Calendar className="w-4 h-4" />
                  {calendarSettings.title}
                </Button>
                <p className="text-sm text-green-700 mt-2">{calendarSettings.description}</p>
                <p className="text-xs text-green-600 mt-1">Duration: {calendarSettings.duration}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Contact Form Builder */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-tapinto-blue" />
            Contact Form Builder
          </CardTitle>
          <Switch 
            checked={contactForm.enabled}
            onCheckedChange={(checked) => handleContactFormChange('enabled', checked)}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          {contactForm.enabled && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="formTitle">Form Title</Label>
                  <Input
                    id="formTitle"
                    value={contactForm.title}
                    onChange={(e) => handleContactFormChange('title', e.target.value)}
                    placeholder="e.g., Get In Touch"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formRedirect">Redirect URL (Optional)</Label>
                  <Input
                    id="formRedirect"
                    value={contactForm.redirectUrl}
                    onChange={(e) => handleContactFormChange('redirectUrl', e.target.value)}
                    placeholder="https://yoursite.com/thank-you"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="formDescription">Description</Label>
                <Textarea
                  id="formDescription"
                  value={contactForm.description}
                  onChange={(e) => handleContactFormChange('description', e.target.value)}
                  placeholder="Have a question? Send me a message and I'll get back to you..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Form Fields</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['name', 'email', 'phone', 'company', 'message', 'budget', 'timeline', 'source'].map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`field-${field}`}
                        checked={contactForm.fields.includes(field)}
                        onChange={(e) => {
                          const newFields = e.target.checked 
                            ? [...contactForm.fields, field]
                            : contactForm.fields.filter(f => f !== field);
                          handleContactFormChange('fields', newFields);
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={`field-${field}`} className="text-sm capitalize">
                        {field}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoReply">Auto-Reply Message</Label>
                <Textarea
                  id="autoReply"
                  value={contactForm.autoReply}
                  onChange={(e) => handleContactFormChange('autoReply', e.target.value)}
                  placeholder="Thank you for your message! I'll respond within..."
                  rows={2}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">Form Preview</h4>
                <div className="space-y-3">
                  {contactForm.fields.includes('name') && (
                    <Input placeholder="Your Name *" disabled className="bg-white" />
                  )}
                  {contactForm.fields.includes('email') && (
                    <Input placeholder="Email Address *" disabled className="bg-white" />
                  )}
                  {contactForm.fields.includes('phone') && (
                    <Input placeholder="Phone Number" disabled className="bg-white" />
                  )}
                  {contactForm.fields.includes('company') && (
                    <Input placeholder="Company Name" disabled className="bg-white" />
                  )}
                  {contactForm.fields.includes('budget') && (
                    <select className="w-full p-2 border rounded-md bg-white" disabled>
                      <option>Budget Range</option>
                    </select>
                  )}
                  {contactForm.fields.includes('timeline') && (
                    <select className="w-full p-2 border rounded-md bg-white" disabled>
                      <option>Project Timeline</option>
                    </select>
                  )}
                  {contactForm.fields.includes('message') && (
                    <Textarea placeholder="Your Message *" rows={3} disabled className="bg-white" />
                  )}
                  <Button disabled className="bg-tapinto-blue">Send Message</Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

            {/* Networking & Collaboration Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-tapinto-blue" />
            Networking & Collaboration Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Open to Networking</h4>
              <p className="text-sm text-gray-600">Allow people to connect with you for business opportunities</p>
            </div>
            <Switch 
              checked={networkingPrefs.openToNetworking}
              onCheckedChange={(checked) => handleNetworkingChange('openToNetworking', checked)}
            />
          </div>

          {networkingPrefs.openToNetworking && (
            <>
              <div className="space-y-2">
                <Label htmlFor="travelWillingness">Travel Willingness</Label>
                <select 
                  id="travelWillingness"
                  className="w-full p-2 border rounded-md"
                  value={networkingPrefs.travelWillingness}
                  onChange={(e) => handleNetworkingChange('travelWillingness', e.target.value)}
                >
                  <option value="local">Local area only (within 25 miles)</option>
                  <option value="regional">Regional (within 100 miles)</option>
                  <option value="national">National (anywhere in UK)</option>
                  <option value="international">International travel</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Meeting Types</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['coffee', 'lunch', 'virtual', 'events', 'office', 'phone'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`meeting-${type}`}
                        checked={networkingPrefs.meetingTypes.includes(type)}
                        onChange={(e) => {
                          const newTypes = e.target.checked 
                            ? [...networkingPrefs.meetingTypes, type]
                            : networkingPrefs.meetingTypes.filter(t => t !== type);
                          handleNetworkingChange('meetingTypes', newTypes);
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={`meeting-${type}`} className="text-sm capitalize">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Collaboration Types</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['partnerships', 'referrals', 'joint-ventures', 'mentoring', 'speaking', 'consulting'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`collab-${type}`}
                        checked={networkingPrefs.collaborationTypes.includes(type)}
                        onChange={(e) => {
                          const newTypes = e.target.checked 
                            ? [...networkingPrefs.collaborationTypes, type]
                            : networkingPrefs.collaborationTypes.filter(t => t !== type);
                          handleNetworkingChange('collaborationTypes', newTypes);
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={`collab-${type}`} className="text-sm capitalize">
                        {type.replace('-', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Community & Affiliate Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-tapinto-blue" />
            Community & Affiliate Links
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addCommunityLink}>
            <Plus className="w-4 h-4 mr-1" />
            Add Link
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {communityLinks.map((link, index) => (
            <div key={link.id} className="border rounded-lg p-4 space-y-4 bg-gray-50">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-tapinto-blue">Link #{index + 1}</h4>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={link.enabled}
                    onCheckedChange={(checked) => updateCommunityLink(link.id, 'enabled', checked)}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeCommunityLink(link.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`link-title-${link.id}`}>Link Title</Label>
                  <Input
                    id={`link-title-${link.id}`}
                    value={link.title}
                    onChange={(e) => updateCommunityLink(link.id, 'title', e.target.value)}
                    placeholder="e.g., Join TAPinto Community"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`link-url-${link.id}`}>URL</Label>
                  <Input
                    id={`link-url-${link.id}`}
                    value={link.url}
                    onChange={(e) => updateCommunityLink(link.id, 'url', e.target.value)}
                    placeholder="https://"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`link-type-${link.id}`}>Link Type</Label>
                  <select 
                    id={`link-type-${link.id}`}
                    className="w-full p-2 border rounded-md"
                    value={link.type}
                    onChange={(e) => updateCommunityLink(link.id, 'type', e.target.value)}
                  >
                    <option value="community">Community</option>
                    <option value="affiliate">Affiliate</option>
                    <option value="resource">Resource</option>
                    <option value="social">Social Media</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* TAPinto Community Integration */}
          <div className="bg-tapinto-blue/10 border border-tapinto-blue/20 rounded-lg p-4">
            <h4 className="font-medium text-tapinto-blue mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              TAPinto Community Integration
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Platinum Benefits
                </Badge>
                <span>Auxilium Gives - Convert cashback to impact investments</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Community Access
                </Badge>
                <span>Connect with 89,000+ members in the TAPinto community</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Affiliate Programme
                </Badge>
                <span>Earn up to 15% commission on referrals</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom CTA Buttons */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-tapinto-blue" />
            Custom CTA Buttons
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addCustomCTA}>
            <Plus className="w-4 h-4 mr-1" />
            Add CTA Button
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {customCTAs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ExternalLink className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No custom buttons added yet. Create buttons for downloads, portfolios, or special pages.</p>
            </div>
          ) : (
            customCTAs.map((cta, index) => (
              <div key={cta.id} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-tapinto-blue">Button #{index + 1}</h4>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={cta.enabled}
                      onCheckedChange={(checked) => updateCustomCTA(cta.id, 'enabled', checked)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeCustomCTA(cta.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`cta-text-${cta.id}`}>Button Text</Label>
                    <Input
                      id={`cta-text-${cta.id}`}
                      value={cta.text}
                      onChange={(e) => updateCustomCTA(cta.id, 'text', e.target.value)}
                      placeholder="e.g., Download Free Guide"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cta-url-${cta.id}`}>URL</Label>
                    <Input
                      id={`cta-url-${cta.id}`}
                      value={cta.url}
                      onChange={(e) => updateCustomCTA(cta.id, 'url', e.target.value)}
                      placeholder="https://"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cta-style-${cta.id}`}>Button Style</Label>
                    <select 
                      id={`cta-style-${cta.id}`}
                      className="w-full p-2 border rounded-md"
                      value={cta.style}
                      onChange={(e) => updateCustomCTA(cta.id, 'style', e.target.value)}
                    >
                      <option value="primary">Primary (TAPinto Blue)</option>
                      <option value="secondary">Secondary (Grey)</option>
                      <option value="outline">Outline</option>
                      <option value="gradient">Gradient</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Preview:
                  </div>
                  <Button 
                    variant={cta.style === 'primary' ? 'default' : cta.style === 'outline' ? 'outline' : 'secondary'}
                    size="sm"
                    disabled
                    className={cta.style === 'primary' ? 'bg-tapinto-blue hover:bg-tapinto-blue/90' : ''}
                  >
                    {cta.text || 'Button Preview'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Sticky Save Button */}
      <div className="sticky bottom-4 flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={!hasUnsavedChanges || saving}
          className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2 shadow-lg"
          size="lg"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Changes...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {hasUnsavedChanges ? 'Save Changes' : 'All Changes Saved'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
