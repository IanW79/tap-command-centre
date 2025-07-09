
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Calendar, 
  FileText, 
  Shield, 
  DollarSign,
  Plus,
  Download,
  Upload
} from 'lucide-react';

interface BenefitsHRToolsProps {
  onDataChange: () => void;
}

export function BenefitsHRTools({ onDataChange }: BenefitsHRToolsProps) {
  const [benefits] = useState([
    {
      id: 1,
      name: 'Health Insurance',
      description: 'Comprehensive medical, dental, and vision coverage',
      category: 'Health',
      coverage: '100% premium covered',
      icon: Shield
    },
    {
      id: 2,
      name: 'Paid Time Off',
      description: '25 days annual leave plus public holidays',
      category: 'Time Off',
      coverage: '25 days/year',
      icon: Calendar
    },
    {
      id: 3,
      name: 'Professional Development',
      description: 'Annual budget for training and conferences',
      category: 'Development',
      coverage: '$2,000/year',
      icon: FileText
    },
    {
      id: 4,
      name: 'Retirement Plan',
      description: '401(k) with company matching',
      category: 'Financial',
      coverage: '6% match',
      icon: DollarSign
    }
  ]);

  const [leaveRequests] = useState([
    { id: 1, employee: 'John Smith', type: 'Annual Leave', dates: 'Dec 20-30, 2024', status: 'Approved' },
    { id: 2, employee: 'Sarah Johnson', type: 'Sick Leave', dates: 'Nov 15, 2024', status: 'Approved' },
    { id: 3, employee: 'Mike Chen', type: 'Annual Leave', dates: 'Jan 2-5, 2025', status: 'Pending' }
  ]);

  const [policies] = useState([
    { name: 'Employee Handbook', lastUpdated: '2024-01-15', size: '2.4 MB' },
    { name: 'Code of Conduct', lastUpdated: '2024-03-10', size: '1.1 MB' },
    { name: 'Remote Work Policy', lastUpdated: '2024-06-20', size: '856 KB' },
    { name: 'Data Protection Policy', lastUpdated: '2024-05-12', size: '1.8 MB' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Benefits Packages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Employee Benefits Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-tapinto-blue/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-tapinto-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{benefit.name}</h4>
                    <Badge variant="outline" className="text-xs">{benefit.category}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{benefit.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-tapinto-blue">{benefit.coverage}</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Add New Benefit
          </Button>
        </CardContent>
      </Card>

      {/* Holiday/Leave Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Holiday & Leave Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Annual Leave</h4>
              <p className="text-2xl font-bold text-blue-700">156</p>
              <p className="text-sm text-blue-600">Days remaining (all staff)</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Sick Leave</h4>
              <p className="text-2xl font-bold text-green-700">42</p>
              <p className="text-sm text-green-600">Days used this year</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Pending Requests</h4>
              <p className="text-2xl font-bold text-purple-700">3</p>
              <p className="text-sm text-purple-600">Awaiting approval</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Recent Leave Requests</h4>
            <div className="space-y-2">
              {leaveRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{request.employee}</p>
                    <p className="text-sm text-gray-600">{request.type} • {request.dates}</p>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Document Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold">Employment Contract</h4>
              <p className="text-sm text-gray-600 mt-1">Standard employment agreement template</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold">NDA Template</h4>
              <p className="text-sm text-gray-600 mt-1">Non-disclosure agreement for employees</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold">Performance Review</h4>
              <p className="text-sm text-gray-600 mt-1">Annual performance evaluation form</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold">Leave Request Form</h4>
              <p className="text-sm text-gray-600 mt-1">Standard leave application template</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Company Policies Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {policies.map((policy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{policy.name}</p>
                    <p className="text-sm text-gray-600">
                      Updated: {new Date(policy.lastUpdated).toLocaleDateString()} • {policy.size}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 gap-2">
            <Upload className="w-4 h-4" />
            Upload New Policy
          </Button>
        </CardContent>
      </Card>

      {/* Employee Handbook Access */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Handbook Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-tapinto-blue/5 border border-tapinto-blue/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-tapinto-blue">Employee Handbook v2.3</h4>
              <Badge variant="outline">Current Version</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Comprehensive guide covering company policies, procedures, and employee benefits.
              Last updated: November 2024
            </p>
            <div className="flex gap-3">
              <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="outline">Edit Handbook</Button>
              <Button variant="outline">Version History</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
