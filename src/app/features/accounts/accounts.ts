import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface Account {
  bank: string;
  type: string;
  balance: number;
  color: string;
  icon: string;
  limitUsed?: number; // Para cartões ou limites
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss'
})
export class AccountsComponent {
  accounts: Account[] = [
    { bank: 'Nubank', type: 'Conta Corrente', balance: 2500.50, color: '#8A05BE', icon: 'account_balance' },
    { bank: 'Itaú Personalité', type: 'Investimentos', balance: 15400.00, color: '#EC7000', icon: 'trending_up' },
    { bank: 'XP Investimentos', type: 'Corretora', balance: 45200.80, color: '#000000', icon: 'leaderboard' },
    { bank: 'Dinheiro em Espécie', type: 'Carteira', balance: 350.00, color: '#2ecc71', icon: 'payments' }
  ];

  getTotalBalance(): number {
    return this.accounts.reduce((acc, curr) => acc + curr.balance, 0);
  }
}