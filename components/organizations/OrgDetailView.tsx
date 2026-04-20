'use client';
import React, { useState } from 'react';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DepartmentDialog from './DepartmentDialog';

const blockColors: Record<string, string> = {
  'Đảng ủy': 'bg-red-100 text-red-700',
  'HĐND': 'bg-orange-100 text-orange-700',
  'UBND': 'bg-blue-100 text-blue-700',
  'MTTQVN': 'bg-green-100 text-green-700',
};

type Dept = { id: number; name: string };
type Block = { id: number; name: string; departments: Dept[] };
type Org = { id: number; name: string; province: string; blocks: Block[] };

export default function OrgDetailView({ org, onBack, onUpdateOrg, isAdmin, currentBlockName }: {
  org: Org; onBack: () => void; onUpdateOrg: (org: Org) => void; isAdmin: boolean; currentBlockName?: string;
}) {
  const [deptDialog, setDeptDialog] = useState<{ open: boolean; blockId: number | null; dept: Dept | null }>({ open: false, blockId: null, dept: null });

  const displayedBlocks = currentBlockName
    ? org.blocks.filter(b => b.name === currentBlockName)
    : (isAdmin ? org.blocks : []);
  const totalDepts = displayedBlocks.reduce((s, b) => s + b.departments.length, 0);
  const firstBlock = displayedBlocks[0];
  const blockLabel = isAdmin
    ? displayedBlocks.length > 1 ? 'Nhiều khối' : firstBlock?.name ?? ''
    : firstBlock?.name ?? '';

  const handleDeleteDept = (blockId: number, deptId: number) => {
    onUpdateOrg({ ...org, blocks: org.blocks.map(b => b.id === blockId ? { ...b, departments: b.departments.filter(d => d.id !== deptId) } : b) });
  };

  const handleSaveDept = (blockId: number, deptData: { id: number | null; name: string }) => {
    onUpdateOrg({
      ...org, blocks: org.blocks.map(b => {
        if (b.id !== blockId) return b;
        if (deptData.id) return { ...b, departments: b.departments.map(d => d.id === deptData.id ? { ...d, name: deptData.name } : d) };
        const newId = Math.max(0, ...b.departments.map(d => d.id)) + 1;
        return { ...b, departments: [...b.departments, { id: newId, name: deptData.name }] };
      }),
    });
    setDeptDialog({ open: false, blockId: null, dept: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-muted transition"><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-xl font-bold">{org.name}</h1>
          <p className="text-sm text-muted-foreground">{org.province}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Tên cơ quan</p><p className="font-semibold text-sm">{org.name}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Tỉnh</p><p className="text-sm text-primary font-medium">{org.province}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Khối</p>{blockLabel && <Badge className={`text-xs ${blockColors[firstBlock?.name ?? ''] || 'bg-slate-100 text-slate-700'}`}>{blockLabel}</Badge>}</div>
        <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Số phòng ban</p><p className="font-semibold text-sm">{totalDepts} phòng</p></div>
      </div>

      {displayedBlocks.length === 0 ? (
        <div className="bg-card rounded-xl border px-6 py-10 text-center text-sm text-muted-foreground">Không có khối phù hợp để hiển thị.</div>
      ) : displayedBlocks.map(block => (
        <div key={block.id} className="bg-card rounded-xl border">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-sm">Danh sách phòng ban</h2>
              <Badge className={`text-xs ${blockColors[block.name] || 'bg-slate-100 text-slate-700'}`}>{block.name}</Badge>
            </div>
            {isAdmin && (
              <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800 text-white h-8" onClick={() => setDeptDialog({ open: true, blockId: block.id, dept: null })}>
                <Plus className="w-3.5 h-3.5" />Thêm phòng ban
              </Button>
            )}
          </div>
          <div className="grid grid-cols-[60px_1fr_100px] px-6 py-3 border-b bg-muted/30 text-xs font-medium text-muted-foreground">
            <span>STT</span><span>Tên phòng ban</span><span className="text-right">Thao tác</span>
          </div>
          <div className="divide-y">
            {block.departments.map((dept, idx) => (
              <div key={dept.id} className="grid grid-cols-[60px_1fr_100px] px-6 py-4 items-center hover:bg-muted/20 transition-colors">
                <span className="text-sm text-muted-foreground">{idx + 1}</span>
                <span className="text-sm font-medium">{dept.name}</span>
                {isAdmin ? (
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => setDeptDialog({ open: true, blockId: block.id, dept })} className="p-1.5 rounded-md hover:bg-muted transition"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => handleDeleteDept(block.id, dept.id)} className="p-1.5 rounded-md hover:bg-red-50 transition"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  </div>
                ) : <div />}
              </div>
            ))}
            {block.departments.length === 0 && <div className="px-6 py-8 text-center text-sm text-muted-foreground">Chưa có phòng ban nào</div>}
          </div>
        </div>
      ))}

      {deptDialog.open && deptDialog.blockId && (
        <DepartmentDialog blockId={deptDialog.blockId} dept={deptDialog.dept} onSave={handleSaveDept} onClose={() => setDeptDialog({ open: false, blockId: null, dept: null })} />
      )}
    </div>
  );
}