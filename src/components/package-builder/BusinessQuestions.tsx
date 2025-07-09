
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessType, OrganisationData } from '@/pages/Index';

interface BusinessQuestionsProps {
  businessType: BusinessType | '';
  data: OrganisationData;
  onUpdate: (updates: Partial<OrganisationData>) => void;
  onNext: () => void;
}

const industryOptions = [
  'Technology & Software', 'Healthcare & Medical', 'Financial Services', 'Retail & E-commerce',
  'Professional Services', 'Manufacturing', 'Construction & Property', 'Education & Training',
  'Hospitality & Tourism', 'Creative & Media', 'Transport & Logistics', 'Food & Beverage',
  'Non-profit & Charity', 'Government & Public Sector', 'Agriculture', 'Energy & Utilities', 'Other'
];

const teamSizeOptions = [
  'Just me', '2-5 people', '6-10 people', '11-25 people', '26-50 people', 
  '51-100 people', '101-500 people', '500+ people'
];

const growthStageOptions = [
  'Just starting out', 'Early stage growth', 'Scaling rapidly', 
  'Established & stable', 'Mature & optimising'
];

const complianceOptions = [
  'GDPR compliance', 'Industry-specific regulations', 'Financial reporting',
  'Health & safety standards', 'Environmental compliance', 'Quality certifications'
];

const leadGenerationOptions = [
  'Website lead capture', 'Social media leads', 'Networking events',
  'Referral programmes', 'Content marketing', 'Email campaigns', 'Search advertising'
];

const servicesOptions = [
  'Consulting', 'Design & Creative', 'Development & Technical', 'Marketing & Advertising',
  'Training & Education', 'Health & Wellness', 'Financial Services', 'Legal Services'
];

const clientAcquisitionOptions = [
  'Finding qualified leads', 'Converting prospects', 'Pricing competitively',
  'Building trust & credibility', 'Standing out from competition', 'Time management'
];

const personalBrandOptions = [
  'Thought leadership', 'Industry recognition', 'Speaking opportunities',
  'Media appearances', 'Professional networking', 'Online presence'
];

const networkingOptions = [
  'Industry events', 'Professional associations', 'Online communities',
  'Mentorship programmes', 'Business partnerships', 'Peer groups'
];

const fundraisingOptions = [
  'Individual donations', 'Corporate sponsorship', 'Grant applications',
  'Crowdfunding campaigns', 'Fundraising events', 'Legacy giving'
];

const volunteerManagementOptions = [
  'Volunteer recruitment', 'Training & onboarding', 'Scheduling & coordination',
  'Recognition & retention', 'Skills-based volunteering', 'Remote volunteers'
];

const communityEngagementOptions = [
  'Local partnerships', 'Community events', 'Awareness campaigns',
  'Educational programmes', 'Advocacy & lobbying', 'Social media engagement'
];

