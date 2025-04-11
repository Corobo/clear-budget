'use client';

import { useEffect, useState } from 'react';
import { useFetchWithAuth } from '../lib/fetch-with-auth';

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useCategories = (endpoint: string): UseCategoriesResult => {
  const fetchWithAuth = useFetchWithAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        console.log('Fetching categories from:', endpoint);
        const res = await fetchWithAuth(endpoint);
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || 'Error loading categories');
      } finally {
        setLoading(false);
      }
    };

    load();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]); // 👈 fetchWithAuth eliminado

  return { categories, loading, error };
};
