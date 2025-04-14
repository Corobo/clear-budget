'use client';

import { useState } from 'react';
import { useFetchWithAuth } from '../lib/fetch-with-auth';
import { Transaction } from '@clear-budget/shared/models';

interface UseCreateTransactionResult {
  loading: boolean;
  error: string | null;
  createTransaction: (data: Transaction) => Promise<void>;
}

export const useCreateTransaction = (endpoint: string): UseCreateTransactionResult => {
  const fetchWithAuth = useFetchWithAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (data: Transaction) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err: any) {
      setError(err.message || 'Error creating transaction');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createTransaction,
  };
};
