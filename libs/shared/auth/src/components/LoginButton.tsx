'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn('keycloak')} variant="contained">
      Login
    </Button>
  );
};
