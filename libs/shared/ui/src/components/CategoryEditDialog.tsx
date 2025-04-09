'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Category } from './CategoryList';

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  onSave: (updated: Category) => void;
  title?: string;
  editMode?: boolean;
  existingCategories: Category[];
}

export const CategoryEditDialog = ({ open, onClose, category, onSave, title = 'Edit Category',
   editMode = false, existingCategories = [] }: Props) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [nameError, setNameError] = useState('');
  const [colorError, setColorError] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setColor(category.color);
    } else {
      setName('');
      setColor('');
    }
  }, [category]);

  const isValidHexColor = (value: string): boolean => {
    const c = value.trim().toLowerCase();
    if (!c) return false;
    if (c === '#fff' || c === '#ffffff' || c === '#f5f5f5') return false;
    return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(c);
  };

  const handleSave = () => {
    let valid = true;
  
    const lower = name.trim().toLowerCase();
  
    const nameExists = existingCategories.some(
      (cat) => cat.name.trim().toLowerCase() === lower
      && cat.id !== category?.id
    );
  
    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else if (nameExists) {
      setNameError('Name already exists');
      valid = false;
    } else {
      setNameError('');
    }
  
    if (!isValidHexColor(color)) {
      setColorError('Color must be a valid hex and not white or empty');
      valid = false;
    } else {
      setColorError('');
    }
  
    if (!valid || !category) return;
  
    onSave({ ...category, name: name.trim(), color: color.trim() });
  };
  

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
            sx: {
              minWidth: 500,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            },
          }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent  sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pt: 1, 
          }}
        >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
          fullWidth
          disabled={editMode}
        />

        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            label="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            error={!!colorError}
            helperText={colorError || 'Hex (e.g. #ff0000)'}
            fullWidth
          />

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: color,
              border: '1px solid #ccc',
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
