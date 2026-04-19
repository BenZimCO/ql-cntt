'use client';
import React from 'react';
import { Building2, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const typeColors: Record<string, string> = {
  'Xã/Phường': 'bg-blue-100 text-blue-700',
  'Sở/Ngành': 'bg-orange-100 text-orange-700',
  'Đặc khu': 'bg-purple-100 text-purple-700',
};

type Org = { id: number; name: string; type: string; blocks: { id: number; departments: unknown[] }[] };

export default function OrgList({ orgs, selectedId, onSelect, isAdmin, onEdit, onDelete }: {
  orgs: Org[]; selectedId: number | null; onSelect: (id: number) => void;
  isAdmin: boolean; onEdit: (org: Org) => void; onDelete: (id: number) => void;
}) {
  const totalDepts = (org: Org) => org.blocks.reduce((s, b) => s + b.departments.length, 0);
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground mb-3">{orgs.length} đơn vị</p>
      {orgs.map(org => (
        <div key={org.id} onClick={() => onSelect(org.id)} className={cn('w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer group', selectedId === org.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-transparent hover:border-border hover:bg-muted/50')}>
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0"><Building2 className="w-5 h-5 text-slate-500" /></div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{org.name}</p>
            <Badge className={`text-[10px] mt-0.5 ${typeColors[org.type] || 'bg-gray-100 text-gray-600'}`}>{org.type}</Badge>
            <p className="text-xs text-muted-foreground mt-0.5">{org.blocks.length} khối · {totalDepts(org)} phòng ban</p>
          </div>
          {isAdmin ? (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0" onClick={e => e.stopPropagation()}>
              <button onClick={() => onEdit(org)} className="p-1.5 rounded-md hover:bg-muted"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
              <button onClick={() => onDelete(org.id)} className="p-1.5 rounded-md hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
            </div>
          ) : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        </div>
      ))}
    </div>
  );
}