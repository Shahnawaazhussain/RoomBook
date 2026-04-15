import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { KPICard } from '../../components/shared/KPICard';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Button } from '../../components/ui/button';
import { FileText, CheckCircle, DoorOpen, Clock } from 'lucide-react';
import { mockBookings, mockRooms } from '../../data/mockData';

export function ApproverDashboard() {
  const pendingRequests = mockBookings.filter(b => b.status === 'pending');
  const approvedToday = mockBookings.filter(b => 
    b.status === 'approved' && 
    new Date(b.createdAt).toDateString() === new Date().toDateString()
  );
  const activeRooms = mockRooms.filter(r => r.status === 'available');

  const recentRequests = mockBookings.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of booking requests and room management</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Pending Requests"
          value={pendingRequests.length}
          icon={Clock}
          trend="+3 from yesterday"
          trendUp={false}
        />
        <KPICard
          title="Approved Today"
          value={approvedToday.length}
          icon={CheckCircle}
          trend="+12% from last week"
          trendUp={true}
        />
        <KPICard
          title="Active Rooms"
          value={activeRooms.length}
          icon={DoorOpen}
        />
        <KPICard
          title="Total Requests"
          value={mockBookings.length}
          icon={FileText}
          trend="+8% this month"
          trendUp={true}
        />
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Booking Requests</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requester</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.requesterName}</p>
                        <p className="text-xs text-gray-500">{request.requesterEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{request.roomName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(request.date).toLocaleDateString()}</p>
                        <p className="text-gray-500">{request.startTime} - {request.endTime}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{request.purpose}</TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Room Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['lab', 'classroom', 'auditorium'].map(type => {
                const count = mockRooms.filter(r => r.type === type).length;
                const percentage = (count / mockRooms.length) * 100;
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{type}s</span>
                      <span className="text-sm text-gray-600">{count} rooms</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2563eb] rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Request Status */}
        <Card>
          <CardHeader>
            <CardTitle>Request Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { status: 'pending', label: 'Pending', color: 'bg-yellow-500' },
                { status: 'approved', label: 'Approved', color: 'bg-green-500' },
                { status: 'rejected', label: 'Rejected', color: 'bg-red-500' },
              ].map(item => {
                const count = mockBookings.filter(b => b.status === item.status).length;
                const percentage = (count / mockBookings.length) * 100;
                return (
                  <div key={item.status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-gray-600">{count} requests</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
