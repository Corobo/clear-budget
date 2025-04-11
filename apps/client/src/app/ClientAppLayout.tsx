'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ProtectedLayout } from '@clear-budget/shared/auth';
import { AppLayout } from '@clear-budget/shared/ui';
import SettingsIcon from '@mui/icons-material/Settings';

export const adminMenu = [
  {
    label: 'Management',
    icon: <SettingsIcon />,
    children: [{ label: 'Categories', route: '/categories' }],
  },
];

export default function ClientAppLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ProtectedLayout allowedRoles={['clear-budget']}>
        <AppLayout title="Clear Budget" menuItems={adminMenu}>
          {children}
        </AppLayout>
      </ProtectedLayout>
    </SessionProvider>
  );
}
