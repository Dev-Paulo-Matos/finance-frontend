import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; // Certifique-on de importar o Module e não só o MatMenu
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Transaction, TransactionService } from '../../core/services/transacoes.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class TransactionsComponent implements OnInit {
  // Seus dados mockados
  transactions: Transaction[] = [];

  constructor(private dialog: MatDialog, private transactionsService: TransactionService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.configureList();
  }

  private configureList() {
    this.transactionsService.getAll().subscribe(value => {this.transactions = value; this.cd.detectChanges();});
  }

  openTransactionForm(transaction: any = null, mode: 'create' | 'edit' | 'view' = 'create') {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      width: '450px',
      maxWidth: '100vw',
      panelClass: 'side-modal-container', // Sua classe de modal lateral
      position: { right: '0', top: '0' },
      data: { transaction, mode }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (mode === 'view' || !result) {
        return;
      }
      if (mode === 'create') {
        this.transactionsService.create(result).subscribe(() => this.configureList());
        return;
      }
      if (mode === 'edit') {
        this.transactionsService.update(result?.id, result).subscribe(() => this.configureList());
      }
    });
  }

  deleteTransaction(id: number | undefined) {
    if(id) {
      this.transactionsService.delete(id).subscribe(() => this.configureList());
    }
  }
} 
