import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

import { 
  Sparkles, 
  Users, 
  Target, 
  Zap, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Building,
  User,
  MapPin,
  Phone,
  Mail,
  Briefcase
} from 'lucide-react';

// Types
export interface IndividualData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  interests: string[];
  goals: string[];
  challenges: string[];
}

interface PackageBuilderSession {
  sessionId: string;
  email: string;
  currentStep: string;
  progress: number;
  individualData: IndividualData;
  organisationType: string;
  businessType: string;
  businessAnswers: Record<string, any>;
  generatedPackage: any;
  createdAt: string;
  updatedAt: string;
}

// Constants
const INTEREST_CATEGORIES = [
  {
    id: 'community-social-impact',
    label: 'Community & Social Impact',
    icon: Users,
    description: 'Making a difference in your community'
  },
  {
    id: 'business-growth-networking',
    label: 'Business Growth & Networking',
    icon: Target,
    description: 'Growing professionally and building connections'
  },
  {
    id: 'personal-development',
    label: 'Personal Development',
    icon: User,
    description: 'Self-improvement and skill building'
  },
  {
    id: 'technology-innovation',
    label: 'Technology & Innovation',
    icon: Zap,
    description: 'Staying ahead with tech and new ideas'
  }
];

const GOAL_OPTIONS = [
  'Build a stronger professional network',
  'Grow my business or career',
  'Make a positive impact in my community',
  'Learn new skills and knowledge',
  'Save money on everyday purchases',
  'Connect with like-minded people',
  'Support local businesses and causes',
  'Access exclusive opportunities'
];

const CHALLENGE_OPTIONS = [
  'Finding time to network effectively',
  'Discovering relevant local businesses',
  'Managing multiple social profiles',
  'Staying updated with industry trends',
  'Connecting with the right people',
  'Finding trustworthy service providers',
  'Building brand awareness',
  'Managing business expenses'
];

