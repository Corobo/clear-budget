'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Typography,
  Container,
  CircularProgress,
  Fab,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  useCategories,
  useCreateCategory,
  useEditCategory,
  useDeleteCategory,
  Category,
} from '@clear-budget/shared/api';
import { CategoryList } from './CategoryList';
import { CategoryEditDialog } from './CategoryEditDialog';

interface GenericCategoryPageProps {
  endpoint: string;
  title: string;
}

export const GenericCategoryPage = ({ endpoint, title }: GenericCategoryPageProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { categories, loading, error } = useCategories(`${endpoint}?t=${refreshTrigger}`);
  const { createCategory } = useCreateCategory(endpoint);
  const { editCategory } = useEditCategory(endpoint);
  const { deleteCategory } = useDeleteCategory(endpoint);

  const refetchCategories = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  const handleEdit = useCallback((category: Category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  }, []);

  const handleCreate = useCallback(() => {
    setSelectedCategory({ id: '', name: '', color: '' });
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await deleteCategory(id);
    refetchCategories();
  }, [deleteCategory, refetchCategories]);

  const handleSave = useCallback(async (category: Category) => {
    if (category.id) {
      await editCategory(category);
    } else {
      await createCategory({ name: category.name, color: category.color });
    }
    setDialogOpen(false);
    refetchCategories();
  }, [editCategory, createCategory, refetchCategories]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{title}</Typography>

      <CategoryList
        categories={sortedCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryEditDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
        title={selectedCategory?.id ? 'Edit Category' : 'Create Category'}
        editMode={!!selectedCategory?.id}
        existingCategories={categories}
      />

      <Box position="fixed" bottom={32} right={32}>
        <Fab color="primary" aria-label="add" onClick={handleCreate}>
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
};

export default GenericCategoryPage;
