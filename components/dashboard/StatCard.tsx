import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, iconBg, iconColor }: {
  title: string; value: string; subtitle?: string; icon: LucideIcon; iconBg: string; iconColor: string;
}) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
}