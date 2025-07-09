
// Legacy types for backward compatibility with existing components
export interface FormData {
  // Personal information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  
  // User type and business info
  userType: UserType;
  businessSize: string;
  companyName: string;
  website: string;
  sector: string;
  otherSector?: string;
  
  // Interests and goals
  personalSituation?: string;
  interests: string[];
  outcomes: string[];
}

export type UserType = 'consumer' | 'business' | 'charity';
