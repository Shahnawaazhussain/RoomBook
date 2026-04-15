import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Calendar } from '../../components/ui/calendar';
import { ArrowLeft, Users, MapPin, Layers, Calendar as CalendarIcon } from 'lucide-react';
import { mockRooms } from '../../data/mockData';
import { toast } from 'sonner';

export function RoomDetailsPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [purpose, setPurpose] = useState('');

  const room = mockRooms.find(r => r.id === roomId);

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Room not found</h2>
          <Button onClick={() => navigate('/requester')}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!selectedDate || !startTime || !endTime || !purpose) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Booking request submitted successfully!');
    setShowBookingModal(false);
    navigate('/requester/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/requester')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Room Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl">{room.name}</CardTitle>
                    <p className="text-gray-600 mt-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {room.location}
                    </p>
                  </div>
                  <Badge variant={room.status === 'available' ? 'default' : 'secondary'} className="text-lg px-4 py-1">
                    {room.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">Capacity</span>
                    </div>
                    <p className="text-2xl font-bold">{room.capacity}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Layers className="w-5 h-5" />
                      <span className="text-sm">Type</span>
                    </div>
                    <p className="text-2xl font-bold capitalize">{room.type}</p>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="font-semibold mb-3">Available Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {room.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-3">About this room</h3>
                  <p className="text-gray-600">
                    {room.type === 'lab' && `This ${room.name} is equipped with modern facilities and can accommodate up to ${room.capacity} students. Perfect for hands-on learning and practical sessions.`}
                    {room.type === 'classroom' && `This spacious classroom provides a comfortable learning environment for up to ${room.capacity} students. Ideal for lectures, seminars, and workshops.`}
                    {room.type === 'auditorium' && `This ${room.name} is designed for large-scale events and can host up to ${room.capacity} attendees. Perfect for conferences, seminars, and cultural events.`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Book this Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <CalendarIcon className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-sm text-blue-900">
                    Select your preferred date and time to book this room
                  </p>
                </div>

                <Button
                  onClick={() => setShowBookingModal(true)}
                  disabled={room.status !== 'available'}
                  className="w-full bg-[#2563eb] hover:bg-[#1e40af]"
                >
                  {room.status === 'available' ? 'Book Now' : 'Unavailable'}
                </Button>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Booking requests are subject to approval</p>
                  <p>• You will be notified via email</p>
                  <p>• Cancel anytime before 24 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Availability Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Today</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tomorrow</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Limited</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book {room.name}</DialogTitle>
            <DialogDescription>Fill in the details to submit your booking request</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Calendar */}
            <div>
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <Label htmlFor="purpose">Purpose of Booking</Label>
              <Textarea
                id="purpose"
                placeholder="Describe the purpose of your booking..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleBooking} className="bg-[#2563eb] hover:bg-[#1e40af]">
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
