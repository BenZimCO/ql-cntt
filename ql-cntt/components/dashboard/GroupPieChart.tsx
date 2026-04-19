'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { mockChartByGroup } from '@/lib/mockData';

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6'];

export default function GroupPieChart() {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Phân bổ theo nhóm thiết bị</CardTitle></CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={mockChartByGroup} cx="50%" cy="45%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" isAnimationActive animationDuration={900} animationBegin={100}>
                {mockChartByGroup.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => typeof v === 'number' ? v.toLocaleString() : v} />
              <Legend verticalAlign="bottom" iconSize={10} wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}