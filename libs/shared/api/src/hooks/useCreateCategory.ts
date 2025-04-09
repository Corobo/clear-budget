'use client';

import { useFetchWithAuth } from '../lib/fetch-with-auth';
import { Category } from './useCategories';

export const useCreateCategory = (endpoint: string) => {
  const fetchWithAuth = useFetchWithAuth();

  const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await fetchWithAuth(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error('Failed to create category');
    }

    return response.json();
  };

  return { createCategory };
};
