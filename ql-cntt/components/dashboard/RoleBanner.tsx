'use client';
import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { useRole } from '@/lib/roleContext';

export default function RoleBanner() {
  const { role, isAdmin } = useRole();
  if (isAdmin) return (
    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-6">
      <Shield className="w-4 h-4 text-amber-600" />
      <span className="text-sm font-medium text-amber-800">Super Admin: <span className="font-normal">Toàn tỉnh Khánh Hòa</span></span>
    </div>
  );
  return (
    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 mb-6">
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-800">Phạm vi truy cập: <span className="font-normal">{role.blockName} - {role.orgName}</span></span>
      </div>
      <span className="text-xs text-blue-600 font-medium">Chỉ xem dữ liệu của đơn vị mình</span>
    </div>
  );
}