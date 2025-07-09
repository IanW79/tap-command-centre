import { PricingEngine } from './PricingEngine';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Check, 
  Star,
  ArrowRight,
  RefreshCw,
  User,
  Briefcase,
  Phone,
  Share2,
  Target,
  Users
} from 'lucide-react';
import { ConversationData } from '@/pages/Index';

interface PackageGenerationProps {
  conversationData: ConversationData;
  onStartOver: () => void;
  onComplete?: (packageData: any) => void;
}

export function PackageGeneration({ conversationData, onStartOver, onComplete }: PackageGenerationProps) {
  const [generating, setGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [generatedPackage, setGeneratedPackage] = useState<any>(null);

  useEffect(() => {
    generatePackage();
  }, []);

  const generatePackage = async () => {
    setGenerating(true);
    setProgress(0);
    
    // Enhanced steps with ME Profile data capture
    const steps = [
      { message: "Analysing your profile data...", progress: 10 },
      { message: "Creating your professional bio...", progress: 20 },
      { message: "Setting up contact preferences...", progress: 30 },
      { message: "Building business details...", progress: 40 },
      { message: "Configuring social presence...", progress: 50 },
      { message: "Designing call-to-action...", progress: 60 },
      { message: "Setting up networking preferences...", progress: 70 },
      { message: "Creating community connections...", progress: 80 },
      { message: "Finalising your ME Profile data...", progress: 90 },
      { message: "Creating your complete package...", progress: 100 }
    ];

    for (const step of steps) {
      setCurrentStep(step.message);
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step.progress);
    }

    // Generate comprehensive package WITH ME Profile data cards
    const packageData = {
      name: conversationData.organisation.hasOrganisation ? 'Business Growth Package' : 'Professional Package',
      basePrice: 199,
      features: generateFeatures(),
      pricing: generatePricing(),
      personalizedBenefits: generatePersonalizedBenefits(),
      
      // 🚀 NEW: ME Profile Data Cards - THE GAME CHANGER
      profileDataCards: generateProfileDataCards(),
      
      // Enhanced package metadata
      completionLevel: calculateCompletionLevel(),
      readyToLaunch: true,
      estimatedSetupTime: '5 minutes'
    };

    setGeneratedPackage(packageData);
    setGenerating(false);
  };

  const generateProfileDataCards = () => {
    return {
      // Personal Card
      personal: {
        firstName: conversationData.individual.firstName || '',
        lastName: conversationData.individual.lastName || '',
        profession: conversationData.individual.profession || '',
        bio: generateAIProfessionalBio(),
        profileImage: null,
        tagline: generateAITagline(),
        personalBrand: generatePersonalBrand(),
        source: 'ai_package_builder',
        completeness: 85
      },

      // Contact Card  
      contact: {
        email: conversationData.individual.email || '',
        phone: '',
        website: conversationData.organisation.hasOrganisation ? generateWebsiteFromBusiness() : '',
        whatsapp: '',
        address: conversationData.organisation.hasOrganisation ? 'Business address to be added' : '',
        socialPlatforms: generateSocialPlatforms(),
        preferredContact: 'email',
        availability: generateAvailability(),
        vcardEnabled: true,
        source: 'ai_package_builder',
        completeness: 70
      },

      // Business Card
      business: {
        companyName: conversationData.organisation.organisationName || '',
        industry: conversationData.individual.profession || '',
        services: generateAIServices(),
        products: generateAIProducts(),
        businessHours: generateBusinessHours(),
        serviceAreas: ['Local', 'Regional', 'National'],
        targetMarket: generateTargetMarket(),
        clientTypes: generateClientTypes(),
        sectorsWorkedIn: generateSectors(),
        source: 'ai_package_builder',
        completeness: conversationData.organisation.hasOrganisation ? 80 : 40
      },

      // Experience Card
      experience: {
        currentRole: conversationData.individual.profession || '',
        company: conversationData.organisation.organisationName || '',
        achievements: generateAIAchievements(),
        skills: conversationData.individual.interests || [],
        yearsExperience: 'To be specified',
        education: 'To be added',
        certifications: [],
        keyProjects: generateKeyProjects(),
        source: 'ai_package_builder',
        completeness: 60
      },

      // Social Card
      social: {
        platforms: generateSocialPlatforms(),
        contentFocus: conversationData.individual.interests || [],
        engagementStyle: 'Professional',
        socialWallEnabled: false,
        shareFeatures: true,
        socialProof: generateSocialProof(),
        source: 'ai_package_builder',
        completeness: 50
      },

      // Call to Action Card
      callToAction: {
        primaryCTA: generatePrimaryCTA(),
        secondaryCTA: 'Connect with me',
        meetingLink: '',
        specialOffer: generateSpecialOffer(),
        ctaStyle: 'professional',
        consultationForm: conversationData.organisation.hasOrganisation,
        downloadableResources: generateDownloadableResources(),
        source: 'ai_package_builder',
        completeness: 75
      },

      // Community Card
      community: {
        networkingGoals: conversationData.individual.goals || [],
        collaborationTypes: generateCollaborationTypes(),
        introductionPreferences: generateIntroPreferences(),
        communitySpaces: [],
        referralProgram: true,
        ambassadorInterest: false,
        travelWillingness: generateTravelPreferences(),
        businessIntroductions: generateBusinessIntroductionWants(),
        source: 'ai_package_builder',
        completeness: 65
      },

      // About Me Card (New based on context)
      aboutMe: {
        introductionTemplate: generateIntroductionTemplate(),
        connectionTypes: generateConnectionTypes(),
        networkDescription: generateNetworkDescription(),
        bestIntroductionMethod: generateBestIntroMethod(),
        collaborationStyle: generateCollaborationStyle(),
        source: 'ai_package_builder',
        completeness: 70
      }
    };
  };

  // AI Content Generation Helpers
  const generateAIProfessionalBio = () => {
    const profession = conversationData.individual.profession || 'Professional';
    const interests = conversationData.individual.interests?.slice(0, 2).join(' and ') || 'innovation';
    const goals = conversationData.individual.goals?.[0] || 'excellence';
    const hasOrg = conversationData.organisation.hasOrganisation;
    
    if (hasOrg) {
      return `\${profession} at \${conversationData.organisation.organisationName || 'my company'}, passionate about \${interests}. Focused on \${goals} and building meaningful business partnerships. Let's connect and explore opportunities to collaborate and grow together.`;
    }
    
    return `\${profession} passionate about \${interests}. Focused on \${goals} and building meaningful professional connections. I believe in the power of networking and collaboration to create positive impact. Let's connect!`;
  };

  const generateAITagline = () => {
    const profession = conversationData.individual.profession || 'Professional';
    const hasOrg = conversationData.organisation.hasOrganisation;
    
    if (hasOrg) {
      return `\${profession} | Building Business Success Through Strategic Partnerships`;
    }
    return `\${profession} | Connecting Ideas with Impact`;
  };

  const generatePersonalBrand = () => {
    const interests = conversationData.individual.interests || [];
    const goals = conversationData.individual.goals || [];
    
    return {
      coreValues: interests.slice(0, 3),
      mission: goals[0] || 'Creating meaningful professional connections',
      uniqueValue: `Combining \${conversationData.individual.profession || 'professional expertise'} with genuine relationship building`
    };
  };

  const generateAIServices = () => {
    if (!conversationData.organisation.hasOrganisation) return [];
    
    const profession = conversationData.individual.profession || 'Professional';
    const interests = conversationData.individual.interests || [];
    
    const baseServices = [
      `\${profession} Consulting`,
      'Strategic Planning',
      'Business Development'
    ];
    
    if (interests.includes('sustainability')) {
      baseServices.push('Sustainable Business Practices');
    }
    
    return baseServices;
  };

  const generateAIProducts = () => {
    if (!conversationData.organisation.hasOrganisation) return [];
    
    return [
      'Professional Consultation Sessions',
      'Strategic Planning Workshops',
      'Business Growth Resources'
    ];
  };

  const generateBusinessHours = () => {
    return {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { closed: true },
      sunday: { closed: true }
    };
  };

  const generateTargetMarket = () => {
    const profession = conversationData.individual.profession || '';
    const hasOrg = conversationData.organisation.hasOrganisation;
    
    if (hasOrg) {
      return `Businesses seeking \${profession.toLowerCase()} expertise and strategic guidance`;
    }
    return `Professionals in complementary fields looking for collaboration`;
  };

  const generateClientTypes = () => {
    return [
      'Small to Medium Enterprises',
      'Growing Businesses',
      'Professional Services',
      'Entrepreneurs'
    ];
  };

  const generateSectors = () => {
    const interests = conversationData.individual.interests || [];
    const baseSectors = ['Professional Services', 'Technology', 'Business Development'];
    
    if (interests.includes('sustainability')) {
      baseSectors.push('Sustainable Business');
    }
    
    return baseSectors;
  };

  const generateAIAchievements = () => {
    const profession = conversationData.individual.profession || 'Professional';
    return [
      `Established expertise in \${profession.toLowerCase()}`,
      'Built strong professional network',
      'Committed to continuous learning and growth'
    ];
  };

  const generateKeyProjects = () => {
    return [
      'Professional development initiatives',
      'Strategic business planning',
      'Network building and partnerships'
    ];
  };

  const generateSocialPlatforms = () => {
    return [
      { platform: 'LinkedIn', url: '', active: true },
      { platform: 'Twitter', url: '', active: false },
      { platform: 'Instagram', url: '', active: false }
    ];
  };

  const generateSocialProof = () => {
    return {
      testimonials: [],
      recommendations: 0,
      networkSize: 'Growing professional network',
      engagement: 'Active in professional communities'
    };
  };

  const generatePrimaryCTA = () => {
    if (conversationData.organisation.hasOrganisation) {
      return 'Book a Consultation';
    }
    return 'Let\'s Connect';
  };

  const generateSpecialOffer = () => {
    if (conversationData.organisation.hasOrganisation) {
      return 'Free 30-minute strategy consultation for new connections';
    }
    return 'Coffee chat to explore collaboration opportunities';
  };

  const generateDownloadableResources = () => {
    return [
      'Professional Bio & Background',
      'Services Overview',
      'Collaboration Guide'
    ];
  };

  const generateCollaborationTypes = () => {
    const interests = conversationData.individual.interests || [];
    const baseTypes = [
      'Strategic partnerships',
      'Knowledge sharing',
      'Project collaboration',
      'Mentoring opportunities'
    ];
    
    if (interests.includes('sustainability')) {
      baseTypes.push('Sustainable business initiatives');
    }
    
    return baseTypes;
  };

  const generateIntroPreferences = () => {
    return {
      preferredMethod: 'Email introduction with context',
      responseTime: 'Within 48 hours',
      meetingPreference: 'Virtual or coffee meetings',
      followUpStyle: 'Professional and relationship-focused'
    };
  };

  const generateTravelPreferences = () => {
    return {
      local: true,
      regional: true,
      national: false,
      international: false,
      maxDistance: '50 miles for face-to-face meetings'
    };
  };

  const generateBusinessIntroductionWants = () => {
    const profession = conversationData.individual.profession || '';
    return [
      `Businesses needing \${profession.toLowerCase()} expertise`,
      'Strategic partners in complementary fields',
      'Growth-focused companies',
      'Professional service providers'
    ];
  };

  const generateIntroductionTemplate = () => {
    const firstName = conversationData.individual.firstName || 'I';
    const profession = conversationData.individual.profession || 'professional';
    
    return `Hi, I'd like to introduce you to \${firstName}, a \${profession.toLowerCase()} who specialises in building meaningful business relationships. \${firstName} is passionate about creating value through strategic partnerships and would be a great connection for your network.`;
  };

  const generateConnectionTypes = () => {
    return [
      'Strategic business partners',
      'Industry professionals',
      'Potential collaborators',
      'Mentors and advisors',
      'Like-minded entrepreneurs'
    ];
  };

  const generateNetworkDescription = () => {
    return 'A diverse network of professionals focused on growth, collaboration, and creating positive business impact';
  };

  const generateBestIntroMethod = () => {
    return 'Email introduction with brief context about the connection opportunity and mutual benefits';
  };

  const generateCollaborationStyle = () => {
    return 'Collaborative, relationship-focused, and results-oriented with emphasis on mutual value creation';
  };

  const generateAvailability = () => {
    return {
      timezone: 'GMT',
      preferredTimes: 'Weekdays 9am-5pm',
      responseTime: 'Within 24 hours',
      meetingPreference: 'Virtual or in-person by arrangement'
    };
  };

  const generateWebsiteFromBusiness = () => {
    const orgName = conversationData.organisation.organisationName || '';
    return orgName ? `www.\${orgName.toLowerCase().replace(/\s+/g, '')}.co.uk` : '';
  };

   const calculateCompletionLevel = () => {
    let totalSections = 8;
    let completedSections = 0;
    
    // Based on conversation data completeness
    if (conversationData.individual.firstName) completedSections++;
    if (conversationData.individual.profession) completedSections++;
    if (conversationData.individual.email) completedSections++;
    if (conversationData.individual.interests?.length > 0) completedSections++;
    if (conversationData.individual.goals?.length > 0) completedSections++;
    if (conversationData.organisation.hasOrganisation) completedSections++;
    
    return Math.round((completedSections / totalSections) * 100);
  };

  const generateFeatures = () => {
    const baseFeatures = [
      'AI-Generated ME Profile (Ready to Launch)',
      'Professional Bio & Tagline Creation',
      'Contact Management & vCard Generation',
      'Social Media Integration Wall',
      'Custom Call-to-Action Setup',
      'Community Networking Tools',
      'Analytics Dashboard',
      'QR Code & NFC Sharing',
      'Priority Support'
    ];

    if (conversationData.organisation.hasOrganisation) {
      baseFeatures.push(
        'Company Profile Management',
        'Business Directory Listing',
        'Team Overview & Structure',
        'Service/Product Showcase',
        'Business Hours & Location Setup',
        'Client Consultation Booking'
      );
    }

    // Add premium features based on interests
    if (conversationData.individual.interests?.includes('sustainability')) {
      baseFeatures.push('Sustainability Impact Tracking');
    }

    return baseFeatures;
  };

 const generatePricing = () => {
  // Convert conversationData to format expected by PricingEngine
  const businessType = conversationData.organisation.hasOrganisation ? 'company' : 'self-employed';
  
  const organisationData = {
    industry: conversationData.individual.profession || 'Professional Services',
    teamSize: conversationData.organisation.hasOrganisation ? ['2-10 people'] : ['Just me'],
    leadGenerationNeeds: conversationData.individual.goals || [],
    personalBrandGoals: conversationData.individual.interests || [],
    networkingNeeds: ['Professional associations'],
    growthStage: 'Scaling rapidly'
  };

  // Use PricingEngine for dynamic pricing
  const pricingResult = PricingEngine.calculatePackage(businessType, organisationData);

  return {
    basePrice: pricingResult.basePrice,
    features: pricingResult.features,
    totalPrice: pricingResult.totalPrice,
    monthlyEquivalent: Math.round(pricingResult.totalPrice / 12),
    roi: pricingResult.roi,
    rewardsClub: pricingResult.rewardsClub,
    packageName: pricingResult.packageName,
    modifiers: pricingResult.features.map(f => ({
      name: f.name,
      adjustment: f.price
    }))
  };
};

  const generatePersonalizedBenefits = () => {
    const benefits = [];

    // Professional benefits
    if (conversationData.individual.profession) {
      benefits.push(`✅ Optimised for \${conversationData.individual.profession} professionals`);
      benefits.push(`✅ Industry-specific networking opportunities`);
    }

    // Goal-based benefits
    if (conversationData.individual.goals?.length > 0) {
      benefits.push(`✅ Supports your goals: \${conversationData.individual.goals.slice(0, 2).join(', ')}`);
    }

    // Business benefits
    if (conversationData.organisation.hasOrganisation) {
      benefits.push('✅ Complete business management & networking suite');
      benefits.push('✅ Client acquisition & consultation booking tools');
      benefits.push('✅ Professional business directory presence');
    }

    // Interest-based benefits
    if (conversationData.individual.interests?.length > 0) {
      benefits.push(`✅ Connected to \${conversationData.individual.interests.slice(0, 2).join(' & ')} communities`);
    }

    // Universal benefits
    benefits.push('✅ AI-generated professional content (saves 5+ hours)');
    benefits.push('✅ Ready-to-share QR codes & NFC integration');
    benefits.push('✅ Access to 89,000+ professional network');
    benefits.push('✅ Rewards Club with up to 75% discounts');

    return benefits;
  };

  // ✅ NEW ENHANCED VERSION:
const handleContinue = async () => {
  try {
    console.log('🚀 Launching ME Profile package...');
    
    if (!generatedPackage) {
      console.error('❌ No generated package data available');
      return;
    }
    
    // Create comprehensive package data for ME Profile creation
    const finalPackageData = {
      ...conversationData,
      generatedPackage,
      pricing: generatedPackage.pricing,
      profileDataCards: generatedPackage.profileDataCards,
      readyForMEProfile: true,
      
      // Enhanced metadata for AWS integration
      finalizedAt: new Date().toISOString(),
      status: 'ready_for_launch',
      tier: generatedPackage.name || 'Professional Package',
      features: generatedPackage.features || [],
      completionLevel: generatedPackage.completionLevel || 95,
      
      // ME Profile URL preparation
      profileSlug: `${conversationData.individual.firstName?.toLowerCase() || 'user'}-${conversationData.individual.lastName?.toLowerCase() || 'profile'}`.replace(/[^a-z0-9-]/g, ''),
      
      // Session management
      packageBuilderComplete: true,
      nextStep: 'registration'
    };
    
    console.log('✅ Package data prepared:', {
      profileDataCards: Object.keys(finalPackageData.profileDataCards || {}),
      completionLevel: finalPackageData.completionLevel,
      profileSlug: finalPackageData.profileSlug
    });
    
    // Call parent completion handler to move to registration
    if (onComplete) {
      onComplete(finalPackageData);
    } else {
      console.warn('⚠️ No onComplete handler available - check parent component');
    }
    
  } catch (error) {
    console.error('❌ Error in package launch:', error);
    
    // Don't block user - continue with basic data
    console.log('⚠️ Continuing with fallback data...');
    if (onComplete) {
      onComplete({
        ...conversationData,
        generatedPackage,
        readyForMEProfile: true,
        status: 'ready_for_launch'
      });
    }
  }
};

  if (generating) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-tapinto-blue to-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Creating Your Perfect ME Profile Package
          </h1>
          <p className="text-gray-600 text-lg">
            AI is analysing your responses to build something truly personalised...
          </p>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="w-full h-3" />
          <p className="text-sm text-gray-500">
            {progress}% Complete
          </p>
          <p className="text-sm text-tapinto-blue font-medium">
            {currentStep}
          </p>
        </div>

        <Card className="text-left">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-tapinto-blue" />
              What we're creating for you:
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span><strong>Professional Bio:</strong> AI-crafted for {conversationData.individual.profession || 'your field'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span><strong>Contact Hub:</strong> vCard, QR codes, social integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span><strong>Networking Tools:</strong> Community connections & referrals</span>
              </div>
              {conversationData.organisation.hasOrganisation && (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span><strong>Business Suite:</strong> Company profile, services, booking system</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span><strong>Social Impact:</strong> Rewards Club & community features</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
          <Star className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Perfect! Your ME Profile Package is Ready
        </h1>
        <p className="text-xl text-gray-600">
          Tailored specifically for {conversationData.individual.firstName || 'you'} - Ready to launch in 5 minutes!
        </p>
        <div className="flex justify-center gap-4">
          <Badge className="bg-green-100 text-green-800 border-green-200">
            {generatedPackage?.completionLevel || 95}% Profile Complete
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            AI-Generated Content Ready
          </Badge>
        </div>
      </div>

      {/* Package Preview */}
      <Card className="shadow-lg border-2 border-tapinto-blue/20 bg-white">
        <CardHeader className="bg-gradient-to-r from-tapinto-blue to-blue-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-white">{generatedPackage?.name}</CardTitle>
              <p className="text-blue-100 mt-1">Complete ME Profile + {conversationData.organisation.hasOrganisation ? 'Business Suite' : 'Professional Tools'}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                £{generatedPackage?.pricing?.totalPrice || generatedPackage?.basePrice}
              </div>
              <div className="text-blue-100">one-time setup</div>
              <div className="text-sm text-blue-200">
                (£{generatedPackage?.pricing?.monthlyEquivalent || 17}/month equivalent)
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-tapinto-blue" />
                What's Included:
              </h3>
              <ul className="space-y-2">
                {generatedPackage?.features?.slice(0, 8).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
                {generatedPackage?.features?.length > 8 && (
                  <li className="text-sm text-tapinto-blue font-medium">
                    + {generatedPackage.features.length - 8} more features...
                  </li>
                )}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-tapinto-blue" />
                Why This Works for You:
              </h3>
              <ul className="space-y-2">
                {generatedPackage?.personalizedBenefits?.slice(0, 6).map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-tapinto-blue mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {generatedPackage?.completionLevel || 95}% Match
                  </Badge>
                  <span className="text-sm text-green-700">Perfect for your needs</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Ready to launch - just review & approve your AI-generated content!
                </p>
              </div>
            </div>
          </div>

          {/* ME Profile Preview Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-tapinto-blue" />
              Your ME Profile Preview:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <User className="w-6 h-6 text-tapinto-blue mx-auto mb-1" />
                <div className="font-medium">Personal</div>
                <div className="text-xs text-gray-600">Bio & Branding</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <Phone className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="font-medium">Contact</div>
                <div className="text-xs text-gray-600">vCard Ready</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <Briefcase className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <div className="font-medium">Business</div>
                <div className="text-xs text-gray-600">Services & Hours</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <Share2 className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                <div className="font-medium">Social</div>
                <div className="text-xs text-gray-600">Platform Links</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleContinue}
          size="lg"
          className="bg-tapinto-blue hover:bg-blue-700 text-white px-8 py-3 text-lg gap-2"
        >
          Launch My ME Profile
          <ArrowRight className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={() => generatePackage()}
          variant="outline"
          size="lg"
          className="px-8 py-3 text-lg gap-2 border-tapinto-blue text-tapinto-blue hover:bg-tapinto-blue hover:text-white"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Different Package
        </Button>
        
        <Button
          onClick={onStartOver}
          variant="ghost"
          size="lg"
          className="px-8 py-3 text-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          Start Over
        </Button>
      </div>

        <div className="text-center text-sm text-gray-500 space-y-2">
        <p>🚀 Launch in 5 minutes • AI-generated content ready • 30-day money-back guarantee</p>
        <p className="text-xs">No setup fees • Cancel anytime • Access to 89,000+ professional network</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <Badge variant="outline" className="text-green-600 border-green-200">
            ✅ Ready to Launch
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            🤖 AI-Powered
          </Badge>
          <Badge variant="outline" className="text-purple-600 border-purple-200">
            🎯 {generatedPackage?.completionLevel || 95}% Complete
          </Badge>
        </div>
      </div>
    </div>
  );
}
