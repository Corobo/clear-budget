import { Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;

const items = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Transacciones', path: '/transacciones' },
  { label: 'Categorías', path: '/categorias' }
];

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
    >
      <Toolbar />
      <List>
        {items.map(({ label, path }) => (
          <ListItemButton component={Link} href={path} key={path}>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
