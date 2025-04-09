import { Typography, Box } from '@mui/material';
export default function Index() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome to the ClearBudget Admin Section
      </Typography>
      <Typography variant="body1">
        Use the sidebar to navigate through the admin features.
      </Typography>
    </Box>
  );
}
