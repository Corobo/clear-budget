import { Typography, Box } from '@mui/material';
export default function Index() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome to the ClearBudget Client Section
      </Typography>
      <Typography variant="body1">
        Use the sidebar to navigate through the client features.
      </Typography>
    </Box>
  );
}
