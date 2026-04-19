'use client';
import React, { useState } from 'react';
import { Building2, Layers, GitBranch, Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/lib/roleContext';
import DepartmentDialog from './DepartmentDialog';

const blockColors: Record<string, { border: string; bg: string; header: string; badge: string }> = {
  'Đảng ủy': { border: 'border-orange-300', bg: 'bg-orange-50', header: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  'HĐND': { border: 'border-yellow-300', bg: 'bg-yellow-50', header: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  'UBND': { border: 'border-blue-300', bg: 'bg-blue-50', header: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  'MTTQVN': { border: 'border-green-300', bg: 'bg-green-50', header: 'text-green-700', badge: 'bg-green-100 text-green-700' },
};
const defaultColor = { border: 'border-slate-300', bg: 'bg-slate-50', header: 'text-slate-700', badge: 'bg-slate-100 text-slate-700' };

type Dept = { id: number; name: string };
type Block = { id: number; name: string; departments: Dept[] };
type Org = { id: number; name: string; province: string; blocks: Block[] };

export default function OrgDetail({ org, onUpdateOrg }: { org: Org | null; onUpdateOrg: (org: Org) => void }) {
  const { isAdmin, role } = useRole();
  const [deptDialog, setDeptDialog] = useState<{ open: boolean; blockId: number | null; dept: Dept | null }>({ open: false, blockId: null, dept: null });

  if (!org) return (
    <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
      <Building2 className="w-12 h-12 mb-3 opacity-30" />
      <p className="text-sm">Chọn một đơn vị để xem chi tiết</p>
    </div>
  );

  const totalDepts = org.blocks.reduce((s, b) => s + b.departments.length, 0);

  const handleDeleteDept = (blockId: number, deptId: number) => {
    onUpdateOrg({ ...org, blocks: org.blocks.map(b => b.id === blockId ? { ...b, departments: b.departments.filter(d => d.id !== deptId) } : b) });
  };

  const handleSaveDept = (blockId: number, deptData: { id: number | null; name: string }) => {
    onUpdateOrg({
      ...org, blocks: org.blocks.map(b => {
        if (b.id !== blockId) return b;
        if (deptData.id) return { ...b, departments: b.departments.map(d => d.id === deptData.id ? { ...d, name: deptData.name } : d) };
        return { ...b, departments: [...b.departments, { id: Math.max(0, ...b.departments.map(d => d.id)) + 1, name: deptData.name }] };
      })
    });
    setDeptDialog({ open: false, blockId: null, dept: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center"><Building2 className="w-7 h-7 text-slate-500" /></div>
        <div>
          <h2 className="text-xl font-bold">{org.name}</h2>
          <p className="text-sm text-muted-foreground">Tỉnh {org.province}</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" />{org.blocks.length} Khối</span>
            <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" />{totalDepts} Phòng ban</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Cấu trúc tổ chức</h3>
        <div className="space-y-4">
          {(isAdmin ? org.blocks : org.blocks.filter(b => b.id === role.blockId)).map(block => {
            const colors = blockColors[block.name] || defaultColor;
            return (
              <div key={block.id} className={`border ${colors.border} rounded-xl overflow-hidden`}>
                <div className={`${colors.bg} px-4 py-3 flex items-center justify-between`}>
                  <h4 className={`font-bold text-sm ${colors.header}`}>{block.name}</h4>
                  <Badge className={`text-xs ${colors.badge}`}>{block.departments.length} phòng ban</Badge>
                </div>
                <div className="divide-y">
                  {block.departments.map(dept => (
                    <div key={dept.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition group">
                      <div className="flex items-center gap-2.5"><GitBranch className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{dept.name}</span></div>
                      {isAdmin && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                          <button onClick={() => setDeptDialog({ open: true, blockId: block.id, dept })} className="p-1.5 rounded-md hover:bg-muted"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
                          <button onClick={() => handleDeleteDept(block.id, dept.id)} className="p-1.5 rounded-md hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                        </div>
                      )}
                    </div>
                  ))}
                  {(isAdmin || role.blockId === block.id) && (
                    <button onClick={() => setDeptDialog({ open: true, blockId: block.id, dept: null })} className="flex items-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-primary/5 transition w-full">
                      <Plus className="w-4 h-4" />Thêm phòng ban
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {deptDialog.open && deptDialog.blockId && (
        <DepartmentDialog blockId={deptDialog.blockId} blocks={org.blocks} dept={deptDialog.dept} onSave={handleSaveDept} onClose={() => setDeptDialog({ open: false, blockId: null, dept: null })} />
      )}
    </div>
  );
}