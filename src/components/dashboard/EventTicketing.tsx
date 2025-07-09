
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Ticket, 
  Users, 
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  QrCode,
  Mail,
  Share2,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Settings
} from 'lucide-react';

export function EventTicketing() {
  const [activeTab, setActiveTab] = useState('overview');

  const events = [
    {
      id: 1,
      name: 'TAPinto Business Summit 2024',
      date: '2024-02-15',
      time: '09:00',
      venue: 'London Convention Center',
      ticketsSold: 247,
      totalTickets: 500,
      revenue: 12350,
      status: 'Live'
    },
    {
      id: 2,
      name: 'Digital Marketing Workshop',
      date: '2024-02-28',
      time: '14:00',
      venue: 'Online',
      ticketsSold: 89,
      totalTickets: 150,
      revenue: 2670,
      status: 'Selling'
    },
    {
      id: 3,
      name: 'Final Friday Networking',
      date: '2024-01-26',
      time: '18:00',
      venue: 'Manchester Business Hub',
      ticketsSold: 156,
      totalTickets: 200,
      revenue: 3900,
      status: 'Completed'
    }
  ];

  const ticketTypes = [
    { name: 'Early Bird', price: 35, sold: 89, limit: 100, color: 'bg-green-100 text-green-800' },
    { name: 'Standard', price: 50, sold: 124, limit: 300, color: 'bg-blue-100 text-blue-800' },
    { name: 'VIP', price: 99, sold: 23, limit: 50, color: 'bg-purple-100 text-purple-800' },
    { name: 'Group (5+)', price: 40, sold: 15, limit: 50, color: 'bg-orange-100 text-orange-800' }
  ];

  const recentSales = [
    { id: '#T001', customer: 'Sarah Johnson', event: 'Business Summit', type: 'VIP', amount: 99, time: '2 hours ago' },
    { id: '#T002', customer: 'Mike Chen', event: 'Digital Workshop', type: 'Standard', amount: 50, time: '4 hours ago' },
    { id: '#T003', customer: 'Emma Davis', event: 'Business Summit', type: 'Early Bird', amount: 35, time: '6 hours ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event & Ticketing</h1>
          <p className="text-gray-600 mt-1">Manage your events, tickets, and attendee experience</p>
        </div>
        <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">£18,920</p>
                    <p className="text-sm text-green-600">+23% this month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
                    <p className="text-2xl font-bold">492</p>
                    <p className="text-sm text-blue-600">58% capacity</p>
                  </div>
                  <Ticket className="w-8 h-8 text-tapinto-blue" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Events</p>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-orange-600">1 upcoming</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-yellow-600">From attendees</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.filter(event => event.status !== 'Completed').map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.venue}
                          </div>
                        </div>
                      </div>
                      <Badge className={
                        event.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {event.ticketsSold}/{event.totalTickets} tickets sold
                        </p>
                        <Progress value={(event.ticketsSold / event.totalTickets) * 100} className="w-32 mt-1" />
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">£{event.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Ticket Sales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{sale.id} - {sale.customer}</p>
                      <p className="text-sm text-gray-600">{sale.event} • {sale.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{sale.amount}</p>
                      <p className="text-xs text-gray-500">{sale.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Event Management</CardTitle>
                <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
                  <Plus className="w-4 h-4" />
                  Create Event
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{event.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{event.date} at {event.time}</span>
                            <span>•</span>
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge className={
                              event.status === 'Live' ? 'bg-green-100 text-green-800' :
                              event.status === 'Selling' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {event.status}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {event.ticketsSold}/{event.totalTickets} sold
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Types & Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ticketTypes.map((ticket, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{ticket.name}</h3>
                        <p className="text-2xl font-bold text-tapinto-blue">£{ticket.price}</p>
                      </div>
                      <Badge className={ticket.color}>
                        {ticket.sold}/{ticket.limit} sold
                      </Badge>
                    </div>
                    <Progress value={(ticket.sold / ticket.limit) * 100} className="mb-2" />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{Math.round((ticket.sold / ticket.limit) * 100)}% sold</span>
                      <span>{ticket.limit - ticket.sold} remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendees" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attendee Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <QrCode className="w-4 h-4 mr-1" />
                    Check-in
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-1" />
                    Send Update
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="w-8 h-8 text-tapinto-blue mx-auto mb-2" />
                    <p className="text-2xl font-bold">492</p>
                    <p className="text-sm text-gray-600">Total Attendees</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <QrCode className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">347</p>
                    <p className="text-sm text-gray-600">Checked In</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </div>
                </div>
                <p className="text-gray-600">Detailed attendee list and management interface would go here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Sales Performance</h4>
                  <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Attendee Demographics</h4>
                  <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Integration Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>Calendar Sync</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <span>Email Automation</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-5 h-5" />
                        <span>Social Sharing</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Final Fridays Integration</h4>
                  <p className="text-sm text-gray-600">Automatically create Final Friday networking events</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
