import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { AccountForm } from '../account-form/account-form';
import { Account, AccountService } from '../../core/services/account.service';

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

  accounts: Account[] = [];

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
    this.accountService.getAll().subscribe({
      next: (value) => {
        this.accounts = value;
        this.cd.detectChanges();
      }
    });
  }

  editAccount(account: Account) {
    this.drawer.open(AccountForm, {
      title: 'Editar Conta',
      data: account,
      methodUpdateList: this.getAllAccounts.bind(this)
    });
  }

  deleteAccount(account: Account) {

    const confirmDelete = confirm(`Excluir conta "${account.name}"?`);

    if (!confirmDelete) return;

    this.accountService.delete(account.id).subscribe({
      next: () => this.getAllAccounts()
    });

  }

}