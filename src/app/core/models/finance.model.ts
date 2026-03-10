export interface Account {
  __backendId?: string;
  type: 'account';
  name: string;
  balance: number;
}

export interface Category {
  __backendId?: string;
  type: 'category';
  category_name: string;
  category_type: 'income' | 'expense';
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