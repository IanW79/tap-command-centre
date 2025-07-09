
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Search, Download, QrCode } from 'lucide-react';

interface SessionRecoveryProps {
  onSessionFound: (sessionData: any) => void;
  onClose: () => void;
}

export function SessionRecovery({ onSessionFound, onClose }: SessionRecoveryProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailRecovery = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // In a real implementation, this would call your session recovery API
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage(`If a session exists for ${email}, you'll receive a recovery link shortly.`);
    } catch (err) {
      setError('Failed to send recovery email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQRRecovery = () => {
    // In a real implementation, this would generate a QR code for mobile-to-desktop transfer
    setMessage('QR code recovery is not yet implemented in this demo.');
  };

  const handleExportSession = () => {
    // In a real implementation, this would export the current session data
    const sessionData = localStorage.getItem('tapinto-package-builder-session');
    if (sessionData) {
      const blob = new Blob([sessionData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'package-builder-session.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage('Session data exported successfully!');
    } else {
      setError('No session data found to export.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Recover Your Session
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recovery-email">Email Address</Label>
          <Input
            id="recovery-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleEmailRecovery} 
          disabled={isLoading}
          className="w-full gap-2"
        >
          <Mail className="w-4 h-4" />
          {isLoading ? 'Sending...' : 'Send Recovery Link'}
        </Button>

        <div className="flex gap-2">
          <Button 
            onClick={handleQRRecovery}
            variant="outline"
            className="flex-1 gap-2"
          >
            <QrCode className="w-4 h-4" />
            QR Recovery
          </Button>
          
          <Button 
            onClick={handleExportSession}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {message && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={onClose}
          variant="ghost"
          className="w-full"
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
}
