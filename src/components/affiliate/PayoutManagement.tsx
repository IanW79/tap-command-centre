
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Wallet, 
  CreditCard, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AffiliatePayout {
  id: string;
  amount: number;
  payout_method: string;
  status: string;
  created_at: string;
  processed_at: string;
}

interface PayoutManagementProps {
  payouts: AffiliatePayout[];
  currentBalance: number;
  onRequestPayout: (amount: number, method: string, details: any) => Promise<any>;
}

export function PayoutManagement({ payouts, currentBalance, onRequestPayout }: PayoutManagementProps) {
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('');
  const [payoutDetails, setPayoutDetails] = useState({
    account_number: '',
    sort_code: '',
    paypal_email: ''
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const { toast } = useToast();

  const minPayout = 25;
  const canRequestPayout = currentBalance >= minPayout;

  const handleRequestPayout = async () => {
    const amount = parseFloat(payoutAmount);
    
    if (!amount || amount < minPayout) {
      toast({
        title: "Invalid amount",
        description: `Minimum payout amount is £${minPayout}`,
        variant: "destructive"
      });
      return;
    }

    if (amount > currentBalance) {
      toast({
        title: "Insufficient balance",
        description: "Payout amount cannot exceed current balance",
        variant: "destructive"
      });
      return;
    }

    if (!payoutMethod) {
      toast({
        title: "Payout method required",
        description: "Please select a payout method",
        variant: "destructive"
      });
      return;
    }

    setIsRequesting(true);
    try {
      const result = await onRequestPayout(amount, payoutMethod, payoutDetails);
      if (!result.error) {
        toast({
          title: "Payout requested",
          description: "Your payout request has been submitted for processing"
        });
        setPayoutAmount('');
        setPayoutMethod('');
        setPayoutDetails({ account_number: '', sort_code: '', paypal_email: '' });
        setShowRequestDialog(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error requesting payout",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsRequesting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Balance */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-3xl font-bold text-green-600">£{currentBalance.toFixed(2)}</p>
              </div>
            </div>
            <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
              <DialogTrigger asChild>
                <Button 
                  disabled={!canRequestPayout}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Request Payout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Payout</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount (£)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min={minPayout}
                      max={currentBalance}
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      placeholder={`Min: £${minPayout}`}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="method">Payout Method</Label>
                    <Select value={payoutMethod} onValueChange={setPayoutMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payout method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {payoutMethod === 'bank_transfer' && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="account_number">Account Number</Label>
                        <Input
                          id="account_number"
                          value={payoutDetails.account_number}
                          onChange={(e) => setPayoutDetails(prev => ({ ...prev, account_number: e.target.value }))}
                          placeholder="12345678"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sort_code">Sort Code</Label>
                        <Input
                          id="sort_code"
                          value={payoutDetails.sort_code}
                          onChange={(e) => setPayoutDetails(prev => ({ ...prev, sort_code: e.target.value }))}
                          placeholder="12-34-56"
                        />
                      </div>
                    </div>
                  )}

                  {payoutMethod === 'paypal' && (
                    <div>
                      <Label htmlFor="paypal_email">PayPal Email</Label>
                      <Input
                        id="paypal_email"
                        type="email"
                        value={payoutDetails.paypal_email}
                        onChange={(e) => setPayoutDetails(prev => ({ ...prev, paypal_email: e.target.value }))}
                        placeholder="your@email.com"
                      />
                    </div>
                  )}

                  <Button 
                    onClick={handleRequestPayout} 
                    disabled={isRequesting}
                    className="w-full"
                  >
                    {isRequesting ? 'Processing...' : 'Request Payout'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {!canRequestPayout && (
            <p className="text-sm text-gray-600 mt-2">
              Minimum payout amount is £{minPayout}. Keep earning to reach the threshold!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          {payouts.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No payouts yet</h3>
              <p className="text-gray-600">Your payout history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">£{payout.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(payout.created_at).toLocaleDateString()} • 
                        {payout.payout_method.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(payout.status)}>
                    {getStatusIcon(payout.status)}
                    <span className="ml-1 capitalize">{payout.status}</span>
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
