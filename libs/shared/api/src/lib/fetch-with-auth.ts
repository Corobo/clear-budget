'use client';

import { useSession } from 'next-auth/react';


export const useFetchWithAuth = () => {
  const { data: session } = useSession();

  const fetchWithAuth = async (
    input: RequestInfo | URL,
    init: RequestInit = {}
  ) => {
    const token = (session as { accessToken?: string })?.accessToken;

    if (!token) {
      throw new Error('No access token found. Are you authenticated?');
    }

    const headers = new Headers(init.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');

    return fetch(input, {
      ...init,
      headers,
    });
  };

  return fetchWithAuth;
};
