import { TransactionType } from '../enums/transaction-type.enum';

export interface Transaction {
    id: string;
    categoryId: string;
    amount: number;
    description: string;
    type: TransactionType;
    date: Date;
}
  