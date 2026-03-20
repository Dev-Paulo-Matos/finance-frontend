import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './landing.component.html'
})
export class LandingComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  readonly currentYear = new Date().getFullYear();

  navigateToApp() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
      return;
    }

    this.router.navigate(['login-register']);
  }

}

