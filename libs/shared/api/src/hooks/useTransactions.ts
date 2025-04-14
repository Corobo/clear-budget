'use client';

import { useEffect, useState } from 'react';
import { useFetchWithAuth } from '../lib/fetch-with-auth';
import { Transaction } from '@clear-budget/shared/models';

interface useTransactionsResult {
  transactions: Transaction[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchTransactions: (page: number, pageSize: number) => Promise<void>;
}

export const useTransactions = (endpoint: string): useTransactionsResult => {
  const fetchWithAuth = useFetchWithAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async (page: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${endpoint}?page=${page + 1}&pageSize=${pageSize}`;
      const res = await fetchWithAuth(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { data, totalCount } = await res.json();
      setTransactions(data);
      setTotalCount(totalCount);
    } catch (err: any) {
      setError(err.message || 'Error loading transactions');
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    totalCount,
    loading,
    error,
    fetchTransactions,
  };
};
