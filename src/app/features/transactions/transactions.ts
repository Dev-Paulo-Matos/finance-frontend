import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { TransactionService } from '../../core/services/transacoes.service';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { TransactionForm } from '../transaction-form/transaction-form';
import { FormsModule } from '@angular/forms';
import { AccountResponse, CategoryResponse, TransactionFilter, TransactionResponse, TransactionType } from '../../../types/api-types';
import { AccountService } from '../../core/services/account.service';
import { CategoryService } from '../../core/services/category.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, NgIcon, FormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {

  private transactionService = inject(TransactionService);
  private accountService = inject(AccountService);
  private categoryService = inject(CategoryService);
  private drawer = inject(SideDrawerService)
  private cd = inject(ChangeDetectorRef);

  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  transactions: TransactionResponse[] = [];
  accounts: AccountResponse[] = [];
  categories: CategoryResponse[] = [];

  filter: Partial<TransactionFilter> = {
    description: '',
    type: undefined,
    accountId: undefined,
    categoryId: undefined
  };

  transactionTypes = Object.values(TransactionType);

  ngOnInit(): void {
    this.getAllTransactions();
    this.loadFilters();
  }

  loadFilters() {
    this.accountService.getAll(0, 100).subscribe(res => this.accounts = res.data);
    this.categoryService.getAll(0, 100).subscribe(res => this.categories = res.data);
  }

  getAllTransactions() {
    let params = new HttpParams()
      .set('page', this.page.toString())
      .set('size', this.size.toString());

    if (this.filter.description) params = params.set('description', this.filter.description);
    if (this.filter.type) params = params.set('type', this.filter.type);
    if (this.filter.accountId) params = params.set('accountId', this.filter.accountId.toString());
    if (this.filter.categoryId) params = params.set('categoryId', this.filter.categoryId.toString());
    if (this.filter.startDate) params = params.set('startDate', this.filter.startDate);
    if (this.filter.endDate) params = params.set('endDate', this.filter.endDate);
    if (this.filter.minAmount) params = params.set('minAmount', this.filter.minAmount.toString());
    if (this.filter.maxAmount) params = params.set('maxAmount', this.filter.maxAmount.toString());

    this.transactionService.getAll(params).subscribe({
      next: (response) => {
        this.transactions = response.data;
        this.totalElements = response.total;
        this.totalPages = response.totalPages;
        this.cd.detectChanges();
      }
    });
  }

  applyFilter() {
    this.page = 0;
    this.getAllTransactions();
  }

  clearFilter() {
    this.filter = {
      description: '',
      type: undefined,
      accountId: undefined,
      categoryId: undefined
    };
    this.applyFilter();
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

    if (this.page + 1 >= this.totalPages) {
      return
    };

    this.page++;
    this.getAllTransactions();

  }

  previousPage() {
    if (this.page === 0) {
      return;
    }
    this.page--;
    this.getAllTransactions();

  }

}