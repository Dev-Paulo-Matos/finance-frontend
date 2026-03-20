import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { CategoriesForm } from '../category-form/category-form';
import { CategoryService } from '../../core/services/category.service';
import { CategoriesFilter, CategoryResponse, TransactionType } from '@api-types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgIcon, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class CategoriesComponent implements OnInit {

  private drawer = inject(SideDrawerService);
  private categoryService = inject(CategoryService);

  public categories: CategoryResponse[] = [];
  private cd = inject(ChangeDetectorRef);

  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  filter: Partial<CategoriesFilter> = {
    name: '',
    transactionType: undefined
  };

  transactionTypes = Object.values(TransactionType);

  ngOnInit(): void {
    this.getAllItens();
  }

  public novaCategoriaDrawer() {
    this.drawer.open(CategoriesForm, {
      title: 'Nova categoria',
      methodUpdateList: this.getAllItens.bind(this)
    });
  }

  public getAllItens() {

    this.categoryService.getAll(this.page, this.size, this.filter).subscribe({
      next: (categories) => {
        this.categories = categories.data;
        this.totalPages = categories.totalPages;
        this.totalElements = categories.total
        this.cd.detectChanges();
      }
    });

  }

  applyFilter() {
    this.page = 0;
    this.getAllItens();
  }

  clearFilter() {
    this.filter = {
      name: '',
      transactionType: undefined
    };
    this.applyFilter();
  }

  public deleteCategory(category: CategoryResponse) {
    this.categoryService.delete(category.id).subscribe(() => this.getAllItens())
  }

  public btnEdit(category: CategoryResponse) {
     this.drawer.open(CategoriesForm, {
      title: 'Editar categoria',
      data: category,
      methodUpdateList: this.getAllItens.bind(this)
    });
  }


  nextPage() {

    if (this.page + 1 >= this.totalPages){
     return
    };

    this.page++;
    this.getAllItens();

  }

  previousPage() {
    if (this.page === 0){ 
      return;
    }
    this.page--;
    this.getAllItens();

  }
}