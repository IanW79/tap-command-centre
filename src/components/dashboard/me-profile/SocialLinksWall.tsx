import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Link,
  Plus,
  Trash2,
  Save,
  ExternalLink,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap
} from 'lucide-react';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  clicks: number;
  active: boolean;
  isFromPackage?: boolean;
}

interface CustomLink {
  id: number;
  title: string;
  url: string;
  clicks: number;
  active: boolean;
  isFromPackage?: boolean;
}

interface SocialLinksWallProps {
  packageData?: any;
}

export function SocialLinksWall({ packageData }: SocialLinksWallProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([]);
  const [enableSocialWall, setEnableSocialWall] = useState(true);
  const [newCustomLink, setNewCustomLink] = useState({ title: '', url: '' });
  
  // Save functionality states
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  // Pre-populate from package data
  useEffect(() => {
    if (packageData) {
      populateFromPackageData();
    }
  }, [packageData]);

  const populateFromPackageData = () => {
    const newSocialLinks: SocialLink[] = [];
    const newCustomLinks: CustomLink[] = [];

    // Extract social media links from package data
    if (packageData?.individual?.socialMedia) {
      Object.entries(packageData.individual.socialMedia).forEach(([platform, url], index) => {
        if (url && typeof url === 'string') {
          newSocialLinks.push({
            id: Date.now() + index,
            platform: platform.charAt(0).toUpperCase() + platform.slice(1),
            url: url as string,
            clicks: Math.floor(Math.random() * 100),
            active: true,
            isFromPackage: true
          });
        }
      });
    }

    // Extract website and portfolio links
    if (packageData?.individual?.website) {
      newCustomLinks.push({
        id: Date.now(),
        title: 'Personal Website',
        url: packageData.individual.website,
        clicks: Math.floor(Math.random() * 150),
        active: true,
        isFromPackage: true
      });
    }

    if (packageData?.organisation?.website) {
      newCustomLinks.push({
        id: Date.now() + 1,
        title: packageData.organisation.companyName || 'Company Website',
        url: packageData.organisation.website,
        clicks: Math.floor(Math.random() * 200),
        active: true,
        isFromPackage: true
      });
    }

    setSocialLinks(newSocialLinks);
    setCustomLinks(newCustomLinks);
  };

  const popularPlatforms = [
    { name: 'LinkedIn', icon: '💼', placeholder: 'https://linkedin.com/in/yourname' },
    { name: 'Twitter', icon: '🐦', placeholder: 'https://twitter.com/yourname' },
    { name: 'Instagram', icon: '📸', placeholder: 'https://instagram.com/yourname' },
    { name: 'Facebook', icon: '👥', placeholder: 'https://facebook.com/yourname' },
    { name: 'YouTube', icon: '📺', placeholder: 'https://youtube.com/@yourname' },
    { name: 'GitHub', icon: '💻', placeholder: 'https://github.com/yourname' }
  ];

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const addSocialLink = (platformName: string, placeholder: string) => {
    const url = prompt(`Enter your ${platformName} URL:`, placeholder);
    if (url && validateUrl(url)) {
      const newLink: SocialLink = {
        id: Date.now(),
        platform: platformName,
        url,
        clicks: 0,
        active: true,
        isFromPackage: false
      };
      setSocialLinks([...socialLinks, newLink]);
      setHasUnsavedChanges(true);
    } else if (url) {
      setSaveError('Please enter a valid URL (including https://)');
    }
  };

  const addCustomLink = () => {
    if (newCustomLink.title && newCustomLink.url) {
      if (!validateUrl(newCustomLink.url)) {
        setSaveError('Please enter a valid URL (including https://)');
        return;
      }
      
      const link: CustomLink = {
        id: Date.now(),
        title: newCustomLink.title,
        url: newCustomLink.url,
        clicks: 0,
        active: true,
        isFromPackage: false
      };
      setCustomLinks([...customLinks, link]);
      setNewCustomLink({ title: '', url: '' });
      setHasUnsavedChanges(true);
      setSaveError('');
    }
  };

  const toggleLinkActive = (id: number, type: 'social' | 'custom') => {
    if (type === 'social') {
      setSocialLinks(socialLinks.map(link =>
        link.id === id ? { ...link, active: !link.active } : link
      ));
    } else {
      setCustomLinks(customLinks.map(link =>
        link.id === id ? { ...link, active: !link.active } : link
      ));
    }
    setHasUnsavedChanges(true);
  };
  const handleSave = async () => {
    setSaving(true);
    setSaveError('');

    try {
      // Prepare data for AWS integration
      const socialLinksData = {
        socialLinks: socialLinks.map(link => ({
          ...link,
          clicks: link.clicks || 0
        })),
        customLinks: customLinks.map(link => ({
          ...link,
          clicks: link.clicks || 0
        })),
        enableSocialWall,
        analytics: {
          totalClicks: socialLinks.reduce((sum, link) => sum + (link.clicks || 0), 0) +
                       customLinks.reduce((sum, link) => sum + (link.clicks || 0), 0),
          activeLinksCount: socialLinks.filter(link => link.active).length +
                            customLinks.filter(link => link.active).length,
          socialPlatformsCount: socialLinks.filter(link => link.active).length,
          customLinksCount: customLinks.filter(link => link.active).length
        },
        updatedAt: new Date().toISOString()
      };

      // AWS Integration - Save to your backend
      const response = await fetch('https://xd89nnm7q6.execute-api.eu-west-2.amazonaws.com/Prod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: 'socialLinks',
          data: socialLinksData,
          slug: 'temp-user-slug'
        })
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setHasUnsavedChanges(false);
        console.log('✅ Social links data saved to AWS successfully!', socialLinksData);
      } else {
        throw new Error('Failed to save to AWS');
      }
    } catch (error) {
      console.error('❌ Error saving social links data:', error);
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const removeLink = (id: number, type: 'social' | 'custom') => {
    if (type === 'social') {
      setSocialLinks(socialLinks.filter(link => link.id !== id));
    } else {
      setCustomLinks(customLinks.filter(link => link.id !== id));
    }
    setHasUnsavedChanges(true);
  };

  const totalClicks = socialLinks.reduce((sum, link) => sum + (link.clicks || 0), 0) +
                     customLinks.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const activeLinksCount = socialLinks.filter(link => link.active).length +
                          customLinks.filter(link => link.active).length;

    return (
    <div className="space-y-6">
      {/* Save Success Alert */}
      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Social links saved successfully! Your profile is now more discoverable. ✨
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

      {/* Package Data Notice */}
      {packageData && (socialLinks.some(link => link.isFromPackage) || customLinks.some(link => link.isFromPackage)) && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Links from Your AI Package</h4>
                <p className="text-sm text-blue-700">
                  We've automatically added your social media and website links from your personalised package responses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Media Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-tapinto-blue" />
            Social Media Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialLinks.length > 0 ? (
            socialLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={link.active}
                    onCheckedChange={() => toggleLinkActive(link.id, 'social')}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{link.platform}</span>
                      {link.isFromPackage && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          From Package
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-md">{link.url}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {link.clicks || 0} clicks
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(link.url, '_blank')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(link.id, 'social')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Link className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No social media links added yet</p>
              <p className="text-sm">Add your social profiles to increase your reach</p>
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Add Popular Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {popularPlatforms.map((platform) => (
                <Button 
                  key={platform.name} 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => addSocialLink(platform.name, platform.placeholder)}
                >
                  <span>{platform.icon}</span>
                  <Plus className="w-3 h-3" />
                  {platform.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Links */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Links (Linktree Style)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customLinks.length > 0 ? (
            customLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={link.active}
                    onCheckedChange={() => toggleLinkActive(link.id, 'custom')}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{link.title}</span>
                      {link.isFromPackage && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          From Package
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-md">{link.url}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {link.clicks || 0} clicks
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(link.url, '_blank')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(link.id, 'custom')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ExternalLink className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No custom links added yet</p>
              <p className="text-sm">Create your own Linktree-style link collection</p>
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Add Custom Link</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Link title"
                value={newCustomLink.title}
                onChange={(e) => setNewCustomLink({ ...newCustomLink, title: e.target.value })}
              />
              <Input
                placeholder="URL (include https://)"
                value={newCustomLink.url}
                onChange={(e) => setNewCustomLink({ ...newCustomLink, url: e.target.value })}
              />
              <Button onClick={addCustomLink} className="gap-1 bg-tapinto-blue hover:bg-tapinto-blue/90">
                <Plus className="w-4 h-4" />
                Add Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Link Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-tapinto-blue" />
            Link Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{totalClicks}</div>
              <div className="text-sm text-gray-600">Total Clicks</div>
              <div className="text-xs text-green-600 mt-1">+12% this month</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{activeLinksCount}</div>
              <div className="text-sm text-gray-600">Active Links</div>
              <div className="text-xs text-blue-600 mt-1">All platforms connected</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">4.2%</div>
              <div className="text-sm text-gray-600">Click Rate</div>
              <div className="text-xs text-purple-600 mt-1">Above average</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sticky Save Button */}
      {hasUnsavedChanges && (
        <div className="sticky bottom-4 flex justify-center">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-tapinto-blue hover:bg-tapinto-blue/90 shadow-lg gap-2 px-6 py-3"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save All Changes
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
