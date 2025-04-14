'use client';

import { useState } from 'react';
import { useFetchWithAuth } from '../lib/fetch-with-auth';
import { Transaction} from '@clear-budget/shared/models';

interface UseEditTransactionResult {
  loading: boolean;
  error: string | null;
  updateTransaction: (id: string, data: Transaction) => Promise<void>;
}

export const useEditTransaction = (endpoint: string): UseEditTransactionResult => {
  const fetchWithAuth = useFetchWithAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTransaction = async (id: string, data: Transaction) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth(`${endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err: any) {
      setError(err.message || 'Error updating transaction');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateTransaction,
  };
};
