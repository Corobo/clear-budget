'use client';

import { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Transaction } from '@clear-budget/shared/models';
import {
  useTransactions,
  useCreateTransaction,
  useEditTransaction,
  useDeleteTransaction,
} from '@clear-budget/shared/api';
import { useCategories } from '@clear-budget/shared/api';
import { TransactionsTable, TransactionForm } from '@clear-budget/client/client-ui';

const TRANSACTIONS_ENDPOINT = 'http://localhost:5000/api/transactions';
const CATEGORIES_ENDPOINT = 'http://localhost:5000/api/categories/';

const TransactionsPage = () => {
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    transactions,
    totalCount,
    loading: loadingList,
    error: errorList,
    fetchTransactions,
  } = useTransactions(TRANSACTIONS_ENDPOINT);

  const {
    createTransaction,
    loading: creating,
  } = useCreateTransaction(TRANSACTIONS_ENDPOINT);

  const {
    updateTransaction,
    loading: updating,
  } = useEditTransaction(TRANSACTIONS_ENDPOINT);

  const {
    deleteTransaction,
    loading: deleting,
  } = useDeleteTransaction(TRANSACTIONS_ENDPOINT);

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories(CATEGORIES_ENDPOINT);

  useEffect(() => {
    fetchTransactions(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSubmit = async (data: Transaction) => {
    if (selected) {
      await updateTransaction(selected.id, data);
    } else {
      await createTransaction(data);
    }
    await fetchTransactions(page, rowsPerPage);
    setSelected(null);
  };

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
    await fetchTransactions(page, rowsPerPage);
    setSelected(null);
  };

  const handleNew = () => setSelected(null);

  return (
    <Box className="grid grid-cols-2 gap-4 p-4">
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Transactions</Typography>
          <Button variant="contained" onClick={handleNew}>+ New</Button>
        </Stack>

        {loadingList ? (
          <CircularProgress />
        ) : (
          <TransactionsTable
            transactions={transactions}
            totalCount={totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onRowClick={setSelected}
            onPageChange={(newPage, newSize) => {
              setPage(newPage);
              setRowsPerPage(newSize);
            }}
          />
        )}

        {errorList && <Typography color="error">{errorList}</Typography>}
      </Stack>

      <Stack spacing={2}>
        {(creating || updating || deleting || loadingCategories) && <CircularProgress />}

        {!loadingCategories && (
          <>
            <TransactionForm
              initialData={selected}
              categories={categories}
              onSubmit={handleSubmit}
            />

            {selected && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(selected.id)}
              >
                Delete
              </Button>
            )}
          </>
        )}

        {errorCategories && <Typography color="error">{errorCategories}</Typography>}
      </Stack>
    </Box>
  );
};

export default TransactionsPage;
