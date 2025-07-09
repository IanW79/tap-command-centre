import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Share2, 
  Eye,
  BarChart3,
  QrCode,
  Download,
  Copy,
  ExternalLink,
  Star,
  Sparkles,
  Users,
  TrendingUp
} from 'lucide-react';
import { MEProfile as ProfileOverview } from './me-profile/ProfileOverview';
import { ContactInformation } from './me-profile/ContactInformation';
import { BioSection } from './me-profile/BioSection';
import { ExperienceSection } from './me-profile/ExperienceSection';
import { SocialLinksWall } from './me-profile/SocialLinksWall';
import { BusinessDetails } from './me-profile/BusinessDetails';
import { CallToAction } from './me-profile/CallToAction';
import { AboutCollaboration } from './me-profile/AboutCollaboration';
import { CommunitySpace } from './me-profile/CommunitySpace';
import { PublicProfilePreview } from './me-profile/PublicProfilePreview';
import { EnhancedProfilePreview } from '@/components/networking/EnhancedProfilePreview';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNetworking } from '@/hooks/useNetworking';

interface PackageData {
  individual: any;
  organisation: any;
}

export function MEProfile() {
  const { user } = useAuth();
  const { networkingData } = useNetworking();
  const [activeTab, setActiveTab] = useState('overview');
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(25);
  
  useEffect(() => {
    if (user) {
      fetchPackageData();
    }
  }, [user]);

  const fetchPackageData = async () => {
    try {
      const { data } = await supabase
        .from('user_package_subscriptions')
        .select('package_data')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && data.package_data) {
        setPackageData(data.package_data as unknown as PackageData);
        calculateCompletion(data.package_data as unknown as PackageData);
      }
    } catch (error) {
      console.log('No package data found:', error);
    }
  };

  const calculateCompletion = (data: PackageData) => {
    let completion = 25; // Base completion for having package data
    
    const individual = data.individual;
    if (individual?.firstName && individual?.lastName) completion += 15;
    if (individual?.email && individual?.phone) completion += 15;
    if (individual?.profession) completion += 10;
    if (individual?.interests?.length > 0) completion += 10;
    if (individual?.goals?.length > 0) completion += 10;
    
    if (data.organisation?.hasOrganisation) {
      const org = data.organisation;
      if (org?.companyName) completion += 10;
      if (org?.website) completion += 5;
    }
    
    setProfileCompletion(Math.min(completion, 100));
  };

  // AWS Integration Functions
  const AWS_API_ENDPOINT = 'https://xd89nnm7q6.execute-api.eu-west-2.amazonaws.com/Prod/';

  const saveToAWS = async (profileData: any) => {
    try {
      console.log('Creating standalone ME Profile...', profileData);
      
      const response = await fetch(AWS_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          firstName: profileData.individual?.firstName || '',
          lastName: profileData.individual?.lastName || '',
          email: profileData.individual?.email || '',
          phone: profileData.individual?.phone || '',
          location: profileData.individual?.location || '',
          headline: profileData.individual?.profession || '',
          description: profileData.individual?.bio || '',
          currentRole: profileData.individual?.profession || '',
          company: profileData.organisation?.companyName || '',
          linkedin: profileData.individual?.linkedin || '',
          twitter: profileData.individual?.twitter || '',
          instagram: profileData.individual?.instagram || '',
          facebook: profileData.individual?.facebook || '',
          ctaMessage: 'Let\'s connect and collaborate!',
          ctaButtonText: 'Get In Touch',
          ctaLink: `mailto:\${profileData.individual?.email || ''}`,
          introductionMessage: profileData.individual?.bio || '',
          interests: profileData.individual?.interests || [],
          goals: profileData.individual?.goals || []
        })
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('✅ Standalone Profile Created:', result);
        return { success: true, data: result };
      } else {
        console.error('❌ AWS API Error:', result);
        return { success: false, error: result.message };
      }
      
    } catch (error) {
      console.error('❌ Network Error:', error);
      return { success: false, error: error.message };
    }
  };

  const handleCreateStandaloneProfile = async () => {
    if (!packageData) {
      alert('No package data available. Please complete your package first.');
      return;
    }

    const result = await saveToAWS(packageData);
    
    if (result.success) {
      alert(`🎉 Standalone ME Profile Created Successfully!

Your independent profile URL: \${result.data.profileUrl}
Profile ID: \${result.data.slug}

This profile is now live and independent - perfect for your 89k+ waitlist!`);
    } else {
      alert(`Failed to create standalone profile: \${result.error}`);
    }
  };

  const getProfileUrl = () => {
    const firstName = packageData?.individual?.firstName?.toLowerCase() || 'user';
    const lastName = packageData?.individual?.lastName?.toLowerCase() || 'profile';
    return `tapinto.me/\${firstName}-\${lastName}`;
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://\${getProfileUrl()}`);
  };

  const handleDownloadQR = () => {
    console.log('Downloading QR code...');
  };

  const handleDownloadVCard = () => {
    console.log('Downloading vCard...');
  };

  // Get networking analytics
  const profileViews = networkingData.analytics?.profile_views_count || 0;
  const connections = networkingData.connections.length || 0;

  return (
    <div className="space-y-6">
      {/* Header with Pre-populated Data */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">ME Profile</h1>
            <Badge 
              variant="outline" 
              className={profileCompletion >= 75 ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}
            >
              {profileCompletion >= 75 ? (
                <>
                  <Sparkles className="w-3 h-3 mr-1" />
                  {profileCompletion}% Complete - Looking Great!
                </>
              ) : (
                `\${profileCompletion}% Complete`
              )}
            </Badge>
          </div>
          
          {packageData?.individual?.firstName && (
            <p className="text-gray-600">
              Welcome {packageData.individual.firstName}! Your profile is being built from your package responses.
            </p>
          )}
          
          {/* Enhanced Completion Progress */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                <span className="text-sm text-gray-500">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>
            {profileCompletion < 75 && (
              <div className="text-sm text-amber-600 font-medium">
                Complete your profile to get 3x more visibility!
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons with Enhanced Analytics */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{getProfileUrl()}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                {profileViews} views
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {connections} connections
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Growing
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyUrl}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadQR}>
              <QrCode className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadVCard}>
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
            <Button 
              onClick={handleCreateStandaloneProfile}
              className="bg-green-600 hover:bg-green-700 gap-2"
              disabled={!packageData}
              size="sm"
            >
              <ExternalLink className="w-4 h-4" />
              Create Standalone
            </Button>
          </div>
        </div>
      </div>

      {/* Package Data Integration Alert */}
      {packageData && (
        <Card className="border-tapinto-blue/20 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-tapinto-blue rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Pre-populated from Package Builder</h4>
                <p className="text-sm text-blue-700">
                  We've started your profile using your package responses. Review and enhance each section below.
                </p>
              </div>
              {profileViews > 0 && (
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-900">{profileViews} Profile Views</p>
                  <p className="text-xs text-blue-700">People are finding you!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Networking Growth Alert */}
      {profileViews > 10 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-green-900">Your Profile is Gaining Traction! </h4>
                <p className="text-sm text-green-700">
                  {profileViews} views and {connections} connections. Keep optimising for even better results!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11">
          <TabsTrigger value="overview" className="gap-1 text-xs">
            <User className="w-3 h-3" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-1 text-xs">
            Contact
          </TabsTrigger>
          <TabsTrigger value="bio" className="gap-1 text-xs">
            Bio
          </TabsTrigger>
          <TabsTrigger value="experience" className="gap-1 text-xs">
            Experience
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-1 text-xs">
            Social
          </TabsTrigger>
          <TabsTrigger value="business" className="gap-1 text-xs">
            Business
          </TabsTrigger>
          <TabsTrigger value="cta" className="gap-1 text-xs">
            Call to Action
          </TabsTrigger>
          <TabsTrigger value="collaboration" className="gap-1 text-xs">
            Collaboration
          </TabsTrigger>
          <TabsTrigger value="community" className="gap-1 text-xs">
            Community
          </TabsTrigger>
          <TabsTrigger value="networking" className="gap-1 text-xs">
            <Users className="w-3 h-3" />
            Network
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-1 text-xs">
            <Eye className="w-3 h-3" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProfileOverview completion={profileCompletion} packageData={packageData} />
        </TabsContent>

        <TabsContent value="contact">
          <ContactInformation packageData={packageData} />
        </TabsContent>

        <TabsContent value="bio">
          <BioSection packageData={packageData} />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceSection />
        </TabsContent>

        <TabsContent value="social">
          <SocialLinksWall />
        </TabsContent>

        <TabsContent value="business">
          <BusinessDetails />
        </TabsContent>

        <TabsContent value="cta">
          <CallToAction />
                </TabsContent>

        <TabsContent value="collaboration">
          <AboutCollaboration />
        </TabsContent>

        <TabsContent value="community">
          <CommunitySpace />
        </TabsContent>

        <TabsContent value="networking">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Networking Analytics</h2>
              <p className="text-gray-600 mb-4">
                See how your profile is performing and manage your professional network.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{profileViews}</p>
                        <p className="text-sm text-gray-600">Profile Views</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{connections}</p>
                        <p className="text-sm text-gray-600">Connections</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{networkingData.analytics?.referrals_count || 0}</p>
                        <p className="text-sm text-gray-600">Referrals</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced Profile Preview */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Profile Preview</h3>
              <p className="text-gray-600 mb-4">
                This is how your profile appears to visitors. Make sure it looks great!
              </p>
              <EnhancedProfilePreview 
                profileData={packageData?.individual || {}}
                viewCount={profileViews}
                isPublicView={false}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <PublicProfilePreview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
  
