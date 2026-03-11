export interface Account {
  __backendId?: string;
  type: 'account';
  name: string;
  balance: number;
}

export interface Category {
  id: number;
  name: string;
  desc: string;
  type: 'INCOME' | 'EXPENSE';
  limitValue: number;
  spentValue: number;
  color: string;
  icon: string;
}

export interface Transaction {
  __backendId?: string;
  type: 'transaction';
  description: string;
  amount: number;
  transaction_type: 'income' | 'expense';
  date: string;
  accountName: string;
  categoryName: string;
}