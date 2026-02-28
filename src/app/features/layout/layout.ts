import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

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
export class Layout implements OnInit {
  public isLoggedIn = false;

  constructor(private readonly AuthService: AuthService) {

  }

  public ngOnInit(): void {
      this.AuthService.isLoggedIn$.subscribe(value => {
        this.isLoggedIn = value
      })
  }

  public logout(): void {
    this.AuthService.logout();
  }
}
