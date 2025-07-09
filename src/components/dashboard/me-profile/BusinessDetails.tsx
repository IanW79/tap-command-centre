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
  Briefcase, 
  Plus, 
  Trash2, 
  Save,
  Clock,
  MapPin,
  DollarSign,
  Building,
  Globe,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface BusinessDetailsProps {
  packageData?: any;
}

export function BusinessDetails({ packageData }: BusinessDetailsProps) {
  // Core business information
  const [businessInfo, setBusinessInfo] = useState({
    companyName: '',
    website: '',
    vatNumber: '',
    companyRegistration: '',
    businessType: '',
    yearEstablished: '',
    numberOfEmployees: '',
    businessDescription: ''
  });

  const [services, setServices] = useState([
    { id: 1, name: 'Digital Marketing Strategy', description: 'Complete digital marketing strategy development', price: '£2,500', duration: '2-3 weeks' },
    { id: 2, name: 'Social Media Management', description: 'Full social media management and content creation', price: '£1,200/month', duration: 'Ongoing' }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Marketing Masterclass', description: 'Online course covering advanced marketing techniques', price: '£297', type: 'Digital Product' }
  ]);

  const [businessHours, setBusinessHours] = useState({
    monday: { open: '09:00', close: '17:00', enabled: true },
    tuesday: { open: '09:00', close: '17:00', enabled: true },
    wednesday: { open: '09:00', close: '17:00', enabled: true },
    thursday: { open: '09:00', close: '17:00', enabled: true },
    friday: { open: '09:00', close: '17:00', enabled: true },
    saturday: { open: '', close: '', enabled: false },
    sunday: { open: '', close: '', enabled: false }
  });

  const [serviceAreas, setServiceAreas] = useState(['London', 'Manchester', 'Remote/Online']);
  const [newServiceArea, setNewServiceArea] = useState('');

  // Save state management
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Pre-populate from package data
  useEffect(() => {
    if (packageData?.organisation) {
      const org = packageData.organisation;
      setBusinessInfo(prev => ({
        ...prev,
        companyName: org.companyName || '',
        website: org.website || '',
        vatNumber: org.vatNumber || '',
        companyRegistration: org.companyRegistration || '',
        businessType: org.businessType || '',
        yearEstablished: org.yearEstablished || '',
        numberOfEmployees: org.numberOfEmployees || '',
        businessDescription: org.businessDescription || ''
      }));
    }
  }, [packageData]);

  // Handle business info changes
  const handleBusinessInfoChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
    setSaveError('');
  };

  // Save function with proper loading states
  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      // Simulate API call - replace with actual save logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const businessData = {
        businessInfo,
        services,
        products,
        businessHours,
        serviceAreas
      };
      
      console.log('✅ Business details saved:', businessData);
      
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
      
    } catch (error) {
      console.error('❌ Error saving business details:', error);
      setSaveError('Failed to save business details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Service management functions
  const addService = () => {
    const newService = {
      id: Date.now(),
      name: '',
      description: '',
      price: '',
      duration: ''
    };
    setServices([...services, newService]);
    setHasUnsavedChanges(true);
  };

  const removeService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    setHasUnsavedChanges(true);
  };

  const updateService = (id: number, field: string, value: string) => {
    setServices(services.map(s => 
      s.id === id ? {...s, [field]: value} : s
    ));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Product management functions
  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: '',
      description: '',
      price: '',
      type: ''
    };
    setProducts([...products, newProduct]);
    setHasUnsavedChanges(true);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    setHasUnsavedChanges(true);
  };

  const updateProduct = (id: number, field: string, value: string) => {
    setProducts(products.map(p => 
      p.id === id ? {...p, [field]: value} : p
    ));
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Service area management
  const addServiceArea = () => {
    if (newServiceArea.trim() && !serviceAreas.includes(newServiceArea.trim())) {
      setServiceAreas([...serviceAreas, newServiceArea.trim()]);
      setNewServiceArea('');
      setHasUnsavedChanges(true);
    }
  };

  const removeServiceArea = (area: string) => {
    setServiceAreas(serviceAreas.filter(a => a !== area));
    setHasUnsavedChanges(true);
  };

  // Business hours management
  const updateBusinessHours = (day: string, field: string, value: string | boolean) => {
    setBusinessHours({
      ...businessHours,
      [day]: {...businessHours[day as keyof typeof businessHours], [field]: value}
    });
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Check if field is pre-populated
  const isPrePopulated = (field: string) => {
    return !!(packageData?.organisation?.[field]);
  };

  return (
    <div className="space-y-6">
      {/* Save Success Alert */}
      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Business details saved successfully! ✨
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
      {packageData?.organisation && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900">Business Information Pre-filled</h4>
                <p className="text-sm text-blue-700">
                  Fields marked with a badge have been pre-filled from your package responses. You can edit any information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Core Business Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-tapinto-blue" />
              Business Information
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
              <div className="flex items-center gap-2">
                <Label htmlFor="companyName">Company Name *</Label>
                {isPrePopulated('companyName') && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    From Package
                  </Badge>
                )}
              </div>
              <Input
                id="companyName"
                value={businessInfo.companyName}
                onChange={(e) => handleBusinessInfoChange('companyName', e.target.value)}
                placeholder="Your company name"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
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
                value={businessInfo.website}
                onChange={(e) => handleBusinessInfoChange('website', e.target.value)}
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Input
                id="businessType"
                value={businessInfo.businessType}
                onChange={(e) => handleBusinessInfoChange('businessType', e.target.value)}
                placeholder="e.g., Limited Company, Sole Trader, Partnership"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearEstablished">Year Established</Label>
              <Input
                id="yearEstablished"
                type="number"
                value={businessInfo.yearEstablished}
                onChange={(e) => handleBusinessInfoChange('yearEstablished', e.target.value)}
                placeholder="e.g., 2020"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vatNumber">VAT Number</Label>
              <Input
                id="vatNumber"
                value={businessInfo.vatNumber}
                onChange={(e) => handleBusinessInfoChange('vatNumber', e.target.value)}
                placeholder="GB123456789"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyRegistration">Company Registration</Label>
              <Input
                id="companyRegistration"
                value={businessInfo.companyRegistration}
                onChange={(e) => handleBusinessInfoChange('companyRegistration', e.target.value)}
                placeholder="e.g., 12345678"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfEmployees">Number of Employees</Label>
            <Input
              id="numberOfEmployees"
              value={businessInfo.numberOfEmployees}
              onChange={(e) => handleBusinessInfoChange('numberOfEmployees', e.target.value)}
              placeholder="e.g., 1-10, 11-50, 51-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description</Label>
            <Textarea
              id="businessDescription"
              value={businessInfo.businessDescription}
              onChange={(e) => handleBusinessInfoChange('businessDescription', e.target.value)}
              placeholder="Describe what your business does, your target market, and key services..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

            {/* Services Offered */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-tapinto-blue" />
            Services Offered
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addService}>
            <Plus className="w-4 h-4 mr-1" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {services.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No services added yet. Click "Add Service" to get started.</p>
            </div>
          ) : (
            services.map((service, index) => (
              <div key={service.id} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-tapinto-blue">Service #{index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeService(service.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`service-name-${service.id}`}>Service Name *</Label>
                    <Input
                      id={`service-name-${service.id}`}
                      value={service.name}
                      onChange={(e) => updateService(service.id, 'name', e.target.value)}
                      placeholder="e.g., Digital Marketing Strategy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`service-price-${service.id}`}>Price</Label>
                    <Input
                      id={`service-price-${service.id}`}
                      value={service.price}
                      onChange={(e) => updateService(service.id, 'price', e.target.value)}
                      placeholder="e.g., £2,500 or £1,200/month"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`service-description-${service.id}`}>Description</Label>
                  <Textarea
                    id={`service-description-${service.id}`}
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    placeholder="Describe what this service includes, benefits, and deliverables..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`service-duration-${service.id}`}>Duration/Timeline</Label>
                  <Input
                    id={`service-duration-${service.id}`}
                    value={service.duration}
                    onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                    placeholder="e.g., 2-3 weeks, Ongoing, 1-2 months"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Products Available */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-tapinto-blue" />
            Products Available
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addProduct}>
            <Plus className="w-4 h-4 mr-1" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No products added yet. Click "Add Product" to get started.</p>
            </div>
          ) : (
            products.map((product, index) => (
              <div key={product.id} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-tapinto-blue">Product #{index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeProduct(product.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`product-name-${product.id}`}>Product Name *</Label>
                    <Input 
                      id={`product-name-${product.id}`}
                      value={product.name} 
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                      placeholder="e.g., Marketing Masterclass" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`product-price-${product.id}`}>Price</Label>
                    <Input 
                      id={`product-price-${product.id}`}
                      value={product.price} 
                      onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                      placeholder="e.g., £297" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`product-type-${product.id}`}>Type</Label>
                    <Input 
                      id={`product-type-${product.id}`}
                      value={product.type} 
                      onChange={(e) => updateProduct(product.id, 'type', e.target.value)}
                      placeholder="e.g., Digital Product, Physical Product" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`product-description-${product.id}`}>Description</Label>
                  <Textarea 
                    id={`product-description-${product.id}`}
                    value={product.description} 
                    onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                    placeholder="Product description, features, and benefits..." 
                    rows={2} 
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

            {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-tapinto-blue" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(businessHours).map(([day, hours]) => (
            <div key={day} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <Switch 
                  checked={hours.enabled}
                  onCheckedChange={(checked) => updateBusinessHours(day, 'enabled', checked)}
                />
                <span className="font-medium capitalize w-20">{day}</span>
              </div>
              
              {hours.enabled && (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={hours.open}
                    onChange={(e) => updateBusinessHours(day, 'open', e.target.value)}
                    className="w-24"
                  />
                  <span className="text-gray-500">to</span>
                  <Input
                    type="time"
                    value={hours.close}
                    onChange={(e) => updateBusinessHours(day, 'close', e.target.value)}
                    className="w-24"
                  />
                </div>
              )}
              
              {!hours.enabled && (
                <Badge variant="outline" className="text-gray-500">
                  Closed
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Service Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-tapinto-blue" />
            Service Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newServiceArea}
              onChange={(e) => setNewServiceArea(e.target.value)}
              placeholder="Add service area (e.g., London, Manchester, Remote)"
              onKeyPress={(e) => e.key === 'Enter' && addServiceArea()}
              className="flex-1"
            />
            <Button onClick={addServiceArea} size="sm" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {serviceAreas.length === 0 ? (
              <p className="text-gray-500 text-sm">No service areas added yet.</p>
            ) : (
              serviceAreas.map((area) => (
                <Badge key={area} variant="secondary" className="gap-1 bg-tapinto-blue/10 text-tapinto-blue border-tapinto-blue/20">
                  <MapPin className="w-3 h-3" />
                  {area}
                  <button 
                    onClick={() => removeServiceArea(area)}
                    className="ml-1 hover:text-red-500 font-bold"
                    title="Remove service area"
                  >
                    ×
                  </button>
                </Badge>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Final Save Button */}
      <div className="flex justify-end sticky bottom-4 bg-white p-4 border rounded-lg shadow-lg">
        <Button 
          onClick={handleSave}
          disabled={!hasUnsavedChanges || saving}
          className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2 px-6"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Business Details...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {hasUnsavedChanges ? 'Save All Changes' : 'No Changes to Save'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
