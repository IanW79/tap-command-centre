
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  Sparkles, 
  ArrowRight,
  Lock,
  UserPlus
} from 'lucide-react';

interface ProfileViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileOwnerName: string;
  onRegisterAndConnect: (data: { name: string; email: string; source: string }) => void;
}

export function ProfileViewModal({ 
  isOpen, 
  onClose, 
  profileOwnerName,
  onRegisterAndConnect 
}: ProfileViewModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegisterAndConnect(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-tapinto-blue rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                Join {profileOwnerName}'s Network
              </DialogTitle>
              <p className="text-gray-600 text-sm">
                Connect securely on TAPinto
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Benefits */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Join TAPinto & Get:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <Shield className="w-3 h-3" />
                Secure professional networking
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <Users className="w-3 h-3" />
                Build your own professional network
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <Sparkles className="w-3 h-3" />
                Create your own ME Profile
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">How did you find {profileOwnerName}?</Label>
              <Textarea
                id="source"
                value={formData.source}
                onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                placeholder="LinkedIn, referral, event, etc."
                rows={2}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2"
              disabled={!formData.name || !formData.email}
            >
              Continue to Package Builder
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Privacy Assurance */}
          <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
            <Lock className="w-3 h-3" />
            <span>
              Your data is secure and protected. We'll only use this information to connect you with {profileOwnerName} and create your TAPinto account.
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
