'use client';

import { useFetchWithAuth } from '../lib/fetch-with-auth';

export const useDeleteCategory = (baseEndpoint: string) => {
  const fetchWithAuth = useFetchWithAuth();

  const deleteCategory = async (id: string): Promise<void> => {
    const response = await fetchWithAuth(`${baseEndpoint}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  };

  return { deleteCategory };
};
