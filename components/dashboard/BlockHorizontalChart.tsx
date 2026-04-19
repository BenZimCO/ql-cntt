'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockChartByBlock } from '@/lib/mockData';

export default function BlockHorizontalChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Thiết bị theo khối (toàn tỉnh)</CardTitle>
        <CardDescription className="text-xs">Tổng hợp theo khối trên tất cả đơn vị</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockChartByBlock} layout="vertical" barSize={24}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={80} />
              <Tooltip formatter={(v) => typeof v === 'number' ? v.toLocaleString() : v} />
              <Bar dataKey="value" fill="#0ea5e9" radius={[0,4,4,0]} isAnimationActive animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}