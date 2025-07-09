
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Building,
  User,
  Filter
} from 'lucide-react';

interface TeamOverviewProps {
  onDataChange: () => void;
}

export function TeamOverview({ onDataChange }: TeamOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { name: 'Executive', count: 2, color: 'bg-purple-100 text-purple-800' },
    { name: 'Technology', count: 8, color: 'bg-blue-100 text-blue-800' },
    { name: 'Marketing', count: 4, color: 'bg-green-100 text-green-800' },
    { name: 'Sales', count: 6, color: 'bg-orange-100 text-orange-800' },
    { name: 'HR', count: 2, color: 'bg-pink-100 text-pink-800' },
    { name: 'Finance', count: 3, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const employees = [
    {
      id: 1,
      name: 'John Smith',
      role: 'CEO',
      department: 'Executive',
      email: 'john@techflow.com',
      phone: '+1 (555) 123-4567',
      avatar: '/placeholder.svg',
      isManager: true,
      reports: ['Sarah Johnson', 'Mike Chen', 'Lisa Wong']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'CTO',
      department: 'Technology',
      email: 'sarah@techflow.com',
      phone: '+1 (555) 123-4568',
      avatar: '/placeholder.svg',
      isManager: true,
      reports: ['Alex Kumar', 'Emma Davis', 'Tom Wilson']
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'Lead Developer',
      department: 'Technology',
      email: 'mike@techflow.com',
      phone: '+1 (555) 123-4569',
      avatar: '/placeholder.svg',
      isManager: false,
      reports: []
    },
    {
      id: 4,
      name: 'Lisa Wong',
      role: 'Marketing Director',
      department: 'Marketing',
      email: 'lisa@techflow.com',
      phone: '+1 (555) 123-4570',
      avatar: '/placeholder.svg',
      isManager: true,
      reports: ['David Kim', 'Rachel Green']
    },
    {
      id: 5,
      name: 'Alex Kumar',
      role: 'Senior Developer',
      department: 'Technology',
      email: 'alex@techflow.com',
      phone: '+1 (555) 123-4571',
      avatar: '/placeholder.svg',
      isManager: false,
      reports: []
    },
    {
      id: 6,
      name: 'Emma Davis',
      role: 'UX Designer',
      department: 'Technology',
      email: 'emma@techflow.com',
      phone: '+1 (555) 123-4572',
      avatar: '/placeholder.svg',
      isManager: false,
      reports: []
    }
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Overview</h2>
          <p className="text-gray-600">Organizational structure and team member directory</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Export Directory
          </Button>
        </div>
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Department Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {departments.map((dept) => (
              <div 
                key={dept.name}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedDepartment === dept.name ? 'ring-2 ring-tapinto-blue' : ''
                }`}
                onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? 'all' : dept.name)}
              >
                <div className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${dept.color}`}>
                  {dept.name}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">{dept.count}</p>
                <p className="text-sm text-gray-600">members</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant={selectedDepartment === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedDepartment('all')}
            >
              All Departments
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Organizational Chart View */}
      <Card>
        <CardHeader>
          <CardTitle>Organizational Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* CEO Level */}
            <div className="text-center">
              <div className="inline-block">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 max-w-xs">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-tapinto-blue text-white">JS</AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold">John Smith</h4>
                  <p className="text-sm text-gray-600">CEO</p>
                </div>
              </div>
            </div>

            {/* Department Heads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {employees.filter(emp => emp.isManager && emp.role !== 'CEO').map((manager) => (
                <div key={manager.id} className="text-center">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <Avatar className="w-12 h-12 mx-auto mb-2">
                      <AvatarImage src={manager.avatar} />
                      <AvatarFallback className="bg-tapinto-blue text-white">
                        {manager.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold text-sm">{manager.name}</h4>
                    <p className="text-xs text-gray-600">{manager.role}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {manager.department}
                    </Badge>
                  </div>
                  
                  {/* Direct Reports */}
                  {manager.reports.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {manager.reports.map((reportName) => (
                        <div key={reportName} className="bg-gray-50 border border-gray-200 rounded p-2">
                          <p className="text-xs font-medium">{reportName}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Directory ({filteredEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback className="bg-tapinto-blue text-white">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{employee.name}</h4>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {employee.department}
                  </Badge>
                  {employee.isManager && (
                    <Badge variant="secondary" className="text-xs ml-2">
                      Manager
                    </Badge>
                  )}
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-3 h-3" />
                    <span>{employee.phone}</span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <User className="w-3 h-3 mr-1" />
                    Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
