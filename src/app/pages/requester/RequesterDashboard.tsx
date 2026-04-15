import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Slider } from '../../components/ui/slider';
import { Badge } from '../../components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { RoomCard } from '../../components/shared/RoomCard';
import { mockRooms } from '../../data/mockData';

export function RequesterDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [capacity, setCapacity] = useState([0]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const allFacilities = Array.from(new Set(mockRooms.flatMap(room => room.facilities)));

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || room.type === selectedType;
    const matchesCapacity = room.capacity >= capacity[0];
    const matchesFacilities = selectedFacilities.length === 0 ||
                             selectedFacilities.every(f => room.facilities.includes(f));

    return matchesSearch && matchesType && matchesCapacity && matchesFacilities;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setCapacity([0]);
    setSelectedFacilities([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find & Book Rooms</h1>
          <p className="text-gray-600 mt-1">Search and reserve rooms and labs for your needs</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by room name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-[#2563eb]' : ''}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              {/* Room Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">Room Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="lab">Lab</SelectItem>
                    <SelectItem value="classroom">Classroom</SelectItem>
                    <SelectItem value="auditorium">Auditorium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Capacity */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Minimum Capacity: {capacity[0]}
                </label>
                <Slider
                  value={capacity}
                  onValueChange={setCapacity}
                  max={500}
                  step={10}
                  className="mt-2"
                />
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button variant="ghost" onClick={clearFilters} className="w-full">
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>

              {/* Facilities */}
              <div className="md:col-span-3">
                <label className="text-sm font-medium mb-2 block">Facilities</label>
                <div className="flex flex-wrap gap-2">
                  {allFacilities.map(facility => (
                    <Badge
                      key={facility}
                      variant={selectedFacilities.includes(facility) ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        selectedFacilities.includes(facility) ? 'bg-[#2563eb]' : ''
                      }`}
                      onClick={() => toggleFacility(facility)}
                    >
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Available Rooms ({filteredRooms.length})
            </h2>
          </div>

          {filteredRooms.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
              <p className="text-gray-600">Try adjusting your filters to find more results</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onViewDetails={() => navigate(`/requester/rooms/${room.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate('/requester/bookings')}
            >
              📋 View My Bookings
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => setSelectedType('lab')}
            >
              🔬 Browse Labs
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => setSelectedType('auditorium')}
            >
              🎭 Browse Auditoriums
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
