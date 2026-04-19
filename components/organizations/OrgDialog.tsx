'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ORG_TYPES = ['Xã/Phường', 'Sở/Ngành', 'Đặc khu'];

type OrgData = { id?: number; name: string; type: string; province: string; blocks: unknown[] };

export default function OrgDialog({ org, onSave, onClose }: {
  org: OrgData | null; onSave: (data: OrgData) => void; onClose: () => void;
}) {
  const [name, setName] = useState(org?.name || '');
  const [type, setType] = useState(org?.type || 'Xã/Phường');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: org?.id,
      name: name.trim(), type, province: 'Khánh Hòa',
      blocks: org?.blocks || [
        { id: Date.now(), name: 'Đảng ủy', departments: [] },
        { id: Date.now() + 1, name: 'HĐND', departments: [] },
        { id: Date.now() + 2, name: 'UBND', departments: [] },
        { id: Date.now() + 3, name: 'MTTQVN', departments: [] },
      ],
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>{org ? 'Sửa cơ quan/đơn vị' : 'Thêm mới cơ quan/đơn vị'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tên <span className="text-destructive">*</span></Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên cơ quan/đơn vị" autoFocus />
          </div>
          <div className="space-y-2">
            <Label>Loại đơn vị <span className="text-destructive">*</span></Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{ORG_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={!name.trim()}>{org ? 'Cập nhật' : 'Thêm mới'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}