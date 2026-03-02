import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isViewMode: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: any, mode: 'create' | 'edit' | 'view' }
  ) {
    this.isViewMode = this.data?.mode === 'view';
    this.isEditMode = this.data?.mode === 'edit';

    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      desc: ['', Validators.required],
      type: ['EXPENSE', Validators.required],
      limitValue: [0, [Validators.required, Validators.min(0)]],
      color: ['#5c67ff'],
      icon: ['category']
    });
  }

  ngOnInit(): void {
    if (this.data?.category) {
      this.form.patchValue(this.data.category);
      if (this.isViewMode) {
        this.form.disable(); // Desabilita todos os campos no modo View
      }
    }
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue()); // getRawValue para incluir campos desabilitados se necessário
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}