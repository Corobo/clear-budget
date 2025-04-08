'use client';

import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  
  export interface Category {
    id: string;
    name: string;
    icon: string;
  }
  
  export interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (categoryId: string) => void;
  }
  
  export const CategoryList = ({ categories, onEdit, onDelete }: CategoryListProps) => (
    <Box display="flex" flexDirection="column" gap={2}>
      {categories.map((cat) => (
        <Card
          key={cat.id}
          onDoubleClick={() => onEdit(cat)}
          sx={{
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#f5f5f5' },
          }}
        >
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">{cat.name}</Typography>
              <Typography variant="body2" color="text.secondary">{cat.icon}</Typography>
            </Box>
            <IconButton onClick={() => onDelete(cat.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
  