
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { WelcomeDashboard } from '@/components/dashboard/WelcomeDashboard';
import { MEProfile } from '@/components/dashboard/MEProfile';
import { NetworkingHub } from '@/components/dashboard/NetworkingHub';
import { CompanyProfile } from '@/components/dashboard/CompanyProfile';
import { DirectoryListing } from '@/components/dashboard/DirectoryListing';
import { ECommerceShop } from '@/components/dashboard/ECommerceShop';
import { SecureCommunities } from '@/components/dashboard/SecureCommunities';
import { EventTicketing } from '@/components/dashboard/EventTicketing';
import { PackageManagement } from '@/components/dashboard/PackageManagement';
import { RewardsClub } from '@/components/dashboard/RewardsClub';
import { AffiliateCenter } from '@/components/dashboard/AffiliateCenter';
import { AccountSettings } from '@/components/dashboard/AccountSettings';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="flex-1 p-6">
        <Routes>
          <Route index element={<WelcomeDashboard />} />
          <Route path="me-profile" element={<MEProfile />} />
          <Route path="networking" element={<NetworkingHub />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="directory" element={<DirectoryListing />} />
          <Route path="ecommerce" element={<ECommerceShop />} />
          <Route path="communities" element={<SecureCommunities />} />
          <Route path="events" element={<EventTicketing />} />
          <Route path="packages" element={<PackageManagement />} />
          <Route path="rewards" element={<RewardsClub />} />
          <Route path="affiliate" element={<AffiliateCenter />} />
          <Route path="settings" element={<AccountSettings />} />
        </Routes>
      </main>
    </div>
  );
}
