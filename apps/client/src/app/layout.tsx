import './global.css';
import { AppLayout } from '@clear-budget/shared/ui';
import type { Metadata } from 'next';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const clientMenu = [
  {
    label: 'Finanzas',
    icon: <DashboardIcon />,
    children: [
      { label: 'Dashboard', route: '/dashboard' },
      { label: 'Transacciones', route: '/transacciones' },
      { label: 'Categorías', route: '/categorias' }
    ]
  }
];


export const metadata: Metadata = {
  title: 'ClearBudget - Cliente',
  description: 'Panel financiero para usuarios',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppLayout title='Clear Budget' menuItems={clientMenu}>{children}</AppLayout>
      </body>
    </html>
  );
}
