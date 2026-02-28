import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../core/services/loading.service';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterLink, 
    RouterLinkActive,
    MatSpinner
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  public isLoggedIn = false;


  constructor(private readonly AuthService: AuthService, private readonly router: Router, public readonly loadingService: LoadingService) {
  }

  public ngOnInit(): void {
      this.AuthService.isLoggedIn$.subscribe(value => {
        this.isLoggedIn = value
      })
  }

  public logout(): void {
    this.AuthService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login'])
  }
}
