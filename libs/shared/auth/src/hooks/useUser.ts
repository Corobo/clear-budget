'use client';

import { useSession } from 'next-auth/react';

export const useUser = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    accessToken: session?.accessToken,
    status,
    isAuthenticated: !!session,
  };
};
