import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categories, CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryFormComponent } from '../category-form/category-form';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class CategoriesComponent implements OnInit {
  categories: Categories[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        // Mapeamos os dados para garantir que campos visuais (cor, icon) 
        // existam mesmo que o Java não os envie ainda
        this.categories = data.map(cat => ({
          ...cat,
          color: cat.color || '#5c67ff', // Cor padrão caso venha null
          icon: cat.icon || 'category',  // Ícone padrão
          limitValue: cat.limitValue || 1000,
          spentValue: cat.spentValue || 0
        }));
        this.changeDetector.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  calculatePercentage(spent: number | undefined, limit: number | undefined): number {
    if (!spent || !limit || limit <= 0) return 0;
    const percent = (spent / limit) * 100;
    return Math.min(percent, 100); // Garante que a barra não "saia" do container
  }

  openCategoryForm(category?: any, mode: 'create' | 'edit' | 'view' = 'create') {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '100vh';
    dialogConfig.position = { right: '0', top: '0' };
    dialogConfig.panelClass = 'side-modal-container';

    // Passamos os dados para o Modal
    dialogConfig.data = { category, mode };

    const dialogRef = this.dialog.open(CategoryFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result && mode !== 'view') {
        if (mode === 'edit') {
          this.updateCategory(result);
        } else {
          this.saveCategory(result);
        }
      }
    });
  }
  private updateCategory(categoryData: any) {
    // O id vem de dentro do objeto que o formulário retornou
    this.categoryService.update(categoryData.id, categoryData).subscribe({
      next: () => {
        this.loadCategories(); // Recarrega a lista atualizada
      },
      error: (err) => console.error('Erro ao atualizar categoria', err)
    });
  }

  private saveCategory(categoryData: any) {
    this.categoryService.create(categoryData).subscribe({
      next: () => {
        this.loadCategories(); // Recarrega a lista do Back-end
      },
      error: (err) => console.error('Erro ao salvar categoria', err)
    });
  }
}