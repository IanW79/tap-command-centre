import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function DataBridge() {
  const { user } = useAuth();

  const populateProfileFromPackage = async () => {
    if (!user) return;

    try {
      console.log('🔄 DataBridge: Starting profile population for user:', user.id);
      
      // Get Package Builder data
      const packageDataStr = localStorage.getItem('packageBuilderData');
      if (!packageDataStr) {
        console.log('📦 No package data found for profile population');
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
          description: packageData.business?.description || packageData.description || '',
          values: packageData.business?.values || packageData.values || '',
          website: packageData.business?.website || packageData.website || '',
          address: packageData.business?.address || packageData.address || '',
          fromPackage: true
        },

        // Contact Information
        contactInformation: {
          email: user.email,
          phone: packageData.individual?.phone || packageData.phone || '',
          location: packageData.individual?.location || packageData.location || '',
          fromPackage: true
        },

        // Package Info
        packageInfo: {
          tier: packageData.tier || 'Professional',
          features: packageData.features || [],
          pricing: packageData.pricing || { monthly: 199 }
        }
      };

      // Save to multiple locations for reliability
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData));
      localStorage.setItem(`profile_${user.id}_from_package`, 'true');
      localStorage.setItem('currentUserProfile', JSON.stringify(profileData));
      
      console.log('✅ Profile data populated successfully');

      // Notify all components that profile data is ready
      window.dispatchEvent(new CustomEvent('profileDataUpdated', { 
        detail: profileData 
      }));

      // Small delay then trigger another event for any slow-loading components
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('profileDataReady', { 
          detail: profileData 
        }));
      }, 1000);

    } catch (error) {
      console.error('❌ Error in DataBridge profile population:', error);
    }
  };

  useEffect(() => {
    if (user) {
      // Run immediately and after a short delay
      populateProfileFromPackage();
      setTimeout(populateProfileFromPackage, 2000);
    }
  }, [user]);

  return null; // This component doesn't render anything
}
