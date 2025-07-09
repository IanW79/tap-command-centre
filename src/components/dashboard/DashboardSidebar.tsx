
import React from 'react';
import {
  Home,
  User,
  Building2,
  MapPin,
  ShoppingCart,
  Shield,
  Calendar,
  Package,
  Gift,
  Settings,
  Users,
  DollarSign
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const { pathname } = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: pathname === '/dashboard' },
    { name: 'ME Profile', href: '/dashboard/me-profile', icon: User, current: pathname === '/dashboard/me-profile' },
    { name: 'Networking Hub', href: '/dashboard/networking', icon: Users, current: pathname === '/dashboard/networking' },
    { name: 'Company Profile', href: '/dashboard/company-profile', icon: Building2, current: pathname === '/dashboard/company-profile' },
    { name: 'Directory Listing', href: '/dashboard/directory', icon: MapPin, current: pathname === '/dashboard/directory' },
    { name: 'E-Commerce Shop', href: '/dashboard/ecommerce', icon: ShoppingCart, current: pathname === '/dashboard/ecommerce' },
    { name: 'Secure Communities', href: '/dashboard/communities', icon: Shield, current: pathname === '/dashboard/communities' },
    { name: 'Event Ticketing', href: '/dashboard/events', icon: Calendar, current: pathname === '/dashboard/events' },
    { name: 'Package Management', href: '/dashboard/packages', icon: Package, current: pathname === '/dashboard/packages' },
    { name: 'Rewards Club', href: '/dashboard/rewards', icon: Gift, current: pathname === '/dashboard/rewards' },
    { name: 'Affiliate Center', href: '/dashboard/affiliate', icon: DollarSign, current: pathname === '/dashboard/affiliate' },
    { name: 'Account Settings', href: '/dashboard/settings', icon: Settings, current: pathname === '/dashboard/settings' }
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r w-64 min-w-64 shrink-0">
      <div className="flex items-center justify-center h-16 border-b bg-white">
        <span className="text-lg font-bold text-tapinto-blue">TAPinto</span>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <nav className="flex flex-col space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 transition-colors',
                  isActive
                    ? 'bg-tapinto-blue text-white hover:bg-tapinto-blue hover:text-white'
                    : 'text-gray-700'
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5 shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t bg-gray-50">
        <a href="/" className="block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
