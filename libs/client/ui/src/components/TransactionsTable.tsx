'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from '@mui/material';
import { Transaction } from '@clear-budget/shared/models';

export interface TransactionsTableProps {
  transactions?: Transaction[]; // ahora opcional defensivamente
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onRowClick: (tx: Transaction) => void;
  onPageChange: (page: number, rowsPerPage: number) => void;
}

export const TransactionsTable = ({
  transactions = [], // valor por defecto
  totalCount,
  page,
  rowsPerPage,
  onRowClick,
  onPageChange,
}: TransactionsTableProps) => {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageChange(0, parseInt(event.target.value, 10));
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  hover
                  onClick={() => onRowClick(tx)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell>{tx.categoryId}</TableCell> {/* reemplazar con nombre cuando lo tengas */}
                  <TableCell>{tx.type === 0 ? 'Expense' : 'Income'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography align="center" color="textSecondary">
                    No transactions found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
