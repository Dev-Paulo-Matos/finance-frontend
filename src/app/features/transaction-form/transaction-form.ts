import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { Categories, CategoryService } from '../../core/services/category.service';
import { Account, AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.html',
  styleUrls: ['./transaction-form.scss'],
  providers: [provideNativeDateAdapter()], // Isso resolve o erro de DateAdapter
  imports: [CommonModule, MatFormField, MatLabel, MatOption, MatSelect, MatDialogActions, MatDialogContent, MatButtonToggle, MatButtonToggleGroup, ReactiveFormsModule, MatDatepicker, MatDatepickerToggle, MatDatepicker, MatDatepickerInput, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatSelectModule]
})
export class TransactionFormComponent implements OnInit {
  form: FormGroup;
  public accounts: Account[] = [];
  public categories: Categories[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionFormComponent>,
    private categoriaService: CategoryService,
    private accountService: AccountService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [null],
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: [new Date(), Validators.required],
      type: ['EXPENSE', Validators.required],
      accountId: [null, Validators.required],
      categoryId: [null, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.configureInitial();
    this.configureAccount();
    this.configureCategoria();
  }

  private configureAccount(): void {
    this.accountService.getAll().subscribe(value => {
      this.accounts = value;
      this.cd.detectChanges();

    });
  }

  private configureCategoria(): void {
    this.categoriaService.getAll().subscribe(value => {
      this.categories = value;
      this.cd.detectChanges();
    });
  }

  private configureInitial() {
    if (this.data?.transaction) {
      this.form.patchValue({
        ...this.data.transaction,
        accountId: this.data.transaction?.account?.id,
        categoryId: this.data.transaction?.category?.id
      });
      if (this.data.mode === 'view') {
        this.form.disable();
      }
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}