import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { CategoryService } from '../../core/services/category.service';
import { CategoryRequest, TransactionType } from '@api-types';
import { FormFieldErrorComponent } from '../../shared/form-field-error/form-field-error.component';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldErrorComponent],
  templateUrl: './category-form.html'
})
export class CategoriesForm implements OnInit {

  private fb = inject(FormBuilder);
  public drawer = inject(SideDrawerService);
  private categoryService = inject(CategoryService);
  private id: number | null = null;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    desc: [''],
    type: ['EXPENSE' as TransactionType, Validators.required],
    limitValue: [0],
    color: ['#22c55e'],
    icon: ['']
  });

  ngOnInit(): void {
    const data = this.drawer.data();
    if(!!data) {
      this.id = data?.id
      this.form.patchValue({
        ...data
      })
    }
      
  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Partial<CategoryRequest> = this.form.getRawValue();

    if(this.id) {
      this.methodUpdate(data);
      return;
    }
    this.methodCreate(data);
  }


  private methodCreate(data: Partial<CategoryRequest>) {
    this.categoryService.create(data).subscribe({
      next: () => {
        this.form.reset();
        this.drawer.methodUpdateList().apply(this);
        this.drawer.close();
      }
    });
  }

  private methodUpdate(data: Partial<CategoryRequest>) {
    this.categoryService.update(this.id ?? 0, data).subscribe({
      next: () => {
        this.form.reset();
        this.drawer.methodUpdateList().apply(this);
        this.drawer.close();
      }
    });
  }
}