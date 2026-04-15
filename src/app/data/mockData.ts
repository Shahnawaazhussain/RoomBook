export interface Room {
  id: string;
  name: string;
  type: 'lab' | 'classroom' | 'auditorium';
  capacity: number;
  location: string;
  facilities: string[];
  status: 'available' | 'disabled';
  image?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'approver' | 'requester';
  status: 'active' | 'blocked';
  createdAt: string;
}

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Computer Lab A',
    type: 'lab',
    capacity: 40,
    location: 'Building A, 2nd Floor',
    facilities: ['Projector', 'Computers', 'AC', 'Whiteboard'],
    status: 'available',
  },
  {
    id: '2',
    name: 'Computer Lab B',
    type: 'lab',
    capacity: 30,
    location: 'Building A, 3rd Floor',
    facilities: ['Projector', 'Computers', 'AC'],
    status: 'available',
  },
  {
    id: '3',
    name: 'Lecture Hall 101',
    type: 'classroom',
    capacity: 100,
    location: 'Building B, Ground Floor',
    facilities: ['Projector', 'Sound System', 'AC', 'Whiteboard'],
    status: 'available',
  },
  {
    id: '4',
    name: 'Seminar Room 201',
    type: 'classroom',
    capacity: 50,
    location: 'Building C, 2nd Floor',
    facilities: ['Projector', 'AC', 'Whiteboard', 'WiFi'],
    status: 'available',
  },
  {
    id: '5',
    name: 'Main Auditorium',
    type: 'auditorium',
    capacity: 500,
    location: 'Building D, Ground Floor',
    facilities: ['Stage', 'Sound System', 'Projector', 'AC', 'Green Room'],
    status: 'available',
  },
  {
    id: '6',
    name: 'Physics Lab',
    type: 'lab',
    capacity: 25,
    location: 'Building E, 1st Floor',
    facilities: ['Lab Equipment', 'Safety Gear', 'Whiteboard'],
    status: 'available',
  },
  {
    id: '7',
    name: 'Chemistry Lab',
    type: 'lab',
    capacity: 30,
    location: 'Building E, 2nd Floor',
    facilities: ['Lab Equipment', 'Safety Gear', 'Fume Hood', 'Emergency Shower'],
    status: 'available',
  },
  {
    id: '8',
    name: 'Mini Auditorium',
    type: 'auditorium',
    capacity: 150,
    location: 'Building C, 3rd Floor',
    facilities: ['Projector', 'Sound System', 'AC'],
    status: 'available',
  },
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    roomId: '1',
    roomName: 'Computer Lab A',
    requesterId: '3',
    requesterName: 'Jane Student',
    requesterEmail: 'requester@university.edu',
    date: '2026-04-20',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Python Programming Workshop',
    status: 'pending',
    createdAt: '2026-04-14T08:30:00',
  },
  {
    id: '2',
    roomId: '3',
    roomName: 'Lecture Hall 101',
    requesterId: '3',
    requesterName: 'Jane Student',
    requesterEmail: 'requester@university.edu',
    date: '2026-04-18',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Guest Lecture on AI',
    status: 'approved',
    createdAt: '2026-04-12T10:00:00',
  },
  {
    id: '3',
    roomId: '5',
    roomName: 'Main Auditorium',
    requesterId: '4',
    requesterName: 'Mike Johnson',
    requesterEmail: 'mike@university.edu',
    date: '2026-04-15',
    startTime: '09:00',
    endTime: '17:00',
    purpose: 'Annual Tech Fest',
    status: 'rejected',
    remarks: 'Already booked for administrative event',
    createdAt: '2026-04-10T15:20:00',
  },
  {
    id: '4',
    roomId: '2',
    roomName: 'Computer Lab B',
    requesterId: '5',
    requesterName: 'Sarah Williams',
    requesterEmail: 'sarah@university.edu',
    date: '2026-04-22',
    startTime: '15:00',
    endTime: '17:00',
    purpose: 'Web Development Session',
    status: 'pending',
    createdAt: '2026-04-14T09:15:00',
  },
  {
    id: '5',
    roomId: '4',
    roomName: 'Seminar Room 201',
    requesterId: '3',
    requesterName: 'Jane Student',
    requesterEmail: 'requester@university.edu',
    date: '2026-04-25',
    startTime: '11:00',
    endTime: '13:00',
    purpose: 'Project Presentation',
    status: 'approved',
    createdAt: '2026-04-13T14:45:00',
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-15T00:00:00',
  },
  {
    id: '2',
    name: 'John Approver',
    email: 'approver@university.edu',
    role: 'approver',
    status: 'active',
    createdAt: '2025-02-20T00:00:00',
  },
  {
    id: '3',
    name: 'Jane Student',
    email: 'requester@university.edu',
    role: 'requester',
    status: 'active',
    createdAt: '2025-09-01T00:00:00',
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike@university.edu',
    role: 'requester',
    status: 'active',
    createdAt: '2025-09-01T00:00:00',
  },
  {
    id: '5',
    name: 'Sarah Williams',
    email: 'sarah@university.edu',
    role: 'requester',
    status: 'active',
    createdAt: '2025-09-05T00:00:00',
  },
  {
    id: '6',
    name: 'David Brown',
    email: 'david@university.edu',
    role: 'requester',
    status: 'blocked',
    createdAt: '2025-09-10T00:00:00',
  },
  {
    id: '7',
    name: 'Emily Davis',
    email: 'emily@university.edu',
    role: 'approver',
    status: 'active',
    createdAt: '2025-03-15T00:00:00',
  },
];

export const facilityIcons: Record<string, string> = {
  'Projector': '📽️',
  'Computers': '💻',
  'AC': '❄️',
  'Whiteboard': '🖊️',
  'Sound System': '🔊',
  'WiFi': '📶',
  'Stage': '🎭',
  'Lab Equipment': '🔬',
  'Safety Gear': '🦺',
  'Fume Hood': '🌫️',
  'Emergency Shower': '🚿',
  'Green Room': '🚪',
};
