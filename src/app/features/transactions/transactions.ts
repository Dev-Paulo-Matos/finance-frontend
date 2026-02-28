import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

export interface TransactionData {
  id: number;
  date: string;
  description: string;
  category: string;
  value: number;
  status: 'completed' | 'pending' | 'failed';
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, 
    MatSortModule, MatButtonModule, MatIconModule, MatChipsModule
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'description', 'category', 'value', 'status', 'actions'];
  dataSource: MatTableDataSource<TransactionData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Dados Fictícios para teste
    const transactions: TransactionData[] = [
      { id: 1, date: '2026-02-27', description: 'Apple Store', category: 'Eletrônicos', value: -1200.00, status: 'completed' },
      { id: 2, date: '2026-02-26', description: 'Salário Mensal', category: 'Renda', value: 5500.00, status: 'completed' },
      { id: 3, date: '2026-02-25', description: 'Supermercado BH', category: 'Alimentação', value: -450.25, status: 'pending' },
      { id: 4, date: '2026-02-24', description: 'Netflix', category: 'Lazer', value: -55.90, status: 'completed' },
      // Adicione mais para testar o scroll/paginação...
    ];
    this.dataSource = new MatTableDataSource(transactions);
  }

  ngOnInit() {
    // Conecta a paginação após a view carregar
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addTransaction() {
    console.log('Abrir modal de nova transação');
  }
}