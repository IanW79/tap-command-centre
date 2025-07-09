import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Mail, 
  Briefcase, 
  Link, 
  Users, 
  Target, 
  BarChart3, 
  Eye, 
  Share2, 
  Download,
  QrCode,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Rocket
} from 'lucide-react';

// Import all the section components
import { ContactInformation } from './ContactInformation';
import { BioSection } from './BioSection';
import { ExperienceSection } from './ExperienceSection';
import { SocialLinksWall } from './SocialLinksWall';
import { BusinessDetails } from './BusinessDetails';
import { CallToAction } from './CallToAction';
import { PublicProfilePreview } from './PublicProfilePreview';

interface MEProfileProps {
  packageData?: any;
}

export function MEProfile({ packageData }: MEProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [profileUrl, setProfileUrl] = useState('');
  
  // AWS Integration States
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [creationError, setCreationError] = useState('');
  const [liveProfileUrl, setLiveProfileUrl] = useState('');

  // Mock analytics data
  const [analytics] = useState({
    profileViews: 247,
    connections: 18,
    referrals: 5
  });

  useEffect(() => {
    if (packageData?.individual) {
      const individual = packageData.individual;
      const firstName = individual.firstName || '';
      const lastName = individual.lastName || '';
      
      if (firstName && lastName) {
        const slug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
        setProfileUrl(`tapinto.me/${slug}`);
      }
      
      // Calculate completion based on package data
      calculateProfileCompletion();
    }
  }, [packageData]);

  const calculateProfileCompletion = () => {
    if (!packageData?.individual) {
      setProfileCompletion(0);
      return;
    }

    const individual = packageData.individual;
    const organisation = packageData.organisation;
    let completedSections = 0;
    const totalSections = 8;

    // Contact Information (required fields)
    if (individual.firstName && individual.lastName && individual.email) {
      completedSections += 1;
    }

    // Bio Section
    if (individual.profession || individual.interests?.length > 0) {
      completedSections += 1;
    }

    // Experience Section
    if (individual.profession) {
      completedSections += 1;
    }

    // Social Links (assume some are filled)
    completedSections += 1;

    // Business Details
    if (organisation?.hasOrganisation && organisation?.companyName) {
      completedSections += 1;
    }

    // Call to Action
    if (individual.goals?.length > 0) {
      completedSections += 1;
    }

    // Community/Networking
    if (individual.interests?.length > 0) {
      completedSections += 1;
    }

    // Profile customisation
    completedSections += 1;

    const percentage = Math.round((completedSections / totalSections) * 100);
    setProfileCompletion(percentage);
  };

  const handleCreateStandaloneProfile = async () => {
    if (!packageData?.individual?.firstName || !packageData?.individual?.lastName) {
      setCreationError('First name and last name are required to create a profile.');
      return;
    }

    setCreatingProfile(true);
    setCreationError('');

    try {
      const individual = packageData.individual;
      const organisation = packageData.organisation;

      // Prepare comprehensive profile data for AWS
      const profileData = {
        // Basic Information
        firstName: individual.firstName,
        lastName: individual.lastName,
        email: individual.email,
        phone: individual.phone || '',
        location: individual.location || '',
        
        // Professional Information
        jobTitle: individual.profession || '',
        company: organisation?.companyName || '',
        
        // Bio and Description
        bio: `${individual.profession || 'Professional'}${organisation?.companyName ? ` at ${organisation.companyName}` : ''}. ${individual.location ? `Based in ${individual.location}.` : ''} ${individual.interests?.length > 0 ? `Passionate about ${individual.interests.slice(0, 3).join(', ')}.` : ''} Let's connect and explore opportunities together.`,
        
        // Experience and Skills
        experience: individual.profession ? [{
          title: individual.profession,
          company: organisation?.companyName || '',
          current: true,
          description: `Experienced ${individual.profession.toLowerCase()} with expertise in ${individual.interests?.slice(0, 2).join(' and ') || 'various areas'}.`
        }] : [],
        
        // Social Links (mock data for now)
        socialLinks: [
          { platform: 'LinkedIn', url: `https://linkedin.com/in/${individual.firstName?.toLowerCase()}-${individual.lastName?.toLowerCase()}`, active: true },
          { platform: 'Email', url: `mailto:${individual.email}`, active: true }
        ],
        
        // Business Details
        businessDetails: organisation?.hasOrganisation ? {
          companyName: organisation.companyName,
          industry: organisation.industry || '',
          teamSize: organisation.teamSize || '',
          website: organisation.website || ''
        } : null,
        
        // Goals and Interests
        goals: individual.goals || [],
        interests: individual.interests || [],
        challenges: individual.challenges || [],
        
        // Profile Settings
        profileCompletion: profileCompletion,
        createdAt: new Date().toISOString(),
        packageData: packageData
      };

      // Call AWS API
      const response = await fetch('https://xd89nnm7q6.execute-api.eu-west-2.amazonaws.com/Prod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Set the live profile URL
      const slug = `${individual.firstName.toLowerCase()}-${individual.lastName.toLowerCase()}`;
      const liveUrl = `https://tapinto.me/${slug}`;
      setLiveProfileUrl(liveUrl);
      setProfileCreated(true);
      
      console.log('✅ Standalone ME Profile created successfully!', result);
      
    } catch (error) {
      console.error('❌ Error creating profile:', error);
      setCreationError('Failed to create profile. Please check your internet connection and try again.');
    } finally {
      setCreatingProfile(false);
    }
  };

  const handleCopyUrl = () => {
    const urlToCopy = liveProfileUrl || profileUrl;
    navigator.clipboard.writeText(urlToCopy);
  };

  const handleDownloadQR = () => {
    console.log('Downloading QR code for:', liveProfileUrl || profileUrl);
  };

  const handleDownloadVCard = () => {
    console.log('Downloading vCard for profile');
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionMessage = (percentage: number) => {
    if (percentage >= 90) return 'Your profile is looking fantastic! 🌟';
    if (percentage >= 70) return 'Great progress! A few more details will make it shine ✨';
    if (percentage >= 50) return 'You\'re halfway there! Keep going 💪';
    return 'Let\'s build an amazing profile together 🚀';
  };

  return (
    <div className="space-y-6">
      {/* Profile Creation Success */}
      {profileCreated && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-2">
              <p className="font-medium">🎉 Your ME Profile is now live!</p>
              <p>Your profile is available at: <strong>{liveProfileUrl}</strong></p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => window.open(liveProfileUrl, '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Live Profile
                </Button>
                <Button size="sm" variant="outline" onClick={handleCopyUrl}>
                  <Share2 className="w-4 h-4 mr-1" />
                  Copy URL
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Profile Creation Error */}
      {creationError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {creationError}
          </AlertDescription>
        </Alert>
      )}

      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-tapinto-blue" />
                ME Profile Builder
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Create your professional digital identity
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-tapinto-blue">{profileCompletion}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className={`text-sm ${getCompletionColor(profileCompletion)}`}>
                {getCompletionMessage(profileCompletion)}
              </span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>

          {/* Profile URL */}
          {profileUrl && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">Your Profile URL</div>
                  <div className="text-tapinto-blue font-mono text-sm">{liveProfileUrl || profileUrl}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCopyUrl}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleDownloadQR}>
                    <QrCode className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleDownloadVCard}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Create Standalone Profile Button */}
          {!profileCreated && profileCompletion >= 50 && (
            <div className="bg-gradient-to-r from-tapinto-blue/10 to-purple-100 p-4 rounded-lg border border-tapinto-blue/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Ready to Go Live?</h3>
                  <p className="text-sm text-gray-600">Create your standalone ME Profile and get your live URL</p>
                </div>
                <Button 
                  onClick={handleCreateStandaloneProfile}
                  disabled={creatingProfile}
                  className="bg-tapinto-blue hover:bg-tapinto-blue/90"
                >
                  {creatingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Create Standalone Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Analytics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{analytics.profileViews}</div>
              <div className="text-sm text-gray-500">Profile Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{analytics.connections}</div>
              <div className="text-sm text-gray-500">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{analytics.referrals}</div>
              <div className="text-sm text-gray-500">Referrals</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="bio">Bio</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('contact')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-8 h-8 text-tapinto-blue" />
                  <div>
                    <h3 className="font-medium">Contact Information</h3>
                    <p className="text-sm text-gray-500">Add your contact details</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('bio')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <User className="w-8 h-8 text-tapinto-blue" />
                  <div>
                    <h3 className="font-medium">Bio & About</h3>
                    <p className="text-sm text-gray-500">Tell your story</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('experience')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-tapinto-blue" />
                  <div>
                    <h3 className="font-medium">Experience</h3>
                    <p className="text-sm text-gray-500">Showcase your work</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('social')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Link className="w-8 h-8 text-tapinto-blue" />
                  <div>
                    <h3 className="font-medium">Social Links</h3>
                    <p className="text-sm text-gray-500">Connect your platforms</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('business')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-tapinto-blue" />
                  <div>
                    <h3 className="font-medium">Business Details</h3>
                    <p className="text-sm text-gray-500">Company information</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('preview')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-8 h-8 text-tapinto-blue" />
                  <div>
                    <h3 className="font-medium">Preview Profile</h3>
                    <p className="text-sm text-gray-500">See how it looks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <ContactInformation />
        </TabsContent>

        <TabsContent value="bio">
          <BioSection />
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

        <TabsContent value="preview">
          <PublicProfilePreview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