// Main Component
const PackageBuilder: React.FC = () => {
  // State Management
  const [currentStep, setCurrentStep] = useState<string>('landing');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [sessionData, setSessionData] = useState<PackageBuilderSession>({
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: '',
    currentStep: 'landing',
    progress: 0,
    individualData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      profession: '',
      interests: [],
      goals: [],
      challenges: []
    },
    organisationType: '',
    businessType: '',
    businessAnswers: {},
    generatedPackage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  // Session Management
  const updateSession = (updates: Partial<PackageBuilderSession>) => {
    setSessionData(prev => {
      const updated = {
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage as fallback
      try {
        localStorage.setItem(`pb_session_${updated.sessionId}`, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save session to localStorage:', error);
      }
      
      return updated;
    });
  };

  // Progress Calculation
  const calculateProgress = (step: string): number => {
    const stepProgress = {
      'landing': 0,
      'individual': 25,
      'organisation': 50,
      'business-type': 60,
      'business-questions': 75,
      'package-generation': 85,
      'registration': 95,
      'complete': 100
    };
    return stepProgress[step] || 0;
  };

  // Step Navigation
  const goToStep = (step: string) => {
    setCurrentStep(step);
    updateSession({ 
      currentStep: step, 
      progress: calculateProgress(step) 
    });
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600/10 p-4 rounded-full">
              <Sparkles className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect
            <span className="text-blue-600 block">ME Profile</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our AI-powered Package Builder creates a personalised networking solution 
            tailored specifically for you. Get your professional ME Profile in minutes.
          </p>

          <Button
            onClick={() => goToStep('individual')}
            disabled={loading}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Starting Your Journey...
              </>
            ) : (
              <>
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 mt-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              89,565+ on waitlist
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              AI-Powered
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              2 minutes setup
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Personalised Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                AI creates a custom package based on your specific needs, industry, and goals.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Professional Networking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with 800+ businesses and join our thriving professional community.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Instant Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get your tapinto.me/your-name profile live in minutes with AI-generated content.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join the Revolution
          </h3>
          <p className="text-gray-600 mb-6">
            Be part of the future of professional networking with TAPinto's AI-powered platform.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">89,565+</div>
              <div className="text-sm text-gray-600">Waitlist Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">800+</div>
              <div className="text-sm text-gray-600">Active Businesses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">75%</div>
              <div className="text-sm text-gray-600">Max Discounts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">2 min</div>
              <div className="text-sm text-gray-600">Setup Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Individual Journey Component
  const IndividualJourney = () => {
    const [currentSection, setCurrentSection] = useState(0);
    
    const updateIndividualData = (updates: Partial<IndividualData>) => {
      updateSession({
        individualData: {
          ...sessionData.individualData,
          ...updates
        }
      });
    };

    const handleInterestToggle = (interestId: string) => {
      const currentInterests = sessionData.individualData.interests || [];
      const updatedInterests = currentInterests.includes(interestId)
        ? currentInterests.filter(id => id !== interestId)
        : [...currentInterests, interestId];
      
      updateIndividualData({ interests: updatedInterests });
    };

    const handleGoalToggle = (goal: string) => {
      const currentGoals = sessionData.individualData.goals || [];
      const updatedGoals = currentGoals.includes(goal)
        ? currentGoals.filter(g => g !== goal)
        : [...currentGoals, goal];
      
      updateIndividualData({ goals: updatedGoals });
    };

    const handleChallengeToggle = (challenge: string) => {
      const currentChallenges = sessionData.individualData.challenges || [];
      const updatedChallenges = currentChallenges.includes(challenge)
        ? currentChallenges.filter(c => c !== challenge)
        : [...currentChallenges, challenge];
      
      updateIndividualData({ challenges: updatedChallenges });
    };

    const canProceedToNext = () => {
      const data = sessionData.individualData;
      switch (currentSection) {
        case 0:
          return data.firstName && data.lastName && data.email && data.phone && data.location && data.profession;
        case 1:
          return (data.interests || []).length > 0;
        case 2:
          return (data.goals || []).length > 0;
        case 3:
          return (data.challenges || []).length > 0;
        default:
          return false;
      }
    };

    const nextSection = () => {
      if (currentSection < 3) {
        setCurrentSection(prev => prev + 1);
      } else {
        goToStep('organisation');
      }
    };

    const prevSection = () => {
      if (currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    };

    const getSectionTitle = () => {
      switch (currentSection) {
        case 0: return "Let's get to know you";
        case 1: return "What interests you most?";
        case 2: return "What are your goals?";
        case 3: return "What challenges do you face?";
        default: return "";
      }
    };

    const getSectionDescription = () => {
      switch (currentSection) {
        case 0: return "Tell us a bit about yourself so we can personalise your experience";
        case 1: return "Select the areas that spark your interest - this helps us understand what matters to you";
        case 2: return "What would you like to achieve? Choose all that resonate with you";
        case 3: return "Understanding your challenges helps us create solutions that actually work for you";
        default: return "";
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{Math.round(((currentSection + 1) / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentSection + 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              {getSectionTitle()}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {getSectionDescription()}
            </p>
          </div>

          <Card className="shadow-lg border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">
                  Step {currentSection + 1} of 4
                </CardTitle>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        step <= currentSection ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Personal Information Section */}
              {currentSection === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-lg font-medium mb-2 block flex items-center gap-2">
                        <User className="w-4 h-4" />
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={sessionData.individualData.firstName}
                        onChange={(e) => updateIndividualData({ firstName: e.target.value })}
                        placeholder="Your first name"
                        className="text-lg py-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-lg font-medium mb-2 block">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={sessionData.individualData.lastName}
                        onChange={(e) => updateIndividualData({ lastName: e.target.value })}
                        placeholder="Your last name"
                        className="text-lg py-3"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-lg font-medium mb-2 block flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={sessionData.individualData.email}
                        onChange={(e) => updateIndividualData({ email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="text-lg py-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-lg font-medium mb-2 block flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={sessionData.individualData.phone}
                        onChange={(e) => updateIndividualData({ phone: e.target.value })}
                        placeholder="Your phone number"
                        className="text-lg py-3"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="location" className="text-lg font-medium mb-2 block flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={sessionData.individualData.location}
                        onChange={(e) => updateIndividualData({ location: e.target.value })}
                        placeholder="City, Country"
                        className="text-lg py-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="profession" className="text-lg font-medium mb-2 block flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Profession/Role
                      </Label>
                      <Input
                        id="profession"
                        value={sessionData.individualData.profession}
                        onChange={(e) => updateIndividualData({ profession: e.target.value })}
                        placeholder="What do you do?"
                        className="text-lg py-3"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Interests Section */}
              {currentSection === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {INTEREST_CATEGORIES.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = (sessionData.individualData.interests || []).includes(category.id);
                    
                    return (
                      <div
                        key={category.id}
                        className={`
                          p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                          ${isSelected 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-slate-200 hover:border-blue-600'
                          }
                        `}
                        onClick={() => handleInterestToggle(category.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`
                            w-12 h-12 rounded-lg flex items-center justify-center
                            ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}
                          `}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 mb-1">
                              {category.label}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {category.description}
                            </p>
                          </div>
                          <Checkbox
                            checked={isSelected}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Goals Section */}
              {currentSection === 2 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {GOAL_OPTIONS.map((goal) => {
                    const isSelected = (sessionData.individualData.goals || []).includes(goal);
                    
                    return (
                      <div
                        key={goal}
                        className={`
                          p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center gap-3
                          ${isSelected 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-slate-200 hover:border-blue-600 hover:bg-slate-50'
                          }
                        `}
                        onClick={() => handleGoalToggle(goal)}
                      >
                        <Checkbox
                          checked={isSelected}
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="font-medium text-slate-700">{goal}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Challenges Section */}
              {currentSection === 3 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {CHALLENGE_OPTIONS.map((challenge) => {
                    const isSelected = (sessionData.individualData.challenges || []).includes(challenge);
                    
                    return (
                      <div
                        key={challenge}
                        className={`
                          p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center gap-3
                          ${isSelected 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-slate-200 hover:border-blue-600 hover:bg-slate-50'
                          }
                        `}
                        onClick={() => handleChallengeToggle(challenge)}
                      >
                        <Checkbox
                          checked={isSelected}
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="font-medium text-slate-700">{challenge}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="px-6 py-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={nextSection}
                  disabled={!canProceedToNext()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700"
                >
                  {currentSection === 3 ? 'Continue' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Organisation Selection Component
  const OrganisationSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Are you representing an organisation?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            This helps us create the perfect package for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-600"
            onClick={() => {
              updateSession({ organisationType: 'individual' });
              goToStep('package-generation');
            }}
          >
            <CardContent className="p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Just for me</h3>
              <p className="text-slate-600">
                I'm looking for personal networking and opportunities
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-600"
            onClick={() => {
              updateSession({ organisationType: 'business' });
              goToStep('business-type');
            }}
          >
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For my business</h3>
              <p className="text-slate-600">
                I represent a business or organisation
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => goToStep('individual')}
            className="px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Previous
          </Button>
        </div>
      </div>
    </div>
  );

  // Package Generation Component
  const PackageGeneration = () => {
    const [generating, setGenerating] = useState(false);
    const [generatedPackage, setGeneratedPackage] = useState(null);

    const generatePackage = async () => {
      setGenerating(true);
      
      // Simulate AI package generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockPackage = {
        packageName: `${sessionData.individualData.firstName}'s Professional Package`,
        tier: 'Gold',
        features: [
          'Premium ME Profile (tapinto.me/' + sessionData.individualData.firstName.toLowerCase() + '-' + sessionData.individualData.lastName.toLowerCase() + ')',
          'Access to 800+ business directory',
          'Gold Rewards Club (50% discounts)',
          'Community networking access',
          'Professional development resources'
        ],
        monthlyValue: '£69.99',
        setupTime: '2 minutes',
        roi: 'Save £500+ annually'
      };
      
      setGeneratedPackage(mockPackage);
      updateSession({ generatedPackage: mockPackage });
      setGenerating(false);
    };

    useEffect(() => {
      if (!generatedPackage) {
        generatePackage();
      }
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              {generating ? 'Creating Your Perfect Package...' : 'Your Personalised Package is Ready!'}
            </h1>
            <p className="text-lg text-slate-600">
              {generating ? 'Our AI is analysing your responses to create the perfect solution' : 'Based on your responses, here\'s what we recommend'}
            </p>
          </div>

          {generating ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">AI Processing...</h3>
                <p className="text-slate-600">
                  Analysing your interests, goals, and challenges to create your perfect package
                </p>
              </CardContent>
            </Card>
          ) : generatedPackage ? (
            <Card className="max-w-2xl mx-auto shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">
                  🎉 {generatedPackage.packageName}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-lg">
                    {generatedPackage.tier} Package
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {generatedPackage.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{generatedPackage.monthlyValue}</div>
                    <div className="text-sm text-slate-600">Monthly Value</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{generatedPackage.setupTime}</div>
                    <div className="text-sm text-slate-600">Setup Time</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{generatedPackage.roi}</div>
                    <div className="text-sm text-slate-600">Annual Savings</div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <Button
                    onClick={() => goToStep('registration')}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full w-full"
                  >
                    Continue to Sign Up to Package
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => goToStep('individual')}
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Modify My Responses
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    );
  };

  // Registration Component
  const Registration = () => {
    const [registrationData, setRegistrationData] = useState({
      email: sessionData.individualData.email || '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
    const [registering, setRegistering] = useState(false);

    const handleRegistration = async () => {
      if (registrationData.password !== registrationData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (!registrationData.agreeToTerms) {
        setError('Please agree to the terms and conditions');
        return;
      }

      setRegistering(true);
      setError('');

      try {
        // Simulate registration process
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create ME Profile from package data
        const meProfileData = {
          slug: `${sessionData.individualData.firstName.toLowerCase()}-${sessionData.individualData.lastName.toLowerCase()}`,
          personalInfo: {
            firstName: sessionData.individualData.firstName,
            lastName: sessionData.individualData.lastName,
            profession: sessionData.individualData.profession,
            location: sessionData.individualData.location,
            bio: `Professional ${sessionData.individualData.profession} based in ${sessionData.individualData.location}. Passionate about ${sessionData.individualData.interests.slice(0, 2).join(' and ')}.`
          },
          contactInfo: {
            email: sessionData.individualData.email,
            phone: sessionData.individualData.phone
          },
          businessDetails: {
            industry: sessionData.individualData.profession,
            services: sessionData.individualData.goals.slice(0, 3)
          },
          packageIntegration: {
            fromPackage: true,
            packageType: sessionData.generatedPackage?.tier || 'Gold',
            interests: sessionData.individualData.interests,
            goals: sessionData.individualData.goals,
            challenges: sessionData.individualData.challenges
          },
          metadata: {
            createdAt: new Date().toISOString(),
            source: 'AI Package Builder',
            sessionId: sessionData.sessionId
          }
        };

        console.log('🚀 Creating ME Profile from package data:', meProfileData);

        // Clear session data
        localStorage.removeItem(`pb_session_${sessionData.sessionId}`);

        // ✅ REPLACE WITH THIS:
        console.log('✅ Registration complete, profile created successfully');
        alert('🎉 Success! Your ME Profile has been created. You can now access your personalised networking platform.');
        // Stay on current page instead of redirecting
        setRegistering(false);

      } catch (error) {
        console.error('❌ Registration error:', error);
        setError('Registration failed. Please try again.');
        setRegistering(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Create Your Account
            </h1>
            <p className="text-lg text-slate-600">
              You're just one step away from your personalised ME Profile
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-lg font-medium mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="text-lg py-3"
                    disabled={registering}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-lg font-medium mb-2 block">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={registrationData.password}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a secure password"
                    className="text-lg py-3"
                    disabled={registering}
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-lg font-medium mb-2 block">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={registrationData.confirmPassword}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm your password"
                    className="text-lg py-3"
                    disabled={registering}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={registrationData.agreeToTerms}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                    disabled={registering}
                    className="mt-1"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-slate-600 leading-relaxed">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:underline" target="_blank">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline" target="_blank">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                <Button
                  onClick={handleRegistration}
                  disabled={registering || !registrationData.email || !registrationData.password || !registrationData.confirmPassword || !registrationData.agreeToTerms}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
                >
                  {registering ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Your Account...
                    </>
                  ) : (
                    <>
                      Create Account & Get My Profile
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => goToStep('package-generation')}
                    disabled={registering}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Package
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Main Render Logic
  const renderCurrentStep = () => {
    console.log('🔍 Current step:', currentStep);
    
    switch (currentStep) {
      case 'individual':
        return <IndividualJourney />;
      case 'organisation':
        return <OrganisationSelection />;
      case 'package-generation':
        return <PackageGeneration />;
      case 'registration':
        return <Registration />;
      case 'landing':
      default:
        return <LandingPage />;
    }
  };

  // Main return statement
  return (
    <div>
      {renderCurrentStep()}
    </div>
  );
};

export default PackageBuilder; 