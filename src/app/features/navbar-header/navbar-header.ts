import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-navbar-header',
  imports: [CommonModule, NgIcon, RouterModule],
  templateUrl: './navbar-header.html',
  styleUrl: './navbar-header.scss',
})
export class NavbarHeader {
  private authService = inject(AuthService)
  private userService = inject(UserService);
  public user = this.userService.getUser();
  public logout() {
    this.authService.logout();
  }
}
