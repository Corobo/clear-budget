'use client';

import { useState } from 'react';
import { useFetchWithAuth } from '../lib/fetch-with-auth';

interface UseDeleteTransactionResult {
  loading: boolean;
  error: string | null;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useDeleteTransaction = (endpoint: string): UseDeleteTransactionResult => {
  const fetchWithAuth = useFetchWithAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTransaction = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth(`${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err: any) {
      setError(err.message || 'Error deleting transaction');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deleteTransaction,
  };
};
