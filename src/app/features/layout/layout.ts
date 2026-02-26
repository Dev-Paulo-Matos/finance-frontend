import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  public isLoggedIn = false;

  public logout() {
    this.isLoggedIn = false;
  }
}
