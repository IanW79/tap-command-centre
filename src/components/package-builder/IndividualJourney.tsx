
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndividualData } from '@/pages/Index';
import { 
  Users, 
  TrendingUp, 
  User, 
  Lightbulb, 
  Palette, 
  Heart, 
  GraduationCap,
  MapPin
} from 'lucide-react';

interface IndividualJourneyProps {
  data: IndividualData;
  onUpdate: (updates: Partial<IndividualData>) => void;
  onNext: () => void;
}

const interestCategories = [
  {
    id: 'community-social-impact',
    label: 'Community & Social Impact',
    icon: Users,
    description: 'Making a difference in your community'
  },
  {
    id: 'business-growth-networking',
    label: 'Business Growth & Networking',
    icon: TrendingUp,
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
    icon: Lightbulb,
    description: 'Staying ahead with tech and new ideas'
  },
  {
    id: 'creative-arts',
    label: 'Creative & Arts',
    icon: Palette,
    description: 'Creative expression and artistic pursuits'
  },
  {
    id: 'health-wellness',
    label: 'Health & Wellness',
    icon: Heart,
    description: 'Physical and mental wellbeing'
  },
  {
    id: 'education-learning',
    label: 'Education & Learning',
    icon: GraduationCap,
    description: 'Continuous learning and knowledge sharing'
  }
];

const goalOptions = [
  'Build a stronger professional network',
  'Grow my business or career',
  'Make a positive impact in my community',
  'Learn new skills and knowledge',
  'Save money on everyday purchases',
  'Connect with like-minded people',
  'Support local businesses and causes',
  'Improve work-life balance',
  'Access exclusive opportunities',
  'Generate additional income'
];

const challengeOptions = [
  'Finding time to network effectively',
  'Discovering relevant local businesses',
  'Managing multiple social profiles',
  'Staying updated with industry trends',
  'Balancing personal and professional goals',
  'Finding trustworthy service providers',
  'Connecting with the right people',
  'Accessing professional development',
  'Managing business expenses',
  'Building brand awareness'
];

export const IndividualJourney: React.FC<IndividualJourneyProps> = ({
  data,
  onUpdate,
  onNext
}) => {
  const [currentSection, setCurrentSection] = useState(0);

  const handleInterestToggle = (interestId: string) => {
    const currentInterests = data.interests || [];
    const updatedInterests = currentInterests.includes(interestId)
      ? currentInterests.filter(id => id !== interestId)
      : [...currentInterests, interestId];
    
    onUpdate({ interests: updatedInterests });
  };

  const handleGoalToggle = (goal: string) => {
    const currentGoals = data.goals || [];
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    
    onUpdate({ goals: updatedGoals });
  };

  const handleChallengeToggle = (challenge: string) => {
    const currentChallenges = data.challenges || [];
    const updatedChallenges = currentChallenges.includes(challenge)
      ? currentChallenges.filter(c => c !== challenge)
      : [...currentChallenges, challenge];
    
    onUpdate({ challenges: updatedChallenges });
  };

  const canProceedToNext = () => {
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
      onNext();
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
      case 0: return "Tell us a bit about yourself so we can personalize your experience";
      case 1: return "Select the areas that spark your interest - this helps us understand what matters to you";
      case 2: return "What would you like to achieve? Choose all that resonate with you";
      case 3: return "Understanding your challenges helps us create solutions that actually work for you";
      default: return "";
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
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
                    step <= currentSection ? 'bg-tapinto-blue' : 'bg-slate-200'
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
                  <Label htmlFor="firstName" className="text-lg font-medium mb-2 block">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={data.firstName}
                    onChange={(e) => onUpdate({ firstName: e.target.value })}
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
                    value={data.lastName}
                    onChange={(e) => onUpdate({ lastName: e.target.value })}
                    placeholder="Your last name"
                    className="text-lg py-3"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-lg font-medium mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => onUpdate({ email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="text-lg py-3"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-lg font-medium mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => onUpdate({ phone: e.target.value })}
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
                    value={data.location}
                    onChange={(e) => onUpdate({ location: e.target.value })}
                    placeholder="City, Country"
                    className="text-lg py-3"
                  />
                </div>
                <div>
                  <Label htmlFor="profession" className="text-lg font-medium mb-2 block">
                    Profession/Role
                  </Label>
                  <Input
                    id="profession"
                    value={data.profession}
                    onChange={(e) => onUpdate({ profession: e.target.value })}
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
              {interestCategories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = (data.interests || []).includes(category.id);
                
                return (
                  <div
                    key={category.id}
                    className={`
                      p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                      ${isSelected 
                        ? 'border-tapinto-blue bg-blue-50' 
                        : 'border-slate-200 hover:border-tapinto-blue'
                      }
                    `}
                    onClick={() => handleInterestToggle(category.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`
                        w-12 h-12 rounded-lg flex items-center justify-center
                        ${isSelected ? 'bg-tapinto-blue text-white' : 'bg-slate-100 text-slate-600'}
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
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
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
              {goalOptions.map((goal) => {
                const isSelected = (data.goals || []).includes(goal);
                
                return (
                  <div
                    key={goal}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center gap-3
                      ${isSelected 
                        ? 'border-tapinto-blue bg-blue-50' 
                        : 'border-slate-200 hover:border-tapinto-blue hover:bg-slate-50'
                      }
                    `}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    <Checkbox
                      checked={isSelected}
                      className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
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
              {challengeOptions.map((challenge) => {
                const isSelected = (data.challenges || []).includes(challenge);
                
                return (
                  <div
                    key={challenge}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center gap-3
                      ${isSelected 
                        ? 'border-tapinto-blue bg-blue-50' 
                        : 'border-slate-200 hover:border-tapinto-blue hover:bg-slate-50'
                      }
                    `}
                    onClick={() => handleChallengeToggle(challenge)}
                  >
                    <Checkbox
                      checked={isSelected}
                      className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
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
              Previous
            </Button>
            
            <Button
              onClick={nextSection}
              disabled={!canProceedToNext()}
              className="px-6 py-3 bg-tapinto-blue hover:bg-tapinto-blue/90"
            >
              {currentSection === 3 ? 'Continue' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
