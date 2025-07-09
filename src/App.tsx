import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';

// Only import pages that definitely exist
import Index from '@/pages/Index';
import MEProfile from '@/pages/MEProfile';
import TAPCommand from '@/pages/TAPCommand';

// DataBridge Component
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

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tapinto-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Main App Routes Component - MOVED INSIDE AuthProvider
const AppRoutes: React.FC = () => {
  return (
    <>
      <DataBridge />
      
      <Routes>
        <Route path="/" element={<Index />} />
        
        <Route 
          path="/me-profile" 
          element={
            <ProtectedRoute>
              <MEProfile />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/tap-command" 
          element={
            <ProtectedRoute>
              <TAPCommand />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <div className="App min-h-screen bg-gray-50">
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
