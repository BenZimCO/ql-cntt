'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Block = { id: number; name: string };
type Dept = { id: number | null; name: string };

export default function DepartmentDialog({ blockId, blocks, dept, onSave, onClose }: {
  blockId: number; blocks: Block[]; dept: Dept | null;
  onSave: (blockId: number, dept: Dept) => void; onClose: () => void;
}) {
  const [name, setName] = useState(dept?.name || '');
  const [selectedBlock, setSelectedBlock] = useState(String(blockId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(Number(selectedBlock), { id: dept?.id || null, name: name.trim() });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>{dept ? 'Sửa phòng ban' : 'Thêm phòng ban mới'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Khối <span className="text-destructive">*</span></Label>
            <Select value={selectedBlock} onValueChange={setSelectedBlock}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{blocks.map(b => <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
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