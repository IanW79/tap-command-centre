
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Users, 
  Mail, 
  Phone, 
  Edit, 
  Trash2,
  ExternalLink,
  FileText
} from 'lucide-react';

interface EmployeeManagementProps {
  onDataChange: () => void;
}

export function EmployeeManagement({ onDataChange }: EmployeeManagementProps) {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@techflow.com',
      role: 'CEO',
      department: 'Executive',
      phone: '+1 (555) 123-4567',
      joinDate: '2020-01-15',
      meProfile: 'john-smith',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@techflow.com',
      role: 'CTO',
      department: 'Technology',
      phone: '+1 (555) 123-4568',
      joinDate: '2020-03-10',
      meProfile: 'sarah-johnson',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike@techflow.com',
      role: 'Lead Developer',
      department: 'Technology',
      phone: '+1 (555) 123-4569',
      joinDate: '2021-06-20',
      meProfile: null,
      avatar: '/placeholder.svg'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: ''
  });

  const departments = ['Executive', 'Technology', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const roles = ['CEO', 'CTO', 'Manager', 'Senior Developer', 'Developer', 'Designer', 'Analyst', 'Coordinator'];

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.role) {
      const employee = {
        id: employees.length + 1,
        ...newEmployee,
        joinDate: new Date().toISOString().split('T')[0],
        meProfile: null,
        avatar: '/placeholder.svg'
      };
      setEmployees([...employees, employee]);
      setNewEmployee({ name: '', email: '', role: '', department: '', phone: '' });
      setShowAddForm(false);
      onDataChange();
    }
  };

  const handleRemoveEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    onDataChange();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
          <p className="text-gray-600">Manage your team members and their profiles</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Add Employee Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Employee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                <Input
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                <Input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Role</label>
                <Select value={newEmployee.role} onValueChange={(value) => setNewEmployee({...newEmployee, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Department</label>
                <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone (Optional)</label>
              <Input
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddEmployee} className="bg-tapinto-blue hover:bg-tapinto-blue/90">
                Add Employee
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members ({employees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback className="bg-tapinto-blue text-white">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                      <Badge variant="outline">{employee.role}</Badge>
                      <Badge variant="secondary">{employee.department}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {employee.email}
                      </span>
                      {employee.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {employee.phone}
                        </span>
                      )}
                      <span>Joined: {new Date(employee.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {employee.meProfile ? (
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-3 h-3" />
                      ME Profile
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-2 text-gray-500">
                      <Plus className="w-3 h-3" />
                      Create Profile
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleRemoveEmployee(employee.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Benefits Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Health Insurance</h4>
              <p className="text-sm text-blue-700 mt-1">Comprehensive medical coverage</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Paid Time Off</h4>
              <p className="text-sm text-green-700 mt-1">25 days annual leave</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Professional Development</h4>
              <p className="text-sm text-purple-700 mt-1">Training and conference budget</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HR Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            HR Document Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Employee Handbook</span>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Code of Conduct</span>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Benefits Guide</span>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
