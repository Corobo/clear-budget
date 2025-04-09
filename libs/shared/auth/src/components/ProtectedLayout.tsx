'use client';

import { useSession, signIn } from 'next-auth/react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedLayout = ({ children, allowedRoles }: Props) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const hasRefreshError = (session as any)?.error === 'RefreshAccessTokenError';

    if (status === 'unauthenticated' || hasRefreshError) {
      console.warn('Session expired or refresh failed. Redirecting to login...');
      signIn('keycloak', { callbackUrl: window.location.href });
    }
  }, [session, status]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!session) return null;

  const userRoles: string[] = (session as any).decodedToken?.realm_access?.roles || [];
  if (allowedRoles && !allowedRoles.some((role) => userRoles.includes(role))) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Access Denied</Typography>
      </Box>
    );
  }

  return <>{children}</>;
};
