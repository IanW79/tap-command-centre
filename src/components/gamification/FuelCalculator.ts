
interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  profession?: string;
  profileImageUrl?: string;
  socialLinks?: any[];
  companyName?: string;
  website?: string;
  experience?: any[];
}

interface ActivityData {
  weeklyLogins: number;
  dailyStreak: number;
  networkConnections: number;
  referrals: number;
  profileViews: number;
  communityEngagement: number;
  eventAttendance: number;
  packageUpgrades: number;
}

export class FuelCalculator {
  static calculateProfileCompletion(profile: ProfileData): number {
    let completion = 0;
    
    // Contact information (15%)
    if (profile.firstName && profile.lastName && profile.email && profile.phone) {
      completion += 15;
    }
    
    // Professional bio (15%)
    if (profile.bio && profile.bio.length > 50) {
      completion += 15;
    }
    
    // Experience section (15%)
    if (profile.experience && profile.experience.length > 0) {
      completion += 15;
    }
    
    // Social links (10%)
    if (profile.socialLinks && profile.socialLinks.length > 0) {
      completion += 10;
    }
    
    // Profile photo (10%)
    if (profile.profileImageUrl) {
      completion += 10;
    }
    
    // Business details (15%)
    if (profile.companyName && profile.website) {
      completion += 15;
    }
    
    // Quality content bonus (20%)
    if (this.assessContentQuality(profile)) {
      completion += 20;
    }
    
    return Math.min(100, completion);
  }
  
  static calculateActivityFuel(activity: ActivityData): number {
    let activityFuel = 0;
    
    // Weekly login (2%)
    if (activity.weeklyLogins > 0) {
      activityFuel += 2;
    }
    
    // Daily login streak (max 7% weekly)
    activityFuel += Math.min(7, activity.dailyStreak);
    
    // Network connections (3% each)
    activityFuel += activity.networkConnections * 3;
    
    // Referrals (10% each)
    activityFuel += activity.referrals * 10;
    
    // Profile views (1% per 10 views)
    activityFuel += Math.floor(activity.profileViews / 10);
    
    // Community engagement (1% each)
    activityFuel += activity.communityEngagement;
    
    // Event attendance (5% each)
    activityFuel += activity.eventAttendance * 5;
    
    // Package upgrades (15% each)
    activityFuel += activity.packageUpgrades * 15;
    
    return Math.min(100, activityFuel);
  }
  
  static calculateTotalFuel(profile: ProfileData, activity: ActivityData, currentDecay: number = 0): number {
    const profileFuel = this.calculateProfileCompletion(profile);
    const activityFuel = this.calculateActivityFuel(activity);
    
    return Math.max(0, profileFuel + activityFuel - currentDecay);
  }
  
  static getNextMilestone(currentFuel: number): number {
    const milestones = [25, 50, 75, 100, 125, 150, 175, 200];
    return milestones.find(milestone => milestone > currentFuel) || 200;
  }
  
  static getMilestoneReward(milestone: number): string {
    const rewards: { [key: number]: string } = {
      25: 'Basic networking features unlocked',
      50: 'Enhanced profile customization',
      75: 'Advanced analytics access',
      100: 'Affiliate account activated + Bonus Fuel Zone unlocked',
      125: 'Premium networking tools + priority support',
      150: 'Rewards Club bonus month activated',
      175: 'Exclusive events access + VIP features',
      200: 'Maximum status + special recognition badge'
    };
    
    return rewards[milestone] || 'Unknown reward';
  }
  
  static shouldTriggerDecay(): boolean {
    const now = new Date();
    return now.getDay() === 1; // Monday
  }
  
  static calculateDaysUntilDecay(): number {
    const now = new Date();
    const daysUntilMonday = (8 - now.getDay()) % 7;
    return daysUntilMonday === 0 ? 7 : daysUntilMonday;
  }
  
  private static assessContentQuality(profile: ProfileData): boolean {
    // Simple quality assessment
    const hasCompleteBio = profile.bio && profile.bio.length > 100;
    const hasDetailedExperience = profile.experience && profile.experience.length > 1;
    const hasMultipleSocialLinks = profile.socialLinks && profile.socialLinks.length > 2;
    
    return hasCompleteBio && (hasDetailedExperience || hasMultipleSocialLinks);
  }
  
  static getRewardsClubBonus(fuelLevel: number, rewardsClubTier: string): number {
    if (fuelLevel < 150) return 0;
    
    const bonuses: { [key: string]: number } = {
      'bronze': 5,
      'silver': 10,
      'gold': 15,
      'platinum': 20
    };
    
    return bonuses[rewardsClubTier.toLowerCase()] || 0;
  }
}
