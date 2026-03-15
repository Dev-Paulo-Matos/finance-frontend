import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { AccountForm } from '../account-form/account-form';
import { AccountService } from '../../core/services/account.service';
import { AccountResponse } from '../../../types/api-types';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Accounts implements OnInit {

  private drawer = inject(SideDrawerService);
  private accountService = inject(AccountService);
  private cd = inject(ChangeDetectorRef)

  accounts: AccountResponse[] = [];

  page = 0;
  size = 10;

  totalPages = 0;
  totalElements = 0;

  ngOnInit(): void {
    this.getAllAccounts();
  }

  novaContaDrawer() {
    this.drawer.open(AccountForm, {
      title: 'Nova Conta',
      methodUpdateList: this.getAllAccounts.bind(this)
    });
  }

  getAllAccounts() {

    this.accountService.getAll(this.page, this.size).subscribe({

      next: (response) => {
        console.log(response)
        this.accounts = response.data;
        this.totalPages = response.totalPages;
        this.totalElements = response.total;

        this.cd.detectChanges();

      }

    });

  }

  editAccount(account: AccountResponse) {
    this.drawer.open(AccountForm, {
      title: 'Editar Conta',
      data: account,
      methodUpdateList: this.getAllAccounts.bind(this)
    });
  }

  deleteAccount(account: AccountResponse) {

    const confirmDelete = confirm(`Excluir conta "${account.name}"?`);

    if (!confirmDelete) return;

    this.accountService.delete(account.id).subscribe({
      next: () => this.getAllAccounts()
    });

  }

  nextPage() {

    if (this.page + 1 >= this.totalPages) return;

    this.page++;
    this.getAllAccounts();

  }

  previousPage() {

    if (this.page === 0) return;

    this.page--;
    this.getAllAccounts();

  }

}