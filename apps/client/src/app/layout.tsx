import './global.css';
import { AppLayout } from '@clear-budget/shared/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ClearBudget - Cliente',
  description: 'Panel financiero para usuarios',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
