import { useState, useEffect, useCallback } from 'react';
import { awsAPI } from '@/integrations/aws/client';

interface SessionData {
  sessionId: string;
  currentStep: string;
  conversationData: any;
  generatedPackage: any;
  lastUpdated: string;
  email?: string;
}

interface UsePackageBuilderSessionReturn {
  sessionData: SessionData | null;
  updateSession: (data: Partial<SessionData>) => Promise<void>;
  clearSession: () => void;
  loading: boolean;
  error: string | null;
}

export const usePackageBuilderSession = (): UsePackageBuilderSessionReturn => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate or retrieve session ID
  const getSessionId = useCallback(() => {
    let sessionId = localStorage.getItem('packageBuilderSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('packageBuilderSessionId', sessionId);
    }
    return sessionId;
  }, []);

  // Load session data on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        setLoading(true);
        setError(null);

        const sessionId = getSessionId();
        
        // Try to load from localStorage first (faster)
        const localData = localStorage.getItem('packageBuilderSession');
        if (localData) {
          try {
            const parsedData = JSON.parse(localData);
            console.log('✅ Session loaded from localStorage');
            setSessionData({
              sessionId,
              ...parsedData
            });
          } catch (parseError) {
            console.warn('⚠️ Failed to parse local session data:', parseError);
            localStorage.removeItem('packageBuilderSession');
          }
        }

        // Try to load from AWS (for session recovery)
        try {
          const awsData = await awsAPI.getPackageBuilderSession(sessionId);
          if (awsData && awsData.sessionData) {
            console.log('✅ Session loaded from AWS');
            setSessionData({
              sessionId,
              ...awsData.sessionData
            });
            
            // Update localStorage with AWS data
            localStorage.setItem('packageBuilderSession', JSON.stringify(awsData.sessionData));
          }
        } catch (awsError) {
          console.log('ℹ️ No AWS session found or AWS unavailable:', awsError);
          // This is not an error - user might be starting fresh
        }

      } catch (err) {
        console.error('❌ Error loading session:', err);
        setError('Failed to load session data');
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [getSessionId]);

  // Update session data
  const updateSession = useCallback(async (updates: Partial<SessionData>) => {
    try {
      const sessionId = getSessionId();
      const updatedData = {
        ...sessionData,
        ...updates,
        sessionId,
        lastUpdated: new Date().toISOString()
      };

      // Update local state immediately
      setSessionData(updatedData);

      // Save to localStorage immediately (for fast access)
      localStorage.setItem('packageBuilderSession', JSON.stringify(updatedData));

      // Save to AWS in background (for session recovery)
      try {
        await awsAPI.updatePackageBuilderSession(sessionId, updatedData);
        console.log('✅ Session saved to AWS');
      } catch (awsError) {
        console.warn('⚠️ Failed to save session to AWS:', awsError);
        // Don't throw - localStorage save succeeded
      }

    } catch (err) {
      console.error('❌ Error updating session:', err);
      setError('Failed to update session');
    }
  }, [sessionData, getSessionId]);

  // Clear session data
  const clearSession = useCallback(() => {
    try {
      const sessionId = getSessionId();
      
      // Clear local state
      setSessionData(null);
      
      // Clear localStorage
      localStorage.removeItem('packageBuilderSession');
      localStorage.removeItem('packageBuilderSessionId');
      localStorage.removeItem('packageBuilderData');
      
      // Clear AWS session in background
      try {
        awsAPI.deletePackageBuilderSession(sessionId);
        console.log('✅ Session cleared from AWS');
      } catch (awsError) {
        console.warn('⚠️ Failed to clear AWS session:', awsError);
        // Don't throw - local clear succeeded
      }

      console.log('🧹 Package Builder session cleared');
      
    } catch (err) {
      console.error('❌ Error clearing session:', err);
    }
  }, [getSessionId]);

  return {
    sessionData,
    updateSession,
    clearSession,
    loading,
    error
  };
};
