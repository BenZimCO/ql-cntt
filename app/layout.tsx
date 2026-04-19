import type { Metadata } from 'next';
import './globals.css';
import { RoleProvider } from '@/lib/roleContext';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'Quản lý TTBHTCNTT - Tỉnh Khánh Hòa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <RoleProvider>
          <AppLayout>{children}</AppLayout>
        </RoleProvider>
      </body>
    </html>
  );
}