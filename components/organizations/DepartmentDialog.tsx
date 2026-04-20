'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Dept = { id: number | null; name: string };

export default function DepartmentDialog({ blockId, dept, onSave, onClose }: {
  blockId: number; dept: Dept | null;
  onSave: (blockId: number, dept: Dept) => void; onClose: () => void;
}) {
  const [name, setName] = useState(dept?.name || '');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(blockId, { id: dept?.id || null, name: name.trim() });
  };
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader><DialogTitle>{dept ? 'Sửa phòng ban' : 'Thêm phòng ban mới'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tên phòng ban <span className="text-destructive">*</span></Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên phòng ban" autoFocus />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={!name.trim()}>{dept ? 'Cập nhật' : 'Thêm mới'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}