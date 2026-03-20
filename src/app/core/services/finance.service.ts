// finance.service.ts
import { Injectable, signal } from '@angular/core';
import { AccountResponse, TransactionResponse, TransactionType } from '@api-types';

@Injectable({ providedIn: 'root' })
export class FinanceService {
  accounts = signal<AccountResponse[]>([]);
  transactions = signal<TransactionResponse[]>([]);
  categories = signal<AccountResponse[]>([]);

  totalBalance = () => {
    const accBase = this.accounts().reduce((sum, a) => sum + a.balance, 0);
    const incomes = this.transactions().filter(t => t.type == TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
    const expenses = this.transactions().filter(t => t.type == TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);
    return accBase + incomes - expenses;
  };

  addTransaction(t: TransactionResponse) {
    this.transactions.update(prev => [...prev, t]);
  }
}