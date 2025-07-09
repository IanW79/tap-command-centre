
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';
import { TAPintoBrand } from '@/components/TAPintoBrand';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  User, 
  Package, 
  Building2, 
  Settings,
  Wand2,
  Shield,
  ShoppingCart,
  Gift,
  Calendar,
  Users,
  MapPin,
  DollarSign
} from 'lucide-react';

const navigationItems = [
  { title: 'Package Builder', url: '/', icon: Wand2, badge: null },
  { title: 'Dashboard', url: '/dashboard', icon: Home, badge: 'Premium' },
  { title: 'ME Profile', url: '/dashboard/me-profile', icon: User, badge: 'Premium' },
  { title: 'Networking Hub', url: '/dashboard/networking', icon: Users, badge: 'Premium' },
  { title: 'Company Profile', url: '/dashboard/company-profile', icon: Building2, badge: 'Premium' },
  { title: 'Directory Listing', url: '/dashboard/directory', icon: MapPin, badge: 'Premium' },
  { title: 'E-Commerce Shop', url: '/dashboard/ecommerce', icon: ShoppingCart, badge: 'New' },
  { title: 'Secure Communities', url: '/dashboard/communities', icon: Shield, badge: 'New' },
  { title: 'Event Ticketing', url: '/dashboard/events', icon: Calendar, badge: 'New' },
  { title: 'Package Management', url: '/dashboard/packages', icon: Package, badge: 'Premium' },
  { title: 'Rewards Club', url: '/dashboard/rewards', icon: Gift, badge: 'New' },
  { title: 'Affiliate Center', url: '/dashboard/affiliate', icon: DollarSign, badge: 'New' },
  { title: 'Account Settings', url: '/dashboard/settings', icon: Settings, badge: 'Premium' },
];

export function GlobalSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={`${isCollapsed ? 'w-16' : 'w-64'} border-r border-gray-200 bg-white`}>
      <SidebarHeader className="p-4 border-b border-gray-200">
        {!isCollapsed && (
          <TAPintoBrand size="md" className="text-tapinto-blue" />
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-tapinto-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 p-2">
              {navigationItems.map((item) => {
                const isCurrentlyActive = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url}
                        end={item.url === '/'}
                        className={({ isActive: navIsActive }) => {
                          return `
                            flex items-center gap-3 px-3 py-3 rounded-lg transition-colors leading-none
                            ${isCurrentlyActive || navIsActive
                              ? 'bg-tapinto-blue text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                            }
                          `;
                        }}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <>
                            <span className="font-medium text-sm leading-none">{item.title}</span>
                            {item.badge && (
                              <Badge 
                                variant="secondary" 
                                className={`ml-auto text-xs leading-none py-1 ${
                                  item.badge === 'New' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-purple-100 text-purple-700'
                                }`}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
