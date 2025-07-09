import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Users, Target, Zap, ArrowRight } from 'lucide-react';

interface LandingInterfaceProps {
  onStartJourney: () => void;
  isLoading?: boolean;
}

export const LandingInterface: React.FC<LandingInterfaceProps> = ({
  onStartJourney,
  isLoading = false
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleStartJourney = () => {
    try {
      console.log('🚀 Start Your Journey button clicked');
      setButtonClicked(true);
      onStartJourney();
    } catch (error) {
      console.error('❌ Error starting journey:', error);
      setButtonClicked(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-tapinto-blue/10 p-4 rounded-full">
              <Sparkles className="w-12 h-12 text-tapinto-blue" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect
            <span className="text-tapinto-blue block">ME Profile</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our AI-powered Package Builder creates a personalised networking solution 
            tailored specifically for you. Get your professional ME Profile in minutes.
          </p>

          {/* Main CTA Button */}
          <div className="mb-12">
            <Button
              onClick={handleStartJourney}
              disabled={isLoading || buttonClicked}
              size="lg"
              className="bg-tapinto-blue hover:bg-tapinto-blue/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {isLoading || buttonClicked ? (
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
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 mb-12">
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
              <div className="text-3xl font-bold text-tapinto-blue">89,565+</div>
              <div className="text-sm text-gray-600">Waitlist Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-tapinto-blue">800+</div>
              <div className="text-sm text-gray-600">Active Businesses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-tapinto-blue">75%</div>
              <div className="text-sm text-gray-600">Max Discounts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-tapinto-blue">2 min</div>
              <div className="text-sm text-gray-600">Setup Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Info (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-xs max-w-xs z-50">
          <div className="font-semibold text-gray-900 mb-2">Landing Debug</div>
          <div className="space-y-1 text-gray-600">
            <div>Button Clicked: {buttonClicked ? '✅' : '❌'}</div>
            <div>Loading: {isLoading ? '🔄' : '⏸️'}</div>
            <div>Handler: {onStartJourney ? '✅' : '❌'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingInterface;
