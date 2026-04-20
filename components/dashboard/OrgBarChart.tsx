'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { mockChartByOrg } from '@/lib/mockData';

const COLORS = ['#3b82f6','#f97316','#10b981','#ef4444','#8b5cf6','#06b6d4','#f59e0b','#ec4899'];

export default function OrgBarChart() {
  const data = mockChartByOrg.map((item, i) => ({ ...item, fill: COLORS[i % COLORS.length] }));
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Thiết bị theo đơn vị</CardTitle>
        <CardDescription className="text-xs">So sánh số lượng giữa các xã/phường/sở/ngành</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
            <BarChart data={data} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={50} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => typeof v === 'number' ? v.toLocaleString() : v} />
              <Bar dataKey="value" radius={[4,4,0,0]} isAnimationActive animationDuration={900}>{data.map((_, i) => <Cell key={i} fill={data[i].fill} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}