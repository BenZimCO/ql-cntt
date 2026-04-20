'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Tổng quan', icon: LayoutDashboard },
  { path: '/organizations', label: 'Cơ quan / Đơn vị', icon: Building2 },
];

export default function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const pathname = usePathname();
  return (
    <aside className={cn(
      'fixed left-0 top-0 bottom-0 z-40 flex flex-col transition-all duration-300 bg-sidebar text-sidebar-foreground',
      collapsed ? 'w-16' : 'w-60'
    )}>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-bold text-sm">Q</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-white truncate">Quản lý CNTT</p>
            <p className="text-xs text-slate-400 truncate">Tỉnh Khánh Hòa</p>
          </div>
        )}
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
              isActive ? 'bg-primary text-primary-foreground shadow-md' : 'text-slate-400 hover:bg-sidebar-accent hover:text-white'
            )}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-2 px-4 py-3 border-t border-sidebar-border text-slate-400 hover:text-white text-sm transition-colors">
        {collapsed ? <ChevronRight className="w-4 h-4 mx-auto" /> : <><ChevronLeft className="w-4 h-4" /><span>Thu gọn</span></>}
      </button>
    </aside>
  );
}