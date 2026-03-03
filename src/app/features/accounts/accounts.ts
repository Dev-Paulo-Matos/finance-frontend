import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Account, AccountService } from '../../core/services/account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountFormComponent } from '../account-form/account-form';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.scss'],
  imports: [CommonModule, MatIcon, MatMenu,MatMenuTrigger]
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAll().subscribe({
      next: (data) => {
        this.accounts = data
        this.changeDetector.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar contas', err)
    });
  }

  getTotalBalance(): number {
    return this.accounts.reduce((acc, current) => acc + current.balance, 0);
  }

  openAccountForm(account?: Account, mode: 'create' | 'edit' | 'view' = 'create') {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '100vh';
    dialogConfig.position = { right: '0', top: '0' };
    dialogConfig.panelClass = 'side-modal-container';
    dialogConfig.data = { account, mode };

    const dialogRef = this.dialog.open(AccountFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'edit') {
          this.accountService.update(result.id, result).subscribe(() => this.loadAccounts());
        } else {
          this.accountService.create(result).subscribe(() => this.loadAccounts());
        }
      }
    });
  }

  deleteAccount(id: number) {
    if (confirm('Deseja realmente excluir esta conta?')) {
      this.accountService.delete(id).subscribe(() => this.loadAccounts());
    }
  }

  
}