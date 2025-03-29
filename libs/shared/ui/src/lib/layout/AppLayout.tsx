'use client';

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  children: {
    label: string;
    route: string;
  }[];
}

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  menuItems: MenuItem[];
}

export function AppLayout({ children, menuItems, title = 'ClearBudget' }: MainLayoutProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            top: '64px',
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {menuItems.map((section) => (
              <Box key={section.label} sx={{ mb: 2 }}>
                <ListItemButton disabled>
                  {section.icon && <ListItemIcon>{section.icon}</ListItemIcon>}
                  <ListItemText primary={section.label} />
                </ListItemButton>
                {section.children.map((child) => (
                  <ListItemButton
                    key={child.label}
                    sx={{ pl: 6 }}
                    onClick={() => {
                      router.push(child.route);
                      setOpen(false);
                    }}
                  >
                    <ListItemText primary={child.label} />
                  </ListItemButton>
                ))}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}
