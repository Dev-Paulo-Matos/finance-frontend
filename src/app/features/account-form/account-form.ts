import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './account-form.html',
  styleUrl: './account-form.scss'
})
export class AccountFormComponent implements OnInit {
  form: FormGroup;
  isViewMode: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account: any, mode: 'create' | 'edit' | 'view' }
  ) {
    this.isViewMode = this.data?.mode === 'view';
    this.isEditMode = this.data?.mode === 'edit';

    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      desc: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.data?.account) {
      this.form.patchValue(this.data.account);
      if (this.isViewMode) this.form.disable();
    }
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}