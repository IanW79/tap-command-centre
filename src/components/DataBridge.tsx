import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { awsAPI } from '@/integrations/aws/client';

interface DataBridgeProps {
  onProfilePopulated?: (success: boolean) => void;
  disabled?: boolean;
}

export const DataBridge: React.FC<DataBridgeProps> = ({ 
  onProfilePopulated,
  disabled = false 
}) => {
  const { user } = useAuth();
  const [isPopulating, setIsPopulating] = useState(false);
  const [populationComplete, setPopulationComplete] = useState(false);
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Prevent multiple runs and respect disabled state
    if (disabled || !user || hasRunRef.current || populationComplete || isPopulating) {
      return;
    }

    const populateProfileFromPackage = async () => {
      try {
        hasRunRef.current = true;
        setIsPopulating(true);
        
        console.log('🔄 DataBridge: Starting profile population for user:', user.id);

        // Get Package Builder data
        const packageDataStr = localStorage.getItem('packageBuilderData');
        if (!packageDataStr) {
          console.log('ℹ️ No package data found for profile population');
          setPopulationComplete(true);
          onProfilePopulated?.(false);
          return;
        }

        const packageData = JSON.parse(packageDataStr);
        console.log('📦 Found package data:', packageData);

        // Create comprehensive profile data structure
        const profileData = {
          userId: user.id,
          fromPackageBuilder: true,
          lastUpdated: new Date().toISOString(),

          // Bio Section
          bioSection: {
            firstName: packageData.individual?.firstName || packageData.firstName || '',
            lastName: packageData.individual?.lastName || packageData.lastName || '',
            bio: packageData.individual?.bio || packageData.bio || '',
            fromPackage: true
          },

          // Business Details
          businessDetails: {
            companyName: packageData.business?.companyName || packageData.companyName || '',
            industry: packageData.business?.industry || packageData.industry || '',
            businessType: packageData.business?.businessType || packageData.businessType || '',
            services: packageData.business?.services || packageData.services || [],
            fromPackage: true
          },

          // Contact Information
          contactInformation: {
            email: packageData.individual?.email || packageData.email || user.email || '',
            phone: packageData.individual?.phone || packageData.phone || '',
            location: packageData.individual?.location || packageData.location || '',
            fromPackage: true
          },

          // Experience Section
          experienceSection: {
            experience: packageData.profileDataCards?.experienceSection?.experience || [],
            skills: packageData.profileDataCards?.experienceSection?.skills || [],
            achievements: packageData.profileDataCards?.experienceSection?.achievements || [],
            fromPackage: true
          },

          // Call to Action
          callToAction: {
            primaryCTA: packageData.profileDataCards?.callToAction?.primaryCTA || '',
            secondaryCTA: packageData.profileDataCards?.callToAction?.secondaryCTA || '',
            fromPackage: true
          },

          // Social Links
          socialLinksWall: {
            links: packageData.profileDataCards?.socialLinksWall?.links || [],
            fromPackage: true
          },

          // Community Space
          communitySpace: {
            rewardsClub: {
              tier: 'Bronze', // Default tier for new users
              status: 'Active',
              fromPackage: true
            },
            badges: packageData.profileDataCards?.communitySpace?.badges || [],
            fromPackage: true
          },

          // Package Information
          packageInfo: {
            tier: packageData.generatedPackage?.name || packageData.tier || 'Professional Package',
            features: packageData.generatedPackage?.features || packageData.features || [],
            pricing: packageData.generatedPackage?.pricing || packageData.pricing,
            completionLevel: packageData.generatedPackage?.completionLevel || packageData.completionLevel || 95
          }
        };

        // Attempt to save to AWS
        try {
          console.log('💾 Saving profile data to AWS...');
          const result = await awsAPI.updateUserProfile(user.id, profileData);
          console.log('✅ Profile data saved to AWS successfully:', result);
        } catch (awsError) {
          console.warn('⚠️ AWS save failed, storing locally:', awsError);
          
          // Fallback to localStorage
          localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profileData));
          console.log('💾 Profile data saved to localStorage as fallback');
        }

        // Store in localStorage for immediate dashboard access
        localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profileData));
        localStorage.setItem('profilePopulatedFromPackage', 'true');

        console.log('✅ Profile data populated successfully');
        setPopulationComplete(true);
        onProfilePopulated?.(true);

      } catch (error) {
        console.error('❌ Error populating profile from package:', error);
        hasRunRef.current = false; // Allow retry
        onProfilePopulated?.(false);
      } finally {
        setIsPopulating(false);
      }
    };

    // Run population with small delay to ensure user is fully loaded
    const timer = setTimeout(populateProfileFromPackage, 100);
    return () => clearTimeout(timer);

  }, [user, disabled, populationComplete, isPopulating, onProfilePopulated]);

  // Reset function for testing/development
  const resetPopulation = () => {
    hasRunRef.current = false;
    setPopulationComplete(false);
    setIsPopulating(false);
    localStorage.removeItem('profilePopulatedFromPackage');
  };

  // Don't render anything in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Development UI for debugging
  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-xs max-w-xs z-50">
      <div className="font-semibold text-gray-900 mb-2">DataBridge Status</div>
      
      <div className="space-y-1 text-gray-600">
        <div>User: {user ? '✅' : '❌'}</div>
        <div>Populating: {isPopulating ? '🔄' : '⏸️'}</div>
        <div>Complete: {populationComplete ? '✅' : '❌'}</div>
        <div>Has Run: {hasRunRef.current ? '✅' : '❌'}</div>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetPopulation}
          className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default DataBridge;
