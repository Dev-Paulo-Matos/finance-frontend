import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  private cd = inject(ChangeDetectorRef)

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

    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.cd.detectChanges();
      }
    });

  }

  public deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(() => this.getAllItens())
  }

  public btnEdit(category: Category) {
     this.drawer.open(CategoriesForm, {
      title: 'Editar categoria',
      data: category,
      methodUpdateList: this.getAllItens.bind(this)
    });
  }

}