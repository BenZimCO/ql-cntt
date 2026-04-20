'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ORG_BLOCKS = ['Đảng ủy', 'HĐND', 'UBND', 'MTTQVN'];

type OrgData = { id?: number; name: string; province: string; blocks: unknown[] };

type OrgDialogProps = {
  org: OrgData | null;
  onSave: (data: OrgData) => void;
  onClose: () => void;
};

export default function OrgDialog({ org, onSave, onClose }: OrgDialogProps) {
  const [name, setName] = useState(org?.name || '');
  const [block, setBlock] = useState((org?.blocks?.[0] as any)?.name || ORG_BLOCKS[0]);

  const isEditMode = Boolean(org?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: org?.id,
      name: name.trim(),
      province: 'Khánh Hòa',
      blocks: isEditMode
        ? org?.blocks || []
        : [{ id: Date.now(), name: block, departments: [] }],
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{org ? 'Sửa cơ quan/đơn vị' : 'Thêm mới cơ quan/đơn vị'}</DialogTitle>
          <DialogDescription>Nhập thông tin cơ quan/đơn vị để tạo hoặc cập nhật một đơn vị mới.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tên <span className="text-destructive">*</span></Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên cơ quan/đơn vị" autoFocus />
          </div>
          {!isEditMode && (
            <div className="space-y-2">
              <Label>Khối <span className="text-destructive">*</span></Label>
              <Select value={block} onValueChange={setBlock}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{ORG_BLOCKS.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={!name.trim()}>{org ? 'Cập nhật' : 'Thêm mới'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}