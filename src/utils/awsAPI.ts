// AWS API Client with fallback handling
// This provides a clean interface for AWS operations with localStorage fallbacks

const API_BASE_URL = 'https://api.tapinto.me';

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class AWSAPIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log(`🔗 AWS API Request: ${options.method || 'GET'} ${url}`);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ AWS API Success:', data);
      
      return { success: true, data };
    } catch (error) {
      console.error(`AWS API Request failed for ${endpoint}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Package Builder Session Management
  async createPackageBuilderSession(sessionData: any): Promise<APIResponse> {
    const result = await this.makeRequest('/package-builder/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });

    // Fallback to localStorage if AWS fails
    if (!result.success) {
      console.log('⚠️ AWS failed, using localStorage fallback');
      try {
        localStorage.setItem(`pb_session_${sessionData.sessionId}`, JSON.stringify(sessionData));
        return { success: true, data: sessionData };
      } catch (error) {
        return { success: false, error: 'Failed to save session locally' };
      }
    }

    return result;
  }

  async updatePackageBuilderSession(sessionId: string, sessionData: any): Promise<APIResponse> {
    const result = await this.makeRequest(`/package-builder/sessions/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(sessionData),
    });

    // Fallback to localStorage if AWS fails
    if (!result.success) {
      console.log('⚠️ AWS failed, using localStorage fallback');
      try {
        localStorage.setItem(`pb_session_${sessionId}`, JSON.stringify(sessionData));
        return { success: true, data: sessionData };
      } catch (error) {
        return { success: false, error: 'Failed to update session locally' };
      }
    }

    return result;
  }

  async getPackageBuilderSession(sessionId: string): Promise<APIResponse> {
    const result = await this.makeRequest(`/package-builder/sessions/${sessionId}`);

    // Fallback to localStorage if AWS fails
    if (!result.success) {
      console.log('⚠️ AWS failed, checking localStorage fallback');
      try {
        const localData = localStorage.getItem(`pb_session_${sessionId}`);
        if (localData) {
          return { success: true, data: JSON.parse(localData) };
        }
        return { success: false, error: 'Session not found' };
      } catch (error) {
        return { success: false, error: 'Failed to retrieve session' };
      }
    }

    return result;
  }

  async deletePackageBuilderSession(sessionId: string): Promise<APIResponse> {
    const result = await this.makeRequest(`/package-builder/sessions/${sessionId}`, {
      method: 'DELETE',
    });

    // Always clean up localStorage regardless of AWS result
    try {
      localStorage.removeItem(`pb_session_${sessionId}`);
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }

    return result.success ? result : { success: true, data: null };
  }

  // ME Profile Management
  async createMEProfileFromPackage(profileData: any): Promise<APIResponse> {
    console.log('🚀 Creating ME Profile from package data:', profileData);
    
    const result = await this.makeRequest('/me-profiles', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });

    // Fallback: Store profile data locally for dashboard display
    if (!result.success) {
      console.log('⚠️ AWS failed, storing ME Profile data locally');
      try {
        const profileKey = `me_profile_${profileData.profileSlug || 'default'}`;
        localStorage.setItem(profileKey, JSON.stringify({
          ...profileData,
          createdAt: new Date().toISOString(),
          source: 'package_builder_fallback'
        }));
        
        // Also store in a general profiles list
        const existingProfiles = JSON.parse(localStorage.getItem('me_profiles_list') || '[]');
        existingProfiles.push({
          profileSlug: profileData.profileSlug,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('me_profiles_list', JSON.stringify(existingProfiles));
        
        return { 
          success: true, 
          data: { 
            profileSlug: profileData.profileSlug,
            url: `https://tapinto.me/${profileData.profileSlug}`,
            message: 'Profile created locally (AWS fallback)'
          }
        };
      } catch (error) {
        return { success: false, error: 'Failed to create profile locally' };
      }
    }

    return result;
  }

  async getMEProfile(profileSlug: string): Promise<APIResponse> {
    const result = await this.makeRequest(`/me-profiles/${profileSlug}`);

    // Fallback to localStorage
    if (!result.success) {
      try {
        const localData = localStorage.getItem(`me_profile_${profileSlug}`);
        if (localData) {
          return { success: true, data: JSON.parse(localData) };
        }
        return { success: false, error: 'Profile not found' };
      } catch (error) {
        return { success: false, error: 'Failed to retrieve profile' };
      }
    }

    return result;
  }

  // User Management (placeholder for future implementation)
  async createUser(userData: any): Promise<APIResponse> {
    console.log('🔧 createUser called (placeholder):', userData);
    return { 
      success: true, 
      data: { 
        userId: `user_${Date.now()}`,
        message: 'User creation placeholder - implement when AWS Lambda is ready'
      }
    };
  }

  async updateUser(userId: string, userData: any): Promise<APIResponse> {
    console.log('🔧 updateUser called (placeholder):', userId, userData);
    return { 
      success: true, 
      data: { 
        userId,
        message: 'User update placeholder - implement when AWS Lambda is ready'
      }
    };
  }

  // Health check
  async healthCheck(): Promise<APIResponse> {
    return await this.makeRequest('/health');
  }
}

// Export singleton instance
export const awsAPI = new AWSAPIClient();

// Export types for use in other files
export type { APIResponse };
