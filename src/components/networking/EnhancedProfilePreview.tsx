
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Eye, 
  Heart, 
  Share2, 
  ExternalLink,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Globe,
  Users,
  Shield
} from 'lucide-react';
import { ProfileViewModal } from './ProfileViewModal';
import { useNetworking } from '@/hooks/useNetworking';

interface EnhancedProfilePreviewProps {
  profileData: any;
  viewCount?: number;
  isPublicView?: boolean;
  onViewProfile?: () => void;
}

export function EnhancedProfilePreview({ 
  profileData, 
  viewCount = 0, 
  isPublicView = false,
  onViewProfile 
}: EnhancedProfilePreviewProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const { recordProfileView } = useNetworking();

  const handleSeeFullProfile = () => {
    if (isPublicView) {
      setShowRegistrationModal(true);
    } else {
      onViewProfile?.();
    }
  };

  const handleRegisterAndConnect = async (registrationData: { name: string; email: string; source: string }) => {
    // Record the profile view with registration data
    await recordProfileView(profileData.user_id, {
      email: registrationData.email,
      name: registrationData.name,
      source: registrationData.source
    });

    // In a real implementation, this would redirect to Package Builder
    // For now, we'll close the modal and show a success message
    setShowRegistrationModal(false);
    
    // This would normally redirect to Package Builder with pre-populated data
    console.log('Redirecting to Package Builder with:', registrationData);
  };

  const profileName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || 'Professional';

  return (
    <>
      <Card className="max-w-2xl mx-auto shadow-lg">
        {/* Header with Stats */}
        <div className="bg-gradient-to-r from-tapinto-blue to-blue-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-16 h-16 border-4 border-white">
                <AvatarImage src={profileData.profileImageUrl} />
                <AvatarFallback className="bg-white text-tapinto-blue text-xl font-bold">
                  {profileName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{profileName}</h1>
                {profileData.profession && (
                  <p className="text-blue-100">{profileData.profession}</p>
                )}
                {profileData.companyName && (
                  <p className="text-blue-200 text-sm">{profileData.companyName}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-blue-100 mb-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{viewCount} views</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                TAPinto Professional
              </Badge>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Bio Section */}
          {profileData.bio && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-tapinto-blue" />
                About
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {profileData.bio.length > 200 && isPublicView 
                  ? `${profileData.bio.substring(0, 200)}...` 
                  : profileData.bio
                }
              </p>
            </div>
          )}

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-tapinto-blue" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profileData.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{isPublicView ? '••••••@••••.com' : profileData.email}</span>
                </div>
              )}
              {profileData.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{isPublicView ? '••• ••• ••••' : profileData.phone}</span>
                </div>
              )}
              {profileData.website && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{profileData.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Experience Preview */}
          {profileData.experience && profileData.experience.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-tapinto-blue" />
                Experience
              </h3>
              <div className="space-y-3">
                {profileData.experience.slice(0, 2).map((exp: any, index: number) => (
                  <div key={index} className="border-l-2 border-tapinto-blue pl-4">
                    <h4 className="font-medium">{exp.title}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500">{exp.period}</p>
                  </div>
                ))}
                {profileData.experience.length > 2 && isPublicView && (
                  <p className="text-sm text-gray-500 italic">
                    +{profileData.experience.length - 2} more experiences
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Social Links Preview */}
          {profileData.socialLinks && profileData.socialLinks.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-tapinto-blue" />
                Connect
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.socialLinks.slice(0, 3).map((link: any, index: number) => (
                  <Badge key={index} variant="outline" className="gap-1">
                    <Globe className="w-3 h-3" />
                    {link.platform}
                  </Badge>
                ))}
                {profileData.socialLinks.length > 3 && (
                  <Badge variant="outline">
                    +{profileData.socialLinks.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Value Proposition for Public View */}
          {isPublicView && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-tapinto-blue rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">
                    Connect Securely with {profileName}
                  </h4>
                  <p className="text-sm text-blue-700">
                    Join TAPinto's professional network to access full profiles and connect directly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-blue-600">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>Secure networking</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Data protection</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>Build relationships</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={handleSeeFullProfile}
              className="flex-1 bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              {isPublicView ? 'See Live Profile' : 'View Full Profile'}
            </Button>
            
            {!isPublicView && (
              <>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <ProfileViewModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        profileOwnerName={profileName}
        onRegisterAndConnect={handleRegisterAndConnect}
      />
    </>
  );
}
