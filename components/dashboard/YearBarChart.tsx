'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockChartByYear } from '@/lib/mockData';

export default function YearBarChart() {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Số lượng thiết bị theo năm mua</CardTitle></CardHeader>
      <CardContent>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
            <BarChart data={mockChartByYear} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()} />
              <Tooltip formatter={(v) => typeof v === 'number' ? v.toLocaleString() : v} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4,4,0,0]} isAnimationActive animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}