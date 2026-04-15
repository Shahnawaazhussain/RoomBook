import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Users, MapPin, Layers } from 'lucide-react';
import { Room } from '../../data/mockData';

interface RoomCardProps {
  room: Room;
  onViewDetails?: () => void;
  showActions?: boolean;
}

export function RoomCard({ room, onViewDetails, showActions = true }: RoomCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{room.name}</CardTitle>
          <Badge variant={room.status === 'available' ? 'default' : 'secondary'}>
            {room.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Capacity: {room.capacity}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{room.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Layers className="w-4 h-4" />
          <span className="capitalize">{room.type}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {room.facilities.slice(0, 3).map((facility, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {facility}
            </Badge>
          ))}
          {room.facilities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{room.facilities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      {showActions && (
        <CardFooter>
          <Button onClick={onViewDetails} className="w-full bg-[#2563eb] hover:bg-[#1e40af]">
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
