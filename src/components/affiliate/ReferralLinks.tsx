
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Link, 
  Plus, 
  Copy, 
  QrCode,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AffiliateLink {
  id: string;
  link_code: string;
  campaign_name: string;
  clicks_count: number;
  conversions_count: number;
  is_active: boolean;
  created_at: string;
}

interface ReferralLinksProps {
  links: AffiliateLink[];
  onCreateLink: (campaignName: string) => Promise<any>;
}

export function ReferralLinks({ links, onCreateLink }: ReferralLinksProps) {
  const [newCampaignName, setNewCampaignName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();

  const handleCreateLink = async () => {
    if (!newCampaignName.trim()) {
      toast({
        title: "Campaign name required",
        description: "Please enter a campaign name for your referral link.",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      const result = await onCreateLink(newCampaignName);
      if (!result.error) {
        toast({
          title: "Link created successfully",
          description: "Your new referral link is ready to use!"
        });
        setNewCampaignName('');
        setShowCreateDialog(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error creating link",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = (linkCode: string) => {
    const fullUrl = `${window.location.origin}/ref/${linkCode}`;
    navigator.clipboard.writeText(fullUrl);
    toast({
      title: "Copied to clipboard",
      description: "Referral link copied successfully!"
    });
  };

  const generateQRCode = (linkCode: string) => {
    const fullUrl = `${window.location.origin}/ref/${linkCode}`;
    // In a real implementation, you'd integrate with a QR code generator
    window.open(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Referral Links
          </CardTitle>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Referral Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    placeholder="e.g., Social Media, Email Campaign, Events"
                  />
                </div>
                <Button 
                  onClick={handleCreateLink} 
                  disabled={isCreating}
                  className="w-full"
                >
                  {isCreating ? 'Creating...' : 'Create Link'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {links.length === 0 ? (
          <div className="text-center py-8">
            <Link className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No referral links yet</h3>
            <p className="text-gray-600 mb-4">Create your first referral link to start earning commissions</p>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{link.campaign_name}</h4>
                    <p className="text-sm text-gray-600">
                      tapinto.com/ref/{link.link_code}
                    </p>
                  </div>
                  <Badge className={link.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {link.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-2xl font-bold text-blue-600">{link.clicks_count}</p>
                    <p className="text-sm text-blue-700">Clicks</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="text-2xl font-bold text-green-600">{link.conversions_count}</p>
                    <p className="text-sm text-green-700">Conversions</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(link.link_code)}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => generateQRCode(link.link_code)}
                  >
                    <QrCode className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
