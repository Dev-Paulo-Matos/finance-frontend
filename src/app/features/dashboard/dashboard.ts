import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { tablerTrendingDown, tablerWallet } from '@ng-icons/tabler-icons';
import { TransactionService } from '../../core/services/transacoes.service';
import { TransactionResponse } from '../../../types/api-types';
import { HttpParams } from '@angular/common/http';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private transactionService = inject(TransactionService);
  private accountService = inject(AccountService)
  private cd = inject(ChangeDetectorRef);
  public mountAll = 0;
  public transactions: TransactionResponse[] = [];

  ngOnInit(): void {
    this.getAllTransactions();
    this.getAllMountByAccounts();
  }

  private getAllMountByAccounts() {
    this.accountService.getMountAll().subscribe({
      next: (value) => {
        this.mountAll = value
      }
    })
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
}
