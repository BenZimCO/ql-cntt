'use client';

import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Monitor, Building2, Tag, Calendar, User, Shield, DollarSign, MapPin, Hash } from 'lucide-react';

const evalColors: Record<string, string> = {
  'Đáp ứng': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Chưa đáp ứng': 'bg-red-100 text-red-700 border-red-200',
};

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; value?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value ?? 'Chưa cập nhật'}</p>
      </div>
    </div>
  );
}

export default function DeviceDetailModal({ device, onClose }: { device?: any; onClose: () => void }) {
  if (!device) return null;

  return (
    <Dialog open={!!device} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-full h-[min(80vh,calc(100vh-96px))] max-h-[88vh] overflow-hidden p-0">
        <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl">
          <DialogHeader className="border-b border-border px-6 py-5 flex-shrink-0">
            <DialogTitle className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-600">
                <Monitor className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{device.brand} {device.model}</p>
                <p className="text-sm text-muted-foreground">Mã thiết bị: {device.code}</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 min-h-0 overflow-hidden">
            <div className="space-y-4 p-6">
              {/* Basic info */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow icon={Tag} label="Loại thiết bị" value={device.type} />
                <InfoRow icon={Tag} label="Nhóm" value={device.group} />
                <InfoRow icon={Building2} label="Đơn vị" value={device.org} />
                <InfoRow icon={Building2} label="Phòng ban" value={device.dept} />
                <InfoRow icon={User} label="Người sử dụng" value={device.user} />
                <InfoRow icon={Hash} label="Số seri" value={device.serial} />
                <InfoRow icon={Building2} label="Khối" value={device.block} />
                <InfoRow icon={Shield} label="Trạng thái" value={device.status} />
              </div>

          <div className="border-t border-border" />

          {/* Software */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Phần mềm
            </h4>
            <div className="grid grid-cols-2 gap-x-4">
              <InfoRow icon={Monitor} label="Hệ điều hành" value={device.os} />
              <InfoRow icon={Monitor} label="Bộ Office" value={device.office} />
              <InfoRow icon={Shield} label="Phần mềm bảo mật" value={device.security} />
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Purchase */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Thông tin mua sắm
            </h4>
            <div className="grid grid-cols-2 gap-x-4">
              <InfoRow icon={Calendar} label="Năm mua" value={device.year?.toString()} />
              <InfoRow icon={DollarSign} label="Giá mua" value={device.price?.toLocaleString('vi-VN') + ' VNĐ'} />
              <InfoRow icon={MapPin} label="Nơi bán" value={device.seller} />
              <InfoRow icon={DollarSign} label="Ngân sách" value={device.budget} />
              <InfoRow icon={Hash} label="Số ký hiệu NS" value={device.budgetCode} />
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Evaluations */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Đánh giá tuân thủ
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Công văn 1180/BKHCB', value: device.eval1180 },
                { label: 'Công văn 1138/VPCP', value: device.eval1138 },
                { label: 'Công văn 2140/SKHCN', value: device.eval2140 },
              ].map((ev) => {
                const badgeClass = evalColors[ev.value as string] ?? 'bg-slate-100 text-slate-700';
                return (
                  <div key={ev.label} className="flex items-center justify-between py-1">
                    <span className="text-sm">{ev.label}</span>
                    <Badge variant="outline" className={badgeClass}>
                      {ev.value || 'Chưa cập nhật'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
          </ScrollArea>

          <DialogFooter className="border-t border-border px-6 py-4">
            <Button variant="ghost" onClick={onClose}>Đóng</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}