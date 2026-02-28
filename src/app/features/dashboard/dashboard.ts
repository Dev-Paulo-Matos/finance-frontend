import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'; // Adicione este

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  userName: string = 'Paulo Matos';
  activeTab: 'contas' | 'transacoes' | 'categorias' = 'contas';

  // Dados Fictícios
  contas = [{ banco: 'Nubank', tipo: 'Corrente', saldo: 2500 }, { banco: 'Itaú', tipo: 'Investimento', saldo: 15000 }];
  transacoes = [{ data: '20/05', desc: 'Mercado', valor: -150 }, { data: '21/05', desc: 'Salário', valor: 5000 }];
  categorias = [{ nome: 'Alimentação', limite: 500, gasto: 420 }, { nome: 'Lazer', limite: 300, gasto: 50 }];

  setTab(tab: 'contas' | 'transacoes' | 'categorias') {
    this.activeTab = tab;
  }
}