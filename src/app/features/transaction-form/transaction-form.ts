import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TransactionService } from '../../core/services/transacoes.service';
import { AccountService } from '../../core/services/account.service';
import { CategoryService } from '../../core/services/category.service';

import { SideDrawerService } from '../../core/services/side-drawer.service';
import { AccountResponse, CategoryResponse, TransactionResponse } from '../../../types/api-types';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss'
})
export class TransactionForm implements OnInit {

  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);
  private accountService = inject(AccountService);
  private categoryService = inject(CategoryService);
  public drawer = inject(SideDrawerService);
  private cd = inject(ChangeDetectorRef)

  accounts: AccountResponse[] = [];
  categories: CategoryResponse[] = [];

  transactionEdit?: TransactionResponse;

  form = this.fb.group({
    description: ['', Validators.required],
    amount: [0, Validators.required],
    date: ['', Validators.required],
    type: ['EXPENSE', Validators.required],
    accountId: [null, Validators.required],
    categoryId: [null, Validators.required]
  });

  ngOnInit(): void {

    this.loadAccounts();
    this.loadCategories();

    const data = this.drawer.data();

    if (data) {
      this.transactionEdit = data;

      this.form.patchValue({
        description: data.description,
        amount: data.amount,
        date: data.date,
        type: data.type,
        accountId: data.account?.id,
        categoryId: data.category?.id
      });
    }
  }

  loadAccounts() {
    this.accountService.getAll()
      .subscribe(response => {
        this.accounts = response.data
        this.cd.detectChanges();
      });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response.data;
      this.cd.detectChanges();
    });
  }

  submit() {

    if (this.form.invalid) {
      return
    };

    const formValue = this.form.value;

    const payload: any = {
      description: formValue.description,
      amount: formValue.amount,
      date: formValue.date,
      type: formValue.type,
      account: { id: formValue.accountId },
      category: { id: formValue.categoryId }
    };

    if (this.transactionEdit?.id) {
        this.methodUpdate(payload);
      return;
    }
    this.methodCreate(payload);
  }


  private methodCreate(payload: any) {
    this.transactionService.create(payload).subscribe(() => {
      this.drawer.methodUpdateList().apply(this);
      this.drawer.close();
      this.cd.detectChanges();
    });
  }

  private methodUpdate(payload: any) {
    this.transactionService.update(`${this.transactionEdit!.id!}`, payload).subscribe(() => {
      this.drawer.methodUpdateList().apply(this);
      this.drawer.close();
      this.cd.detectChanges();
    });
  }

}