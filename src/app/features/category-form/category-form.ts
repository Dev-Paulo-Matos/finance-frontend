import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/finance.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.html'
})
export class CategoriesForm {

  private fb = inject(FormBuilder);
  public drawer = inject(SideDrawerService);
  private categoryService = inject(CategoryService);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    descriptor: [''],
    transactionType: ['EXPENSE' as 'EXPENSE' | 'INCOME', Validators.required],
    limitValue: [0],
    color: ['#22c55e'],
    icon: ['']
  });

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Partial<Category> = this.form.getRawValue();

    this.categoryService.create(data).subscribe({
      next: () => {
        this.form.reset();
        this.drawer.close();
      }
    });

  }

}