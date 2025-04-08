'use client';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
  } from '@mui/material';
  import { useState, useEffect, use } from 'react';
  import { Category } from './CategoryList';
  
  interface Props {
    open: boolean;
    onClose: () => void;
    category: Category | null;
    onSave: (updated: Category) => void;
  }
  
  export const CategoryEditDialog = ({ open, onClose, category, onSave }: Props) => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
  
    useEffect(() => {
      if (category) {
        setName(category.name);
        setIcon(category.icon);
      }
    }, [category]);
  
    const handleSave = () => {
      if (category) {
        onSave({ ...category, name, icon });
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Icon"
            fullWidth
            margin="dense"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  };
  