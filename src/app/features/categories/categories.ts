import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { CategoriesForm } from '../category-form/category-form';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/finance.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class CategoriesComponent implements OnInit {

  private drawer = inject(SideDrawerService);
  private categoryService = inject(CategoryService);

  public categories: Category[] = [];

  ngOnInit(): void {
    this.getAllItens();
  }

  public novaCategoriaDrawer() {
    this.drawer.open(CategoriesForm, {
      title: 'Nova categoria'
    });
  }

  public getAllItens() {

    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });

  }

}