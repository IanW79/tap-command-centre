import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Save,
  User,
  Sparkles,
  Lightbulb,
  Target,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface BioSectionProps {
  packageData?: any;
}

export function BioSection({ packageData }: BioSectionProps) {
  const [bio, setBio] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (packageData?.individual) {
      // Generate a suggested bio based on package data
      const suggestedBio = generateSuggestedBio(packageData);
      setBio(suggestedBio);
    }
  }, [packageData]);

  const generateSuggestedBio = (data: any) => {
    const individual = data.individual;
    const organisation = data.organisation;
    
    let bio = '';
    
    // Professional background
    if (individual?.profession) {
      bio += `${individual.profession}`;
      if (organisation?.hasOrganisation && organisation?.companyName) {
        bio += ` at ${organisation.companyName}`;
      }
      bio += '. ';
    }
    
    // Location
    if (individual?.location) {
      bio += `Based in ${individual.location}. `;
    }
    
    // Interests and passions
    if (individual?.interests?.length > 0) {
      const interestsList = individual.interests.slice(0, 3).join(', ');
      bio += `Passionate about ${interestsList}. `;
    }
    
    // Goals
    if (individual?.goals?.length > 0) {
      const mainGoal = individual.goals[0].replace(/([A-Z])/g, ' $1').trim();
      bio += `Focused on ${mainGoal.toLowerCase()}. `;
    }
    
    // Business context
    if (organisation?.hasOrganisation) {
      if (organisation?.industry) {
        bio += `Working in the ${organisation.industry} industry. `;
      }
      if (organisation?.teamSize) {
        bio += `Leading a ${organisation.teamSize} team. `;
      }
    }
    
    // Call to action
    bio += "Let's connect and explore opportunities together.";
    
    return bio;
  };

  const handleBioChange = (value: string) => {
    setBio(value);
    setHasUnsavedChanges(true);
    setSaveError(''); // Clear any previous errors
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    
    try {
      // Prepare data for AWS integration
      const bioData = {
        bio: bio.trim(),
        characterCount: bio.length,
        isAIGenerated: packageData ? true : false,
        personalizedTips: getPersonalizedTips(),
        updatedAt: new Date().toISOString()
      };

      // AWS Integration - Save to your backend
      const response = await fetch('https://xd89nnm7q6.execute-api.eu-west-2.amazonaws.com/Prod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: 'bio',
          data: bioData,
          slug: 'temp-user-slug' // Replace with actual user slug
        })
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setHasUnsavedChanges(false);
        console.log('✅ Bio data saved to AWS successfully!', bioData);
      } else {
        throw new Error('Failed to save to AWS');
      }
    } catch (error) {
      console.error('❌ Error saving bio data:', error);
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerateBio = () => {
    if (packageData) {
      const newBio = generateSuggestedBio(packageData);
      setBio(newBio);
      setHasUnsavedChanges(true);
    }
  };

  const getPersonalizedTips = () => {
    const tips = [];
    
    if (packageData?.individual?.goals?.includes('networking')) {
      tips.push("Mention that you're open to networking and collaboration");
    }
    
    if (packageData?.individual?.interests?.includes('sustainability')) {
      tips.push("Highlight your commitment to sustainable practices");
    }
    
    if (packageData?.organisation?.hasOrganisation) {
      tips.push("Include your company's mission or key achievements");
    }
    
    if (packageData?.individual?.challenges?.length > 0) {
      tips.push("Consider mentioning areas where you're looking for support or partnerships");
    }
    
    return tips;
  };

  const personalizedTips = getPersonalizedTips();

  return (
    <div className="space-y-6">
      {/* Save Success Alert */}
      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Bio saved successfully! ✨
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

      {/* AI-Generated Bio Notice */}
      {packageData && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">AI-Generated Bio</h4>
                <p className="text-sm text-blue-700">
                  We've created a professional bio based on your package responses. Feel free to edit and personalise it.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateBio}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-tapinto-blue" />
              Professional Bio
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Your Professional Bio
              </label>
              <span className="text-xs text-gray-500">
                {bio.length}/500 characters
              </span>
            </div>
            <Textarea
              value={bio}
              onChange={(e) => handleBioChange(e.target.value)}
              placeholder="Tell people about yourself, your expertise, and what you're passionate about..."
              className="min-h-[120px]"
              maxLength={500}
            />
          </div>

          {/* Personalised Tips */}
          {personalizedTips.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  Personalised Bio Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {personalizedTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                      <Target className="w-3 h-3 mt-1 text-blue-600" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Bio Preview */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Preview</h3>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-800 leading-relaxed">
                {bio || "Your bio will appear here..."}
              </p>
            </div>
          </div>

          {/* Quick Bio Templates */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Quick Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto p-3 text-left"
                onClick={() => handleBioChange("Experienced professional with a passion for innovation and growth. Always looking to connect with like-minded individuals and explore new opportunities.")}
              >
                <div>
                  <div className="font-medium text-sm">Professional & Approachable</div>
                  <div className="text-xs text-gray-500">General networking focus</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-3 text-left"
                onClick={() => handleBioChange("Results-driven leader committed to making a positive impact. Expertise in building teams and driving sustainable business growth.")}
              >
                <div>
                  <div className="font-medium text-sm">Leadership Focused</div>
                  <div className="text-xs text-gray-500">For business leaders</div>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sticky Save Button */}
      {hasUnsavedChanges && (
        <div className="sticky bottom-4 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={saving}
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
                Save Bio Changes
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
