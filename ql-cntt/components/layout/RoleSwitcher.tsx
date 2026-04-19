'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, User, LogIn } from 'lucide-react';
import { useRole } from '@/lib/roleContext';
import { mockOrganizations } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function RoleSwitcher({ onClose }: { onClose: () => void }) {
  const { role, switchToAdmin, switchToUnitUser } = useRole();
  const [selectedType, setSelectedType] = useState(role.type);
  const [selectedOrg, setSelectedOrg] = useState(role.orgId ? String(role.orgId) : '');
  const [selectedBlock, setSelectedBlock] = useState(role.blockId ? String(role.blockId) : '');

  const orgData = mockOrganizations.find(o => String(o.id) === selectedOrg);
  const blocks = orgData?.blocks || [];
  const isValid = selectedType === 'admin' || (selectedOrg && selectedBlock);

  const handleConfirm = () => {
    if (selectedType === 'admin') {
      switchToAdmin();
    } else {
      const org = mockOrganizations.find(o => String(o.id) === selectedOrg);
      const block = org?.blocks.find(b => String(b.id) === selectedBlock);
      if (org && block) switchToUnitUser(org.id, org.name, block.id, block.name);
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">Chọn vai trò để xem giao diện</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <button onClick={() => setSelectedType('admin')} className={cn('w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left', selectedType === 'admin' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30')}>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Shield className="w-5 h-5 text-slate-600" /></div>
            <div><p className="font-semibold">Super Admin cấp tỉnh</p><p className="text-sm text-muted-foreground">Toàn quyền truy cập</p></div>
          </button>
          <button onClick={() => setSelectedType('unit_user')} className={cn('w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left', selectedType === 'unit_user' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30')}>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><User className="w-5 h-5 text-blue-600" /></div>
            <div><p className="font-semibold">Người dùng cấp đơn vị</p><p className="text-sm text-muted-foreground">Chỉ xem dữ liệu của đơn vị</p></div>
          </button>
          {selectedType === 'unit_user' && (
            <div className="space-y-3 pl-2">
              <Select value={selectedOrg} onValueChange={(v) => { setSelectedOrg(v); setSelectedBlock(''); }}>
                <SelectTrigger><SelectValue placeholder="Chọn đơn vị" /></SelectTrigger>
                <SelectContent>{mockOrganizations.map(o => <SelectItem key={o.id} value={String(o.id)}>{o.name}</SelectItem>)}</SelectContent>
              </Select>
              {selectedOrg && (
                <Select value={selectedBlock} onValueChange={setSelectedBlock}>
                  <SelectTrigger><SelectValue placeholder="Chọn khối" /></SelectTrigger>
                  <SelectContent>{blocks.map(b => <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>)}</SelectContent>
                </Select>
              )}
            </div>
          )}
          <Button onClick={handleConfirm} disabled={!isValid} className="w-full gap-2">
            <LogIn className="w-4 h-4" />Đăng nhập với vai trò này
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}