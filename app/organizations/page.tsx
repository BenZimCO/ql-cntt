'use client';
import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { useRole } from '@/lib/roleContext';
import { mockOrganizations } from '@/lib/mockData';
import OrgDialog from '@/components/organizations/OrgDialog';
import OrgDetailView from '@/components/organizations/OrgDetailView';

const blockColors: Record<string, string> = {
  'Đảng ủy': 'bg-red-100 text-red-700',
  'HĐND': 'bg-orange-100 text-orange-700',
  'UBND': 'bg-blue-100 text-blue-700',
  'MTTQVN': 'bg-green-100 text-green-700',
};

type Dept = { id: number; name: string };
type Block = { id: number; name: string; departments: Dept[] };
type Org = { id: number; name: string; type: string; province: string; blocks: Block[] };
type OrgFromDetail = { id: number; name: string; province: string; blocks: Block[] };
type OrgDialogData = { id?: number; name: string; province: string; blocks: unknown[] };
type OrgDialogState = { open: boolean; org: Org | null };
type SelectedOrgState = { org: Org; blockName?: string } | null;

export default function Organizations() {
  const { role, isAdmin } = useRole();
  const [orgs, setOrgs] = useState<Org[]>(mockOrganizations);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [orgDialog, setOrgDialog] = useState<OrgDialogState>({ open: false, org: null });
  const [selectedOrg, setSelectedOrg] = useState<SelectedOrgState>(null);
  const PAGE_SIZE = 10;

  let visibleOrgs = isAdmin ? orgs : orgs.filter(o => o.id === role.orgId);
  if (search) {
    const s = search.toLowerCase();
    visibleOrgs = visibleOrgs.filter(o => {
      const blocks = isAdmin ? o.blocks : o.blocks.filter(b => b.name === role.blockName);
      return o.name.toLowerCase().includes(s) ||
        blocks.some(b => b.name.toLowerCase().includes(s));
    });
  }

  const handleSaveOrg = (orgData: OrgDialogData) => {
    if (orgData.id) {
      setOrgs(prev => prev.map(o => o.id === orgData.id ? { ...o, name: orgData.name, blocks: orgData.blocks as Block[] } : o));
    } else {
      const existingOrg = orgs.find(o => o.name.toLowerCase() === orgData.name.toLowerCase());
      const newBlock = (orgData.blocks as Block[])[0];

      if (existingOrg) {
        if (existingOrg.blocks.some(b => b.name === newBlock.name)) {
          window.alert('Đơn vị đã tồn tại khối này, không thể tạo trùng.');
          return;
        }
        if (existingOrg.blocks.length >= 4) {
          window.alert('Đơn vị này đã có đủ 4 khối, không thể tạo thêm.');
          return;
        }

        setOrgs(prev => prev.map(o => o.id === existingOrg.id ? { ...o, blocks: [...o.blocks, newBlock] } : o));
      } else {
        const newId = Math.max(0, ...orgs.map(o => o.id)) + 1;
        setOrgs(prev => [...prev, { ...(orgData as Org), id: newId, blocks: orgData.blocks as Block[] }]);
      }
    }
    setOrgDialog({ open: false, org: null });
  };

  const handleDeleteOrg = (orgId: number) => {
    setOrgs(prev => prev.filter(o => o.id !== orgId));
  };

  const handleUpdateOrg = (updatedOrg: OrgFromDetail) => {
    setOrgs(prev => prev.map(o => o.id === updatedOrg.id ? { ...o, ...updatedOrg } : o));
    setSelectedOrg(prev => prev ? { org: { ...prev.org, ...updatedOrg }, blockName: prev.blockName } : null);
  };

  const rows = visibleOrgs.flatMap(org =>
    (isAdmin ? org.blocks : org.blocks.filter(b => b.name === role.blockName)).map(block => ({
      org,
      block,
      deptCount: block.departments.length,
    }))
  );

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (selectedOrg) {
    return (
      <OrgDetailView
        org={selectedOrg.org}
        onBack={() => setSelectedOrg(null)}
        onUpdateOrg={handleUpdateOrg}
        isAdmin={isAdmin}
        currentBlockName={selectedOrg.blockName ?? role.blockName ?? undefined}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Cơ quan</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Danh sách các cơ quan, đơn vị</p>
        </div>
        {isAdmin && (
          <Button className="gap-2 bg-slate-900 hover:bg-slate-800 text-white" onClick={() => setOrgDialog({ open: true, org: null })}>
            <Plus className="w-4 h-4" />
            Thêm cơ quan
          </Button>
        )}
      </div>

      <div className="bg-card rounded-xl border">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-sm">Danh sách cơ quan</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tên cơ quan, khối..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 h-8 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-[120px_1fr_140px_160px_100px] px-6 py-3 border-b bg-muted/30 text-xs font-medium text-muted-foreground">
          <span>Tỉnh</span>
          <span>Tên cơ quan</span>
          <span>Khối</span>
          <span>Số phòng ban</span>
          <span className="text-right">Thao tác</span>
        </div>

        <div className="divide-y">
          {paginatedRows.map(({ org, block, deptCount }) => (
            <div key={`${org.id}-${block.id}`} className="grid grid-cols-[120px_1fr_140px_160px_100px] px-6 py-4 items-center hover:bg-muted/20 transition-colors">
              <span className="text-sm text-primary font-medium">{org.province}</span>
              <button
                onClick={() => setSelectedOrg({ org, blockName: block.name })}
                className="flex items-center gap-1 text-sm font-semibold text-left hover:text-primary transition-colors"
              >
                {org.name}
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <div>
                <Badge className={`text-xs font-medium ${blockColors[block.name] || 'bg-slate-100 text-slate-700'}`}>
                  {block.name}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">{deptCount} phòng</span>
              {isAdmin ? (
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setOrgDialog({ open: true, org })}
                    className="p-1.5 rounded-md hover:bg-muted transition"
                  >
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDeleteOrg(org.id)}
                    className="p-1.5 rounded-md hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ) : <div />}
            </div>
          ))}
          {rows.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              Không tìm thấy cơ quan nào
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t flex items-center justify-between text-sm text-muted-foreground">
          <span>Hiển thị {paginatedRows.length > 0 ? (currentPage-1)*PAGE_SIZE+1 : 0}–{Math.min(currentPage*PAGE_SIZE, rows.length)} / {rows.length} cơ quan</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={currentPage===1} onClick={() => setPage(p => p-1)}><ChevronLeft className="w-4 h-4" /></Button>
            <span className="text-xs px-2">{currentPage} / {totalPages}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={currentPage===totalPages} onClick={() => setPage(p => p+1)}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      {orgDialog.open && (
        <OrgDialog
          org={orgDialog.org}
          onSave={handleSaveOrg}
          onClose={() => setOrgDialog({ open: false, org: null })}
        />
      )}
    </div>
  );
}
