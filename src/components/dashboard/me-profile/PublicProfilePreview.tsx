import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar, 
  MessageSquare,
  ExternalLink,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Zap,
  Eye,
  Settings,
  Share2,
  Copy,
  Download,
  BarChart3
} from 'lucide-react';

interface PublicProfilePreviewProps {
  packageData?: any;
}

interface PreviewSettings {
  showContactInfo: boolean;
  showSocialLinks: boolean;
  showServices: boolean;
  showExperience: boolean;
  showTestimonials: boolean;
  showRewardsClub: boolean;
  showAffiliateLinks: boolean;
  enableBooking: boolean;
  showSocialImpact: boolean;
}

export function PublicProfilePreview({ packageData }: PublicProfilePreviewProps) {
  // Preview Settings State
  const [previewSettings, setPreviewSettings] = useState<PreviewSettings>({
    showContactInfo: true,
    showSocialLinks: true,
    showServices: true,
    showExperience: true,
    showTestimonials: true,
    showRewardsClub: true,
    showAffiliateLinks: false,
    enableBooking: true,
    showSocialImpact: true
  });

  // Save Functionality States
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Profile Data State (will be populated from package data)
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    company: '',
    location: '',
    bio: '',
    email: '',
    phone: '',
    website: '',
    profileViews: '0',
    rating: 0,
    reviewCount: 0,
    profileUrl: '',
    rewardsClubTier: 'Bronze',
    socialImpactScore: 0
  });

  // Preview Analytics State
  const [previewStats, setPreviewStats] = useState({
    totalViews: 0,
    thisWeekViews: 0,
    profileShares: 0,
    contactClicks: 0,
    bookingClicks: 0,
    conversionRate: 0
  });

  // Populate from package data
  useEffect(() => {
    if (packageData) {
      populateFromPackageData();
    }
  }, [packageData]);

  const populateFromPackageData = () => {
    if (!packageData) return;

    const individual = packageData.individual || {};
    const organisation = packageData.organisation || {};
    const goals = packageData.goals || [];

    // Generate profile URL slug
    const firstName = individual.firstName || 'user';
    const lastName = individual.lastName || '';
    const profileSlug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`.replace(/\s+/g, '-');

    setProfileData({
      name: `${individual.firstName || ''} ${individual.lastName || ''}`.trim() || 'Your Name',
      title: individual.jobTitle || organisation.jobTitle || 'Professional',
      company: organisation.companyName || 'Your Company',
      location: `${individual.city || ''}, ${individual.country || ''}`.replace(/^,\s*/, '') || 'Your Location',
      bio: individual.bio || 'Professional bio will appear here from your profile settings.',
      email: individual.email || 'your.email@example.com',
      phone: individual.phone || '+44 123 456 7890',
      website: individual.website || organisation.website || 'https://your-website.com',
      profileViews: Math.floor(Math.random() * 2000) + 500,
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 50) + 10,
      profileUrl: `https://tapinto.me/${profileSlug}`,
      rewardsClubTier: packageData.selectedPlan?.tier || 'Bronze',
      socialImpactScore: goals.includes('social impact') ? Math.floor(Math.random() * 100) + 50 : Math.floor(Math.random() * 50)
    });

    // Generate preview analytics
    setPreviewStats({
      totalViews: Math.floor(Math.random() * 5000) + 1000,
      thisWeekViews: Math.floor(Math.random() * 200) + 50,
      profileShares: Math.floor(Math.random() * 100) + 20,
      contactClicks: Math.floor(Math.random() * 150) + 30,
      bookingClicks: Math.floor(Math.random() * 80) + 15,
      conversionRate: Math.floor(Math.random() * 15) + 5
    });
  };

  // AWS Save Function
  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    
    try {
      const previewData = {
        settings: previewSettings,
        profileData,
        previewStats,
        analytics: {
          totalViews: previewStats.totalViews,
          conversionRate: previewStats.conversionRate,
          engagementScore: Math.floor(
            (previewStats.contactClicks + previewStats.bookingClicks) / previewStats.totalViews * 100
          )
        },
        updatedAt: new Date().toISOString()
      };

      // AWS Integration
      const response = await fetch('https://xd89nnm7q6.execute-api.eu-west-2.amazonaws.com/Prod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: 'publicProfilePreview',
          data: previewData,
          slug: 'temp-user-slug'
        })
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setHasUnsavedChanges(false);
        console.log('✅ Profile preview settings saved to AWS successfully!', previewData);
      } else {
        throw new Error('Failed to save to AWS');
      }
    } catch (error) {
      console.error('❌ Error saving profile preview:', error);
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Temporary return for CHUNK 1 deployment
  return (
    <div className="space-y-6">
      {/* Success/Error Alerts */}
      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Profile preview settings saved successfully!
          </AlertDescription>
        </Alert>
      )}
      
      {saveError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {saveError}
          </AlertDescription>
        </Alert>
      )}

      {/* Preview Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-tapinto-blue" />
            Profile Preview Settings
            {packageData && (
              <Badge className="bg-tapinto-blue/10 text-tapinto-blue border-tapinto-blue/20">
                <Zap className="w-3 h-3 mr-1" />
                From Package
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Customize how your public profile appears to visitors at: <strong>{profileData.profileUrl}</strong>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(previewSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => {
                    setPreviewSettings({...previewSettings, [key]: checked});
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

           {/* Live Profile Preview */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-tapinto-blue" />
            Live Profile Preview
            <Badge variant="outline" className="text-xs">
              {previewStats.totalViews.toLocaleString()} total views
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Profile Header */}
          <div className="text-center space-y-6">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-tapinto-blue text-white text-3xl">
                {profileData.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'YN'}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
              <p className="text-xl text-gray-600 mb-2">{profileData.title}</p>
              <p className="text-gray-500 mb-4">{profileData.company} • {profileData.location}</p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <Badge variant="outline" className="gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {profileData.rating.toFixed(1)} ({profileData.reviewCount} reviews)
                </Badge>
                <Badge variant="outline" className="gap-1">
                  {profileData.profileViews} profile views
                </Badge>
                {previewSettings.showRewardsClub && (
                  <Badge className={`${
                    profileData.rewardsClubTier === 'Bronze' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                    profileData.rewardsClubTier === 'Silver' ? 'bg-gray-100 text-gray-800 border-gray-300' :
                    profileData.rewardsClubTier === 'Gold' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                    'bg-purple-100 text-purple-800 border-purple-300'
                  }`}>
                    <Star className="w-3 h-3 mr-1" />
                    {profileData.rewardsClubTier} Member
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-gray-700 leading-relaxed text-lg">{profileData.bio}</p>
          </div>

          {/* Contact Information */}
          {previewSettings.showContactInfo && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                {profileData.email}
              </Button>
              <Button variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                {profileData.phone}
              </Button>
              <Button variant="outline" className="gap-2">
                <Globe className="w-4 h-4" />
                Website
              </Button>
            </div>
          )}

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {previewSettings.enableBooking && (
              <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
                <Calendar className="w-4 h-4" />
                Book a Consultation
              </Button>
            )}
            <Button variant="outline" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Send Message
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
          </div>

          {/* Social Impact Section */}
          {previewSettings.showSocialImpact && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Social Impact Score</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">{profileData.socialImpactScore}</div>
                <p className="text-sm text-green-700">Contributing to positive change through TAPinto's Auxilium Model</p>
                <Badge className="bg-green-100 text-green-800 border-green-300 mt-2">
                  <Award className="w-3 h-3 mr-1" />
                  Impact Champion
                </Badge>
              </div>
            </div>
          )}

          {/* Experience Highlights */}
          {previewSettings.showExperience && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-center mb-6">Experience</h3>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <Briefcase className="w-8 h-8 text-tapinto-blue mx-auto mb-2" />
                  <p className="font-medium">10+ Years</p>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 text-tapinto-blue mx-auto mb-2" />
                  <p className="font-medium">25+ Projects</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center">
                  <GraduationCap className="w-8 h-8 text-tapinto-blue mx-auto mb-2" />
                  <p className="font-medium">Professional</p>
                  <p className="text-sm text-gray-600">Certified</p>
                </div>
              </div>
            </div>
          )}

          {/* TAPinto Footer */}
          <div className="text-center pt-8 border-t">
            <p className="text-gray-500 text-sm">
              Powered by TAPinto • The only profile you'll ever need to share
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-tapinto-blue" />
            Preview Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{previewStats.thisWeekViews}</div>
              <div className="text-sm text-blue-700">This Week Views</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{previewStats.profileShares}</div>
              <div className="text-sm text-green-700">Profile Shares</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{previewStats.conversionRate}%</div>
              <div className="text-sm text-purple-700">Conversion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="gap-2">
          <ExternalLink className="w-4 h-4" />
          View Live Profile
        </Button>
        <Button variant="outline" className="gap-2">
          <Copy className="w-4 h-4" />
          Copy Profile URL
        </Button>
        <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
          <Download className="w-4 h-4" />
          Download QR Code
        </Button>
      </div>

      {/* Sticky Save Button */}
      <div className="sticky bottom-4 flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={!hasUnsavedChanges || saving}
          className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2 shadow-lg"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Preview Settings
            </>
          )}
        </Button>
    </div>
  </div>
 );
}
