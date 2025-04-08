'use client';

import { useEffect, useState } from 'react';
import { CategoryList, Category, CategoryEditDialog } from '@clear-budget/shared/ui';
import {
  Typography,
  Container,
  CircularProgress,
  Fab,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/categories');
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  const handleSave = async (updated: Category) => {
    await fetch(`/api/admin/categories/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setDialogOpen(false);
    fetchCategories();
  };

  const handleCreate = () => {
    setSelectedCategory({ id: '', name: '', icon: '' });
    setDialogOpen(true);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Categories</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CategoryEditDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
      />

      <Box position="fixed" bottom={32} right={32}>
        <Fab color="primary" aria-label="add" onClick={handleCreate}>
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
};

export default AdminCategoryPage;
