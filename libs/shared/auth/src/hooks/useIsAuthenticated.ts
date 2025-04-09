'use client';

import { useSession } from 'next-auth/react';

export const useIsAuthenticated = () => {
  const { status } = useSession();
  return status === 'authenticated';
};
