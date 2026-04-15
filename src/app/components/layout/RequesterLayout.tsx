import { useState } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';

export function RequesterLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showMenuButton={false} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
