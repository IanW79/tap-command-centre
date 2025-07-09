
import { useState, useEffect } from 'react';
import { FuelCalculator } from '@/components/gamification/FuelCalculator';
import { useNetworking } from '@/hooks/useNetworking';
import { useAffiliate } from '@/hooks/useAffiliate';

interface UseFuelSystemReturn {
  fuelData: {
    currentFuel: number;
    profileCompletion: number;
    activityFuel: number;
    nextMilestone: number;
    daysUntilDecay: number;
    recentActivity: string[];
    achievements: string[];
  };
  updateProfileData: (data: any) => void;
  updateActivityData: (data: any) => void;
  addAchievement: (achievement: string) => void;
}

export function useFuelSystem(): UseFuelSystemReturn {
  const { networkingData } = useNetworking();
  const { analytics: affiliateAnalytics } = useAffiliate();
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    profession: '',
    profileImageUrl: '',
    socialLinks: [],
    companyName: '',
    website: '',
    experience: []
  });

  const [activityData, setActivityData] = useState({
    weeklyLogins: 0,
    dailyStreak: 0,
    networkConnections: 0,
    referrals: 0,
    profileViews: 0,
    communityEngagement: 0,
    eventAttendance: 0,
    packageUpgrades: 0
  });

  const [achievements, setAchievements] = useState<string[]>([]);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [currentDecay, setCurrentDecay] = useState(0);

  // Update activity data with networking data
  useEffect(() => {
    if (networkingData.analytics) {
      setActivityData(prev => ({
        ...prev,
        networkConnections: networkingData.connections.length,
        referrals: networkingData.analytics?.referrals_count || 0,
        profileViews: networkingData.analytics?.profile_views_count || 0
      }));
    }
  }, [networkingData]);

  // Update activity data with affiliate data and add fuel bonuses
  useEffect(() => {
    if (affiliateAnalytics) {
      setActivityData(prev => ({
        ...prev,
        referrals: prev.referrals + (affiliateAnalytics.total_referrals || 0)
      }));

      // Add affiliate achievements
      if (affiliateAnalytics.total_referrals >= 5 && !achievements.includes('First 5 Referrals')) {
        addAchievement('First 5 Referrals');
      }
      if (affiliateAnalytics.total_earnings >= 100 && !achievements.includes('£100 Earnings Milestone')) {
        addAchievement('£100 Earnings Milestone');
      }
    }
  }, [affiliateAnalytics]);

  const calculateFuelData = () => {
    const profileCompletion = FuelCalculator.calculateProfileCompletion(profileData);
    let activityFuel = FuelCalculator.calculateActivityFuel(activityData);
    
    // Add affiliate bonus fuel
    if (affiliateAnalytics) {
      // Bonus fuel for affiliate success
      const affiliateBonus = Math.min(25, Math.floor((affiliateAnalytics.total_earnings || 0) / 10));
      activityFuel += affiliateBonus;
      
      // High performer protection from decay
      if ((affiliateAnalytics.total_referrals || 0) >= 10) {
        setCurrentDecay(Math.max(0, currentDecay - 5)); // Reduce decay by 5%
      }
    }
    
    const totalFuel = FuelCalculator.calculateTotalFuel(profileData, activityData, currentDecay) + (activityFuel - FuelCalculator.calculateActivityFuel(activityData));
    const nextMilestone = FuelCalculator.getNextMilestone(totalFuel);
    const daysUntilDecay = FuelCalculator.calculateDaysUntilDecay();

    return {
      currentFuel: totalFuel,
      profileCompletion,
      activityFuel,
      nextMilestone,
      daysUntilDecay,
      recentActivity,
      achievements
    };
  };

  const updateProfileData = (data: any) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const updateActivityData = (data: any) => {
    setActivityData(prev => ({ ...prev, ...data }));
  };

  const addAchievement = (achievement: string) => {
    setAchievements(prev => {
      if (!prev.includes(achievement)) {
        return [...prev, achievement];
      }
      return prev;
    });
  };

  // Check for decay every day
  useEffect(() => {
    const checkDecay = () => {
      if (FuelCalculator.shouldTriggerDecay()) {
        setCurrentDecay(prev => prev + 2); // 2% weekly decay
      }
    };

    const interval = setInterval(checkDecay, 24 * 60 * 60 * 1000); // Check daily
    return () => clearInterval(interval);
  }, []);

  return {
    fuelData: calculateFuelData(),
    updateProfileData,
    updateActivityData,
    addAchievement
  };
}
