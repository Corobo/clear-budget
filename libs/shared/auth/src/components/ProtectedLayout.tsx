'use client';

import { useSession, signIn } from 'next-auth/react';
import { CircularProgress, Box } from '@mui/material';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ProtectedLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('keycloak');
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!session) return null;

  return <>{children}</>;
};
