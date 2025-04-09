'use client';

import { useFetchWithAuth } from '../lib/fetch-with-auth';
import { Category } from './useCategories';

export const useEditCategory = (baseEndpoint: string) => {
  const fetchWithAuth = useFetchWithAuth();

  const editCategory = async (category: Category): Promise<void> => {
    const response = await fetchWithAuth(`${baseEndpoint}/${category.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error('Failed to update category');
    }

  };

  return { editCategory };
};
