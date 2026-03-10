import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarHeader } from "./features/navbar-header/navbar-header";
import { NavbarLateral } from './features/navbar-lateral/navbar-lateral';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarHeader, NavbarLateral], // Importe o componente aqui
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  templateUrl: './app.html'
})
export class AppComponent {
  // ... sua lógica
}