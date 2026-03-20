import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { tablerTrendingDown, tablerWallet } from '@ng-icons/tabler-icons';
import { TransactionService } from '../../core/services/transacoes.service';
import { TransactionResponse } from '@api-types';
import { HttpParams } from '@angular/common/http';
import { AccountService } from '../../core/services/account.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgIcon, BaseChartDirective, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private transactionService = inject(TransactionService);
  private accountService = inject(AccountService)
  private cd = inject(ChangeDetectorRef);
  public transactions: TransactionResponse[] = [];
  public totalIncome = 0;
  public totalExpense = 0;
  public totalBalance = 0;

  public startDate: string = '';
  public endDate: string = '';

  public timelineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  public timelineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: { tension: 0.4 }
    }
  };

  public incomeCategoryChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  public expenseCategoryChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  
  public categoryChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnInit(): void {
    // Definir datas padrão (mês atual)
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.startDate = firstDay.toISOString().split('T')[0];
    this.endDate = now.toISOString().split('T')[0];

    this.getAllTransactions();
    this.getDashboardSummary();
    this.getDashboardCharts();
  }

  public applyFilters() {
    this.getDashboardCharts();
  }

  getAllTransactions() {
    const params = this.paramsForFiveLastTransactions()
    this.transactionService.getAll(params).subscribe({
      next: (response) => {
        this.transactions = response.data;
        this.cd.detectChanges();
      }
    });
  }

  private paramsForFiveLastTransactions() {
    return new HttpParams().set('size', 5).set('page', 0);
  }

  private getDashboardSummary() {
    this.transactionService.getDashboardSummary().subscribe({
      next: (response) => {
        this.totalIncome = response.totalIncome;
        this.totalExpense = response.totalExpense;
        this.totalBalance = response.totalBalance;
        this.cd.detectChanges();
      }
    });
  }

  public getDashboardCharts() {
    this.transactionService.getDashboardCharts(this.startDate, this.endDate).subscribe({
      next: (charts) => {
        // Timeline Chart (Receitas vs Despesas)
        const allDates = Array.from(new Set([
          ...charts.incomesByDate.map(i => i.date),
          ...charts.expensesByDate.map(e => e.date)
        ])).sort();

        const incomesData = allDates.map(date => {
          const found = charts.incomesByDate.find(i => i.date === date);
          return found ? found.totalAmount : 0;
        });
        const expensesData = allDates.map(date => {
          const found = charts.expensesByDate.find(e => e.date === date);
          return found ? found.totalAmount : 0;
        });

        this.timelineChartData = {
          labels: allDates,
          datasets: [
            { data: incomesData, label: 'Receitas', borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.2)', fill: true },
            { data: expensesData, label: 'Despesas', borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.2)', fill: true }
          ]
        };

        // Expenses By Category
        this.expenseCategoryChartData = {
          labels: charts.expensesByCategory.map(c => c.categoryName),
          datasets: [{ 
            data: charts.expensesByCategory.map(c => c.totalAmount),
            backgroundColor: ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899']
          }]
        };

        // Incomes By Category
        this.incomeCategoryChartData = {
          labels: charts.incomesByCategory.map(c => c.categoryName),
          datasets: [{ 
            data: charts.incomesByCategory.map(c => c.totalAmount),
            backgroundColor: ['#3b82f6', '#14b8a6', '#22c55e', '#8b5cf6', '#ec4899', '#f59e0b']
          }]
        };

        this.cd.detectChanges();
      }
    });
  }
}
