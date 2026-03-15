import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { TransactionService } from '../../core/services/transacoes.service';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { TransactionForm } from '../transaction-form/transaction-form';
import { TransactionResponse } from '../../../types/api-types';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {

  private transactionService = inject(TransactionService);
  private drawer = inject(SideDrawerService)
  private cd = inject(ChangeDetectorRef);

  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  transactions: TransactionResponse[] = [];

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAll().subscribe({
      next: (response) => {
        this.transactions = response.data;
        this.totalElements = response.total;
        this.totalPages = response.totalPages;
        this.cd.detectChanges();
      }
    });
  }

  deleteTransaction(transaction: TransactionResponse) {

    if (!transaction.id) {
      return
    };

    const confirmDelete = confirm('Deseja excluir esta transação?');

    if (!confirmDelete) {
      return
    };

    this.transactionService.delete(`${transaction.id}`)
      .subscribe(() => this.getAllTransactions());

  }

  editTransaction(transaction: TransactionResponse) {

    this.drawer.open(TransactionForm, {
      title: 'Editar Transação',
      data: transaction,
      methodUpdateList: this.getAllTransactions.bind(this)
    });

  }

  novaTransactionDrawer() {
    this.drawer.open(TransactionForm, {
      title: 'Nova Transação',
      methodUpdateList: this.getAllTransactions.bind(this)
    });
  }

  nextPage() {

    if (this.page + 1 >= this.totalPages){
     return
    };

    this.page++;
    this.getAllTransactions();

  }

  previousPage() {
    if (this.page === 0){ 
      return;
    }
    this.page--;
    this.getAllTransactions();

  }

}