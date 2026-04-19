'use client';
import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/lib/roleContext';
import RoleSwitcher from './RoleSwitcher';

export default function Header() {
  const { role, isAdmin } = useRole();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const displayName = isAdmin ? 'Nguyễn Văn Tĩnh' : 'Trần Thị Phương';
  const displayRole = isAdmin ? 'Super Admin' : 'Đơn vị';
  const displayScope = isAdmin ? 'Toàn tỉnh Khánh Hòa' : `${role.blockName} - ${role.orgName}`;

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Tìm kiếm..." className="w-full pl-9 pr-4 py-2 bg-secondary rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 transition" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-secondary transition">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <button onClick={() => setShowRoleSwitcher(true)} className="flex items-center gap-3 cursor-pointer hover:bg-secondary rounded-lg px-2 py-1.5 transition">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm ${isAdmin ? 'bg-amber-500' : 'bg-primary'}`}>
              {displayName.split(' ').pop()![0]}
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-muted-foreground">{displayScope}</p>
            </div>
            <Badge className={`text-xs ${isAdmin ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : 'bg-blue-100 text-blue-700 hover:bg-blue-100'}`}>{displayRole}</Badge>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </header>
      {showRoleSwitcher && <RoleSwitcher onClose={() => setShowRoleSwitcher(false)} />}
    </>
  );
}