'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { mockEquipments, mockOrganizations } from '@/lib/mockData';

const COLORS = ['#3b82f6','#10b981','#f97316','#ef4444','#8b5cf6','#06b6d4'];

export default function DeptBarChart({ orgName, blockName }: { orgName: string; blockName: string }) {
  const block = mockOrganizations.find(o => o.name === orgName)?.blocks.find(b => b.name === blockName);
  const data = (block?.departments || []).map((dept, i) => ({
    name: dept.name.length > 14 ? dept.name.slice(0, 14) + '…' : dept.name,
    value: mockEquipments.filter(e => e.org === orgName && e.block === blockName && e.dept === dept.name).length,
    fill: COLORS[i % COLORS.length],
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Thiết bị theo phòng ban — {blockName}</CardTitle>
        <CardDescription className="text-xs">So sánh giữa các phòng ban trong khối</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip formatter={(v) => `${v} thiết bị`} />
              <Bar dataKey="value" radius={[4,4,0,0]} isAnimationActive animationDuration={900}>{data.map((_, i) => <Cell key={i} fill={data[i].fill} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}