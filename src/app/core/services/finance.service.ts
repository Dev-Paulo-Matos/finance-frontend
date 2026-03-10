// finance.service.ts
import { Injectable, signal } from '@angular/core';
import { Account, Category, Transaction } from '../models/finance.model';

@Injectable({ providedIn: 'root' })
export class FinanceService {
  accounts = signal<Account[]>([]);
  transactions = signal<Transaction[]>([]);
  categories = signal<Category[]>([]);

  totalBalance = () => {
    const accBase = this.accounts().reduce((sum, a) => sum + a.balance, 0);
    const incomes = this.transactions().filter(t => t.transaction_type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = this.transactions().filter(t => t.transaction_type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return accBase + incomes - expenses;
  };

  addTransaction(t: Transaction) {
    this.transactions.update(prev => [...prev, t]);
  }
}