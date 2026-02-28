import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface Category {
  name: string;
  icon: string;
  limit: number;
  spent: number;
  color: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class CategoriesComponent {
  categories: Category[] = [
    { name: 'Alimentação', icon: 'restaurant', limit: 1200, spent: 850, color: '#ff60a8' },
    { name: 'Transporte', icon: 'directions_car', limit: 500, spent: 480, color: '#5c67ff' },
    { name: 'Lazer', icon: 'Confirmation_number', limit: 400, spent: 150, color: '#ffbc02' },
    { name: 'Saúde', icon: 'medical_services', limit: 300, spent: 50, color: '#2ecc71' },
    { name: 'Educação', icon: 'school', limit: 1000, spent: 1000, color: '#9b59b6' },
    { name: 'Assinaturas', icon: 'subscriptions', limit: 200, spent: 210, color: '#e74c3c' }
  ];

  calculatePercentage(spent: number, limit: number): number {
    const percent = (spent / limit) * 100;
    return percent > 100 ? 100 : percent;
  }
}