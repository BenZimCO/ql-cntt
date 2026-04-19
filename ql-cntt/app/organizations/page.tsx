'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRole } from '@/lib/roleContext';
import { mockOrganizations } from '@/lib/mockData';
import RoleBanner from '@/components/dashboard/RoleBanner';
import OrgList from '@/components/organizations/OrgList';
import OrgDetail from '@/components/organizations/OrgDetail';
import OrgDialog from '@/components/organizations/OrgDialog';
import { cn } from '@/lib/utils';

const FILTERS = ['Tất cả', 'Xã/Phường', 'Sở/Ngành', 'Đặc khu'];

export default function OrganizationsPage() {
  const { role, isAdmin } = useRole();
  const [orgs, setOrgs] = useState(mockOrganizations);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tất cả');
  const [orgDialog, setOrgDialog] = useState<{ open: boolean; org: any }>({ open: false, org: null });

  let visible = isAdmin ? orgs : orgs.filter(o => o.id === role.orgId);
  if (search) visible = visible.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));
  if (typeFilter !== 'Tất cả') visible = visible.filter(o => o.type === typeFilter);

  const selectedOrg = orgs.find(o => o.id === selectedId) || null;

  const handleSaveOrg = (data: any) => {
    if (data.id) setOrgs(prev => prev.map(o => o.id === data.id ? { ...o, name: data.name, type: data.type } : o));
    else { const newId = Math.max(0, ...orgs.map(o => o.id)) + 1; setOrgs(prev => [...prev, { ...data, id: newId }]); }
    setOrgDialog({ open: false, org: null });
  };

  const handleDeleteOrg = (id: number) => {
    setOrgs(prev => prev.filter(o => o.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Quản lý Cơ quan / Đơn vị</h1>
      <RoleBanner />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm đơn vị..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex items-center gap-1">
            <Filter className="w-4 h-4 text-muted-foreground mr-1" />
            {FILTERS.map(f => (
              <button key={f} onClick={() => setTypeFilter(f)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', typeFilter === f ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted')}>{f}</button>
            ))}
          </div>
        </div>
        {isAdmin && <Button size="sm" className="gap-2" onClick={() => setOrgDialog({ open: true, org: null })}><Plus className="w-4 h-4" />Thêm đơn vị</Button>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[600px] items-start">
        <div className="lg:col-span-2">
          <ScrollArea className="h-[600px] pr-2">
            <OrgList orgs={visible} selectedId={selectedId} onSelect={setSelectedId} isAdmin={isAdmin} onEdit={org => setOrgDialog({ open: true, org })} onDelete={handleDeleteOrg} />
          </ScrollArea>
        </div>
        <div className="lg:col-span-3 bg-card rounded-xl border p-6 h-full">
          <OrgDetail org={selectedOrg} onUpdateOrg={updated => setOrgs(prev => prev.map(o => o.id === updated.id ? { ...o, ...updated } : o))} />
        </div>
      </div>
      {orgDialog.open && <OrgDialog org={orgDialog.org} onSave={handleSaveOrg} onClose={() => setOrgDialog({ open: false, org: null })} />}
    </div>
  );
}