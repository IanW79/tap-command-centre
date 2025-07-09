import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, User, Mail, Phone, MapPin } from 'lucide-react';

interface RegistrationFlowProps {
  packageData: any;
  sessionId: string;
  onComplete: (userData: any) => void;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({
  packageData,
  sessionId,
  onComplete
}) => {
  const { user, signUp, signIn } = useAuth();
  const [currentStep, setCurrentStep] = useState<'auth' | 'details' | 'confirmation'>('auth');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data
  const [authData, setAuthData] = useState({
    email: packageData.individual?.email || '',
    password: '',
    confirmPassword: ''
  });

  const [userDetails, setUserDetails] = useState({
    firstName: packageData.individual?.firstName || '',
    lastName: packageData.individual?.lastName || '',
    phone: packageData.individual?.phone || '',
    location: packageData.individual?.location || '',
    companyName: packageData.business?.companyName || '',
    jobTitle: packageData.business?.jobTitle || ''
  });

  // Handle authentication (sign up or sign in)
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (authData.password !== authData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Try to sign up new user
      const result = await signUp(authData.email, authData.password);
      
      if (result.success) {
        console.log('✅ User registration successful');
        setCurrentStep('details');
      } else {
        throw new Error(result.error || 'Registration failed');
      }

    } catch (err: any) {
      console.error('❌ Authentication error:', err);
      
      // If user already exists, try to sign in
      if (err.message?.includes('already exists') || err.message?.includes('already registered')) {
        try {
          const signInResult = await signIn(authData.email, authData.password);
          if (signInResult.success) {
            console.log('✅ User sign in successful');
            setCurrentStep('details');
          } else {
            setError('Account exists but password is incorrect. Please check your password.');
          }
        } catch (signInErr) {
          setError('Account exists but sign in failed. Please check your credentials.');
        }
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user details completion
  const handleDetailsComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!userDetails.firstName || !userDetails.lastName) {
        throw new Error('First name and last name are required');
      }

      console.log('✅ User details completed');
      setCurrentStep('confirmation');

    } catch (err: any) {
      setError(err.message || 'Please complete all required fields');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle final confirmation and ME Profile creation
  const handleFinalConfirmation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const completeUserData = {
        userId: user?.id,
        email: authData.email,
        ...userDetails,
        packageData,
        sessionId,
        registrationComplete: true,
        createdAt: new Date().toISOString()
      };

      console.log('🚀 Completing registration with full user data...');
      await onComplete(completeUserData);

    } catch (err: any) {
      console.error('❌ Final confirmation error:', err);
      setError(err.message || 'Failed to complete registration');
      setIsLoading(false);
    }
  };

  // Authentication Step
  if (currentStep === 'auth') {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <p className="text-gray-600">
              Almost there! Create your account to get your personalised ME Profile
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={authData.email}
                  onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  value={authData.password}
                  onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a secure password"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  value={authData.confirmPassword}
                  onChange={(e) => setAuthData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-tapinto-blue hover:bg-tapinto-blue/90"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account & Continue'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User Details Step
  if (currentStep === 'details') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <p className="text-gray-600">
              Help us personalise your ME Profile with these details
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDetailsComplete} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 inline mr-1" />
                    First Name *
                  </label>
                  <Input
                    value={userDetails.firstName}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Your first name"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 inline mr-1" />
                    Last Name *
                  </label>
                  <Input
                    value={userDetails.lastName}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Your last name"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <Input
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Your phone number"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <Input
                    value={userDetails.location}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Your location"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <Input
                    value={userDetails.companyName}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Your company name"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <Input
                    value={userDetails.jobTitle}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, jobTitle: e.target.value }))}
                    placeholder="Your job title"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-tapinto-blue hover:bg-tapinto-blue/90"
                disabled={isLoading}
              >
                {isLoading ? 'Saving Details...' : 'Continue to Confirmation'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Confirmation Step
  if (currentStep === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Ready to Create Your ME Profile!</CardTitle>
            <p className="text-gray-600">
              Your personalised package is ready. We'll create your ME Profile and get you started.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Package Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Your Package Summary</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div>📦 <strong>Package:</strong> {packageData.generatedPackage?.name || 'Professional Package'}</div>
                <div>👤 <strong>Profile:</strong> {userDetails.firstName} {userDetails.lastName}</div>
                <div>🏢 <strong>Company:</strong> {userDetails.companyName || 'Individual'}</div>
                <div>📧 <strong>Email:</strong> {authData.email}</div>
                <div>🌐 <strong>Profile URL:</strong> tapinto.me/{userDetails.firstName?.toLowerCase()}-{userDetails.lastName?.toLowerCase()}</div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">What You'll Get</h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                <div>✅ Personalised ME Profile</div>
                <div>✅ AI-Generated Content</div>
                <div>✅ Professional Dashboard</div>
                <div>✅ Rewards Club Access</div>
                <div>✅ Community Features</div>
                <div>✅ NFC/QR Sharing</div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('details')}
                disabled={isLoading}
                className="flex-1"
              >
                Back to Edit Details
              </Button>
              
              <Button 
                onClick={handleFinalConfirmation}
                className="flex-1 bg-tapinto-blue hover:bg-tapinto-blue/90"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Your Profile...' : 'Create My ME Profile'}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};