export const BusinessQuestions: React.FC<BusinessQuestionsProps> = ({
  businessType,
  data,
  onUpdate,
  onNext
}) => {
  const handleArrayToggle = (field: keyof OrganisationData, value: string) => {
    const currentArray = (data[field] as string[]) || [];
    const updatedArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    onUpdate({ [field]: updatedArray });
  };

  const getQuestionTitle = () => {
    switch (businessType) {
      case 'company':
      case 'llp':
      case 'llc':
        return 'Tell us about your business';
      case 'self-employed':
        return 'Tell us about your work';
      case 'charity':
      case 'cic':
        return 'Tell us about your organisation';
      default:
        return 'Tell us more';
    }
  };

  const canProceed = () => {
    const hasBasicInfo = data.companyName && data.industry && data.teamSize;
    
    if (businessType === 'company' || businessType === 'llp' || businessType === 'llc') {
      return hasBasicInfo && data.growthStage;
    }
    
    if (businessType === 'self-employed') {
      return hasBasicInfo && (data.servicesOffered || []).length > 0;
    }
    
    if (businessType === 'charity' || businessType === 'cic') {
      return hasBasicInfo && data.causeFocus;
    }
    
    return hasBasicInfo;
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          {getQuestionTitle()}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          These details help us create the perfect package for your {businessType === 'self-employed' ? 'work' : 'organisation'}.
        </p>
      </div>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-10 p-8">
          
          {/* Basic Business Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="companyName" className="text-lg font-medium">
                {businessType === 'self-employed' ? 'Business/Trading Name' : 'Organisation Name'}
              </Label>
              <Input
                id="companyName"
                value={data.companyName}
                onChange={(e) => onUpdate({ companyName: e.target.value })}
                placeholder={businessType === 'self-employed' ? 'Your business name' : 'Organisation name'}
                className="text-lg py-4"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="website" className="text-lg font-medium">
                Website (Optional)
              </Label>
              <Input
                id="website"
                value={data.website}
                onChange={(e) => onUpdate({ website: e.target.value })}
                placeholder="www.yourwebsite.com"
                className="text-lg py-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-lg font-medium">
                {businessType === 'charity' || businessType === 'cic' ? 'Cause/Focus Area' : 'Industry'}
              </Label>
              <Select value={data.industry} onValueChange={(value) => onUpdate({ industry: value })}>
                <SelectTrigger className="text-lg py-4">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="text-lg font-medium">
                {businessType === 'charity' || businessType === 'cic' ? 'Organisation Size' : 'Team Size'}
              </Label>
              <Select value={data.teamSize} onValueChange={(value) => onUpdate({ teamSize: value })}>
                <SelectTrigger className="text-lg py-4">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {teamSizeOptions.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Company/LLP/LLC specific questions */}
          {(businessType === 'company' || businessType === 'llp' || businessType === 'llc') && (
            <>
              <div className="space-y-3">
                <Label className="text-lg font-medium">Growth Stage</Label>
                <Select value={data.growthStage} onValueChange={(value) => onUpdate({ growthStage: value })}>
                  <SelectTrigger className="text-lg py-4">
                    <SelectValue placeholder="Select growth stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {growthStageOptions.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Compliance Requirements (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complianceOptions.map((compliance) => (
                    <div
                      key={compliance}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('complianceRequirements', compliance)}
                    >
                      <Checkbox
                        checked={(data.complianceRequirements || []).includes(compliance)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{compliance}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Lead Generation Needs (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leadGenerationOptions.map((option) => (
                    <div
                      key={option}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('leadGenerationNeeds', option)}
                    >
                      <Checkbox
                        checked={(data.leadGenerationNeeds || []).includes(option)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Self-employed specific questions */}
          {businessType === 'self-employed' && (
            <>
              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Services Offered (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicesOptions.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('servicesOffered', service)}
                    >
                      <Checkbox
                        checked={(data.servicesOffered || []).includes(service)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Client Acquisition Challenges (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientAcquisitionOptions.map((challenge) => (
                    <div
                      key={challenge}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('clientAcquisitionChallenges', challenge)}
                    >
                      <Checkbox
                        checked={(data.clientAcquisitionChallenges || []).includes(challenge)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Personal Brand Goals (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalBrandOptions.map((goal) => (
                    <div
                      key={goal}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('personalBrandGoals', goal)}
                    >
                      <Checkbox
                        checked={(data.personalBrandGoals || []).includes(goal)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Networking Needs (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {networkingOptions.map((need) => (
                    <div
                      key={need}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('networkingNeeds', need)}
                    >
                      <Checkbox
                        checked={(data.networkingNeeds || []).includes(need)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{need}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Charity/CIC specific questions */}
          {(businessType === 'charity' || businessType === 'cic') && (
            <>
              <div className="space-y-3">
                <Label htmlFor="causeFocus" className="text-lg font-medium">
                  Primary Cause/Focus
                </Label>
                <Input
                  id="causeFocus"
                  value={data.causeFocus}
                  onChange={(e) => onUpdate({ causeFocus: e.target.value })}
                  placeholder="What cause does your organisation focus on?"
                  className="text-lg py-4"
                />
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Fundraising Goals (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fundraisingOptions.map((goal) => (
                    <div
                      key={goal}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('fundraisingGoals', goal)}
                    >
                      <Checkbox
                        checked={(data.fundraisingGoals || []).includes(goal)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Volunteer Management (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {volunteerManagementOptions.map((option) => (
                    <div
                      key={option}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('volunteerManagement', option)}
                    >
                      <Checkbox
                        checked={(data.volunteerManagement || []).includes(option)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-medium">
                  Community Engagement Needs (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {communityEngagementOptions.map((need) => (
                    <div
                      key={need}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
                      onClick={() => handleArrayToggle('communityEngagementNeeds', need)}
                    >
                      <Checkbox
                        checked={(data.communityEngagementNeeds || []).includes(need)}
                        className="data-[state=checked]:bg-tapinto-blue data-[state=checked]:border-tapinto-blue"
                      />
                      <span className="text-slate-700">{need}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="pt-8">
            <Button
              onClick={onNext}
              disabled={!canProceed()}
              className="w-full py-4 text-lg font-semibold bg-tapinto-blue hover:bg-tapinto-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate My Package
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
