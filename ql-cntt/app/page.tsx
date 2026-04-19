'use client';
import React from 'react';
import { Monitor, Building2, DollarSign, CheckCircle, AlertTriangle, Wrench } from 'lucide-react';
import { useRole } from '@/lib/roleContext';
import { mockStats, mockEquipments } from '@/lib/mockData';
import RoleBanner from '@/components/dashboard/RoleBanner';
import StatCard from '@/components/dashboard/StatCard';
import GroupPieChart from '@/components/dashboard/GroupPieChart';
import YearBarChart from '@/components/dashboard/YearBarChart';
import OrgBarChart from '@/components/dashboard/OrgBarChart';
import BlockHorizontalChart from '@/components/dashboard/BlockHorizontalChart';
import DeptBarChart from '@/components/dashboard/DeptBarChart';
import OrgBlockChart from '@/components/dashboard/OrgBlockChart';
import EquipmentTable from '@/components/dashboard/EquipmentTable';

export default function DashboardPage() {
  const { role, isAdmin } = useRole();

  const stats = isAdmin ? mockStats : (() => {
    const f = mockEquipments.filter(e => e.org === role.orgName && e.block === role.blockName);
    const total = f.length;
    const active = f.filter(e => e.status === 'Đang sử dụng').length;
    const broken = f.filter(e => e.status === 'Hỏng').length;
    const maint = f.filter(e => e.status === 'Bảo trì').length;
    return {
      totalEquipments: total, totalOrgs: 1,
      totalValue: f.reduce((s, e) => s + e.price, 0),
      activeCount: active, activePercent: total ? +((active/total)*100).toFixed(1) : 0,
      brokenCount: broken, brokenPercent: total ? +((broken/total)*100).toFixed(1) : 0,
      maintenanceCount: maint, maintenancePercent: total ? +((maint/total)*100).toFixed(1) : 0,
    };
  })();

  const fmt = (v: number) => v >= 1e9 ? `${(v/1e9).toFixed(1)} tỷ` : v >= 1e6 ? `${(v/1e6).toFixed(1)} triệu` : v.toLocaleString('vi-VN');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tổng quan</h1>
      <RoleBanner />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Tổng thiết bị" value={stats.totalEquipments.toLocaleString('vi-VN')} subtitle={isAdmin ? 'Tất cả đơn vị' : 'Trong khối của bạn'} icon={Monitor} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title={isAdmin ? 'Đơn vị' : 'Khối'} value={isAdmin ? String(stats.totalOrgs) : '1'} subtitle={isAdmin ? 'Xã/Phường/Sở/ngành' : role.blockName!} icon={Building2} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="Tổng giá trị" value={fmt(stats.totalValue)} subtitle="VNĐ" icon={DollarSign} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="Đang sử dụng" value={stats.activeCount.toLocaleString('vi-VN')} subtitle={`${stats.activePercent}%`} icon={CheckCircle} iconBg="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Hỏng" value={stats.brokenCount.toLocaleString('vi-VN')} subtitle={`${stats.brokenPercent}%`} icon={AlertTriangle} iconBg="bg-red-50" iconColor="text-red-600" />
        <StatCard title="Bảo trì" value={stats.maintenanceCount.toLocaleString('vi-VN')} subtitle={`${stats.maintenancePercent}%`} icon={Wrench} iconBg="bg-amber-50" iconColor="text-amber-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isAdmin ? <><OrgBarChart /><BlockHorizontalChart /></> : <><DeptBarChart orgName={role.orgName!} blockName={role.blockName!} /><OrgBlockChart orgName={role.orgName!} /></>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GroupPieChart /><YearBarChart />
      </div>
      <EquipmentTable />
    </div>
  );
}