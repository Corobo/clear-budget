'use client';

import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import React from 'react';
import { Category } from '@clear-budget/shared/models';
  
  
  export interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (categoryId: string) => void;
    isAdminApp?: boolean;
  }
  
  export const CategoryList = React.memo(({ categories, onEdit, onDelete, isAdminApp = false }: CategoryListProps) => (
    <Box display="flex" flexDirection="column" gap={2}>
      {categories.map((cat) => {
        const showDelete = (isAdminApp && cat.isAdmin) || (!isAdminApp && !cat.isAdmin); // Show delete button only if the category is admin or if it's a user category in the client app
        return (
          <Card
            key={cat.id}
            onDoubleClick={() => onEdit(cat)}
            sx={{
              backgroundColor: cat.color,
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h6">{cat.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {cat.color}
                </Typography>
              </Box>
  
              {showDelete && (
                <IconButton onClick={() => onDelete(cat.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  ));
  
  