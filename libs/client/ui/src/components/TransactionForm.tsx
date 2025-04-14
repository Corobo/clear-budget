'use client';

import { Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Transaction, Category } from '@clear-budget/shared/models';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

type FormTransaction = Omit<Transaction, 'date'> & { date: Dayjs };

export interface TransactionFormProps {
  initialData?: Transaction | null;
  categories: Category[];
  onSubmit: (data: Transaction) => void;
}

export const TransactionForm = ({ initialData, categories, onSubmit }: TransactionFormProps) => {
  const { register, handleSubmit, reset, control } = useForm<FormTransaction>({
    defaultValues: {
      amount: 0,
      description: '',
      categoryId: '',
      type: 0,
      date: undefined, 
    },
  });
  

  useEffect(() => {
    if (initialData) {
      reset({
        amount: initialData.amount,
        description: initialData.description,
        categoryId: initialData.categoryId,
        type: initialData.type,
        date: dayjs(initialData.date), // 👈 conversión aquí
      });
    } else {
      reset();
    }
  }, [initialData, reset]);

  const onFormSubmit = (data: FormTransaction) => {
    onSubmit({
      ...data,
      date: data.date.toISOString(), // 👈 convertir a string ISO antes de enviar
    });
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? 'Edit Transaction' : 'New Transaction'}
      </Typography>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            {...register('amount', { required: true })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            {...register('description', { required: true })}
          />
          <TextField
            label="Type"
            select
            fullWidth
            {...register('type', { required: true })}
          >
            <MenuItem value={0}>Expense</MenuItem>
            <MenuItem value={1}>Income</MenuItem>
          </TextField>
          <TextField
            label="Category"
            select
            fullWidth
            {...register('categoryId', { required: true })}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Date"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained" fullWidth>
            {initialData ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
