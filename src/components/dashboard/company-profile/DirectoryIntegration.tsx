
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  MapPin, 
  Clock, 
  Star, 
  Eye, 
  Plus, 
  X,
  Globe,
  Phone
} from 'lucide-react';

interface DirectoryIntegrationProps {
  onDataChange: () => void;
}

export function DirectoryIntegration({ onDataChange }: DirectoryIntegrationProps) {
  const [directoryData, setDirectoryData] = useState({
    isPublicListing: true,
    category: 'Technology Services',
    tags: ['Software Development', 'Digital Transformation', 'Cloud Solutions'],
    services: [
      'Custom Software Development',
      'Cloud Migration Services',
      'Digital Strategy Consulting',
      'System Integration'
    ],
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

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      author: 'Jane Wilson',
      company: 'StartupCorp',
      rating: 5,
      text: 'TechFlow Solutions transformed our business operations with their innovative software solutions.'
    },
    {
      id: 2,
      author: 'Robert Chen',
      company: 'GrowthTech',
      rating: 5,
      text: 'Outstanding service and support. The team delivered exactly what we needed on time.'
    }
  ]);

  const [newTag, setNewTag] = useState('');
  const [newService, setNewService] = useState('');

  const addTag = () => {
    if (newTag.trim() && !directoryData.tags.includes(newTag.trim())) {
      setDirectoryData({
        ...directoryData,
        tags: [...directoryData.tags, newTag.trim()]
      });
      setNewTag('');
      onDataChange();
    }
  };

  const removeTag = (tag: string) => {
    setDirectoryData({
      ...directoryData,
      tags: directoryData.tags.filter(t => t !== tag)
    });
    onDataChange();
  };

  const addService = () => {
    if (newService.trim() && !directoryData.services.includes(newService.trim())) {
      setDirectoryData({
        ...directoryData,
        services: [...directoryData.services, newService.trim()]
      });
      setNewService('');
      onDataChange();
    }
  };

  const removeService = (service: string) => {
    setDirectoryData({
      ...directoryData,
      services: directoryData.services.filter(s => s !== service)
    });
    onDataChange();
  };

  return (
    <div className="space-y-6">
      {/* Directory Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Directory Listing Status
            </span>
            <Switch 
              checked={directoryData.isPublicListing}
              onCheckedChange={(checked) => {
                setDirectoryData({...directoryData, isPublicListing: checked});
                onDataChange();
              }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${directoryData.isPublicListing ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="font-medium">
              {directoryData.isPublicListing ? 'Public listing is active' : 'Directory listing is private'}
            </span>
            <Button variant="outline" size="sm" className="gap-2 ml-auto">
              <Eye className="w-4 h-4" />
              Preview Listing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category & Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Category & Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Business Category</label>
            <Input
              value={directoryData.category}
              onChange={(e) => {
                setDirectoryData({...directoryData, category: e.target.value});
                onDataChange();
              }}
              placeholder="e.g., Technology Services"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {directoryData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-2">
                  {tag}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-600" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(directoryData.hours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-700 capitalize">
                  {day}
                </div>
                <Input
                  value={hours}
                  onChange={(e) => {
                    setDirectoryData({
                      ...directoryData,
                      hours: { ...directoryData.hours, [day]: e.target.value }
                    });
                    onDataChange();
                  }}
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Offered */}
      <Card>
        <CardHeader>
          <CardTitle>Services & Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Services Offered</label>
            <div className="space-y-2 mb-3">
              {directoryData.services.map((service) => (
                <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>{service}</span>
                  <X 
                    className="w-4 h-4 cursor-pointer hover:text-red-600" 
                    onClick={() => removeService(service)}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add a service or product"
                onKeyPress={(e) => e.key === 'Enter' && addService()}
              />
              <Button onClick={addService} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Customer Testimonials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Testimonial
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Directory Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Directory Listing Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">TechFlow Solutions</h3>
                <Badge variant="outline" className="mt-1">{directoryData.category}</Badge>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <p className="text-gray-600">
              Innovative Technology Solutions for Modern Business
            </p>
            
            <div className="flex flex-wrap gap-2">
              {directoryData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                New York, NY
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {directoryData.hours.monday}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
