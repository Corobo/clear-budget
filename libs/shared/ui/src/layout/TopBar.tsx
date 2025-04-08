import { AppBar, Toolbar, Typography } from '@mui/material';

export function TopBar({ title }: { title: string }) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
