
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Users, 
  MapPin, 
  Heart, 
  BarChart3,
  Save
} from 'lucide-react';
import { CompanyOverview } from './company-profile/CompanyOverview';
import { EmployeeManagement } from './company-profile/EmployeeManagement';
import { DirectoryIntegration } from './company-profile/DirectoryIntegration';
import { BenefitsHRTools } from './company-profile/BenefitsHRTools';
import { TeamOverview } from './company-profile/TeamOverview';

export function CompanyProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSaveAll = () => {
    console.log('Saving all company profile changes...');
    setHasUnsavedChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-1">Manage your company information and team</p>
        </div>
        
        {hasUnsavedChanges && (
          <Button onClick={handleSaveAll} className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        )}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="gap-2">
            <Building className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="employees" className="gap-2">
            <Users className="w-4 h-4" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="directory" className="gap-2">
            <MapPin className="w-4 h-4" />
            Directory
          </TabsTrigger>
          <TabsTrigger value="benefits" className="gap-2">
            <Heart className="w-4 h-4" />
            Benefits & HR
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CompanyOverview onDataChange={() => setHasUnsavedChanges(true)} />
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeManagement onDataChange={() => setHasUnsavedChanges(true)} />
        </TabsContent>

        <TabsContent value="directory">
          <DirectoryIntegration onDataChange={() => setHasUnsavedChanges(true)} />
        </TabsContent>

        <TabsContent value="benefits">
          <BenefitsHRTools onDataChange={() => setHasUnsavedChanges(true)} />
        </TabsContent>

        <TabsContent value="team">
          <TeamOverview onDataChange={() => setHasUnsavedChanges(true)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
