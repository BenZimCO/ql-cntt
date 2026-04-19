'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={cn('transition-all duration-300', collapsed ? 'ml-16' : 'ml-60')}>
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}