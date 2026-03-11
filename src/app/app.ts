import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarHeader } from "./features/navbar-header/navbar-header";
import { NavbarLateral } from './features/navbar-lateral/navbar-lateral';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { SideDrawerComponent } from './shared/drawer/side-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarHeader, NavbarLateral, LoaderComponent, SideDrawerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  private authService = inject(AuthService);
  private userService = inject(UserService);

  public isAppReady$ = this.userService.userIn$

  ngOnInit(): void {
    this.configureIfNotExistUser();
  }

  private configureIfNotExistUser() {
    const hasToken = this.authService.isAuthenticated();
    const hasUser = this.userService.getUser();

    if (hasToken && !hasUser) {
      this.userService.me().subscribe();
    }
  }
}