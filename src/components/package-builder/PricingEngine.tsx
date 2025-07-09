// /src/components/package-builder/PricingEngine.tsx
import { OrganisationData, BusinessType } from '@/pages/Index';

export interface PricingResult {
  packageName: string;
  basePrice: number;
  features: Array<{id: string; name: string; price: number; reason: string}>;
  totalPrice: number;
  roi: string;
  rewardsClub: string;
}

export class PricingEngine {
  private static basePrices = {
    individual: 14.99,
    business: 29.99,
    social: 0
  };

  private static features = {
    'ecommerce': { price: 12.99, name: 'E-Commerce Suite' },
    'crm': { price: 6.99, name: 'CRM Integration' },
    'analytics': { price: 5.99, name: 'Advanced Analytics' },
    'communities': { price: 9.99, name: 'Secure Communities' },
    'events': { price: 7.99, name: 'Event Ticketing' },
    'write-center': { price: 3.99, name: 'Write Center' },
    'branding': { price: 8.99, name: 'Custom Branding' },
    'fundraising': { price: 4.99, name: 'Fundraising Tools' },
    'volunteers': { price: 3.99, name: 'Volunteer Management' }
  };

  static calculatePackage(businessType: BusinessType | '', data: OrganisationData): PricingResult {
    const baseTier = businessType === 'charity' || businessType === 'cic' ? 'social' : 
                    businessType === 'self-employed' ? 'individual' : 'business';
    
    const basePrice = this.basePrices[baseTier];
    const recommendedFeatures = this.getRecommendedFeatures(businessType, data);
    
    const totalPrice = basePrice + recommendedFeatures.reduce((sum, f) => sum + f.price, 0);
    
    return {
      packageName: this.generatePackageName(businessType, data),
      basePrice,
      features: recommendedFeatures,
      totalPrice,
      roi: this.calculateROI(data.industry, totalPrice),
      rewardsClub: totalPrice >= 50 ? 'Gold' : totalPrice >= 30 ? 'Silver' : 'Bronze'
    };
  }

  private static getRecommendedFeatures(businessType: BusinessType | '', data: OrganisationData) {
    const recommended = [];

    // Industry-based recommendations
    if (data.industry === 'Retail & E-commerce') {
      recommended.push({...this.features.ecommerce, id: 'ecommerce', reason: 'Perfect for online sales'});
    }

    // Business type recommendations
    if (businessType === 'charity' || businessType === 'cic') {
      recommended.push({...this.features.fundraising, id: 'fundraising', reason: 'Essential for fundraising'});
      recommended.push({...this.features.volunteers, id: 'volunteers', reason: 'Manage volunteers effectively'});
    }

    // Goal-based recommendations
    if (data.leadGenerationNeeds?.includes('Website lead capture')) {
      recommended.push({...this.features.crm, id: 'crm', reason: 'Capture and manage leads'});
    }

    if (data.personalBrandGoals?.includes('Thought leadership')) {
      recommended.push({...this.features['write-center'], id: 'write-center', reason: 'Create compelling content'});
    }

    if (data.networkingNeeds?.includes('Professional associations')) {
      recommended.push({...this.features.communities, id: 'communities', reason: 'Build professional networks'});
    }

    // Growth stage recommendations
    if (data.growthStage === 'Scaling rapidly') {
      recommended.push({...this.features.analytics, id: 'analytics', reason: 'Track growth metrics'});
    }

    return recommended;
  }

  private static generatePackageName(businessType: BusinessType | '', data: OrganisationData): string {
    const typeNames = {
      'company': 'Business Growth',
      'self-employed': 'Professional',
      'charity': 'Social Impact',
      'cic': 'Community Interest'
    };
    
    const baseName = typeNames[businessType as keyof typeof typeNames] || 'Custom';
    const sizeName = data.teamSize?.includes('Just me') ? 'Solo' : 'Team';
    
    return `${baseName} ${sizeName} Package`;
  }

  private static calculateROI(industry: string = '', monthlyInvestment: number): string {
    if (industry === 'Food & Beverage') {
      return `ROI: 50x in 3 months - 25 bookings = £2,400 revenue vs £${monthlyInvestment}`;
    }
    
    if (industry === 'Retail & E-commerce') {
      return `ROI: 58x in 4 months - 15 customers = £2,100 value vs £${monthlyInvestment}`;
    }
    
    const estimatedLeads = Math.max(5, Math.floor(monthlyInvestment / 10));
    const estimatedRevenue = estimatedLeads * 200;
    const roi = Math.floor(estimatedRevenue / monthlyInvestment);
    
    return `ROI: ${roi}x in 3-6 months - ${estimatedLeads} leads = £${estimatedRevenue} revenue`;
  }

  // Easy updates
  static updateFeaturePrice(featureId: string, newPrice: number): void {
    if (this.features[featureId as keyof typeof this.features]) {
      this.features[featureId as keyof typeof this.features].price = newPrice;
    }
  }

  static addFeature(id: string, name: string, price: number): void {
    (this.features as any)[id] = { name, price };
  }
}
