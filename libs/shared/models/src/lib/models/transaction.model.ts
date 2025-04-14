import { TransactionType } from '../enums/transaction-type.enum';

export interface Transaction {
    id: string;
    categoryId: string;
    amount: string;
    description: string;
    type: TransactionType;
    date: string;
}
  