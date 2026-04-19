'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileDown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockEquipments} from '@/lib/mockData';
import { useRole } from '@/lib/roleContext';
import DeviceDetailModal from '@/app/devices/DeviceDetailModal';

const statusColors: Record<string, string> = {
  'Đang sử dụng': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  'Hỏng': 'bg-red-100 text-red-700 hover:bg-red-100',
  'Bảo trì': 'bg-amber-100 text-amber-700 hover:bg-amber-100',
};
const GROUPS = ['Nhóm máy tính','Nhóm máy in','Nhóm thiết bị họp trực tuyến','Nhóm LED/màn hình thông báo','Nhóm thiết bị mạng'];
const PAGE_SIZE = 7;

export default function EquipmentTable() {
  const { role, isAdmin } = useRole();
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<typeof mockEquipments[number] | null>(null);

  let data = isAdmin ? mockEquipments : mockEquipments.filter(e => e.org === role.orgName && e.block === role.blockName);
  if (search) { const s = search.toLowerCase(); data = data.filter(e => e.brand.toLowerCase().includes(s) || e.model.toLowerCase().includes(s) || e.org.toLowerCase().includes(s)); }
  if (groupFilter !== 'all') data = data.filter(e => e.group === groupFilter);

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const cur = Math.min(page, totalPages);
  const paged = data.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Tìm thương hiệu, model, đơn vị..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
            </div>
            <Select value={groupFilter} onValueChange={v => { setGroupFilter(v); setPage(1); }}>
              <SelectTrigger className="w-52"><SelectValue placeholder="Tất cả nhóm" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nhóm</SelectItem>
                {GROUPS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" className="gap-2"><FileDown className="w-4 h-4" />Xuất Excel</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-xs">Đơn vị</TableHead>
                <TableHead className="font-semibold text-xs">Khối</TableHead>
                <TableHead className="font-semibold text-xs">Loại</TableHead>
                <TableHead className="font-semibold text-xs">Thương hiệu</TableHead>
                <TableHead className="font-semibold text-xs">Model</TableHead>
                <TableHead className="font-semibold text-xs">Năm mua</TableHead>
                <TableHead className="font-semibold text-xs text-right">Giá (VNĐ)</TableHead>
                <TableHead className="font-semibold text-xs">Trạng thái</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map(item => (
                <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell><p className="font-medium text-sm">{item.org}</p><p className="text-xs text-muted-foreground">{item.dept}</p></TableCell>
                  <TableCell className="text-sm">{item.block}</TableCell>
                  <TableCell className="text-sm">{item.type}</TableCell>
                  <TableCell className="text-sm font-medium">{item.brand}</TableCell>
                  <TableCell className="text-sm">{item.model}</TableCell>
                  <TableCell className="text-sm">{item.year}</TableCell>
                  <TableCell className="text-sm text-right font-medium">{item.price.toLocaleString('vi-VN')}</TableCell>
                  <TableCell><Badge className={`text-xs ${statusColors[item.status] || 'bg-gray-100 text-gray-700'}`}>{item.status}</Badge></TableCell>
                  <TableCell><button onClick={() => setSelectedDevice(mockEquipments.find((d) => d.id === item.id) ?? null)} className="p-1.5 rounded-lg hover:bg-muted transition"><Eye className="w-4 h-4 text-muted-foreground" /></button></TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Không tìm thấy thiết bị nào</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between text-sm text-muted-foreground">
          <span>Hiển thị {paged.length > 0 ? (cur-1)*PAGE_SIZE+1 : 0}–{Math.min(cur*PAGE_SIZE, data.length)} / {data.length} thiết bị</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={cur===1} onClick={() => setPage(p => p-1)}><ChevronLeft className="w-4 h-4" /></Button>
            <span className="text-xs px-2">{cur} / {totalPages}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={cur===totalPages} onClick={() => setPage(p => p+1)}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </CardContent>
      <DeviceDetailModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />
    </Card>
  );
}