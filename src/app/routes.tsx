import { createBrowserRouter, Navigate } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RequesterLayout } from './components/layout/RequesterLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth
import { LoginPage } from './pages/auth/LoginPage';

// Requester Pages
import { RequesterDashboard } from './pages/requester/RequesterDashboard';
import { RoomDetailsPage } from './pages/requester/RoomDetailsPage';
import { MyBookingsPage } from './pages/requester/MyBookingsPage';

// Approver Pages
import { ApproverDashboard } from './pages/approver/ApproverDashboard';
import { RequestsManagementPage } from './pages/approver/RequestsManagementPage';
import { RoomsManagementPage } from './pages/approver/RoomsManagementPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagementPage } from './pages/admin/UserManagementPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  // Requester Routes
  {
    path: '/requester',
    element: (
      <ProtectedRoute allowedRoles={['requester']}>
        <RequesterLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <RequesterDashboard />,
      },
      {
        path: 'rooms/:roomId',
        element: <RoomDetailsPage />,
      },
      {
        path: 'bookings',
        element: <MyBookingsPage />,
      },
    ],
  },
  // Approver Routes
  {
    path: '/approver',
    element: (
      <ProtectedRoute allowedRoles={['approver']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ApproverDashboard />,
      },
      {
        path: 'requests',
        element: <RequestsManagementPage />,
      },
      {
        path: 'rooms',
        element: <RoomsManagementPage />,
      },
      {
        path: 'settings',
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600 mt-2">Settings page coming soon...</p>
          </div>
        ),
      },
    ],
  },
  // Admin Routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'users',
        element: <UserManagementPage />,
      },
      {
        path: 'rooms',
        element: <RoomsManagementPage />,
      },
      {
        path: 'requests',
        element: <RequestsManagementPage />,
      },
      {
        path: 'settings',
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600 mt-2">Settings page coming soon...</p>
          </div>
        ),
      },
    ],
  },
  // 404 Not Found
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <a href="/login" className="text-[#2563eb] hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    ),
  },
]);
