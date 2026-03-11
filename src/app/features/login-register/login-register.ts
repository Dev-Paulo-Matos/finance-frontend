import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  templateUrl: './login-register.html'
})
export class LoginRegister {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private userService = inject(UserService);

  showLogin = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  switchToRegister() {
    this.showLogin = false;
  }

  switchToLogin() {
    this.showLogin = true;
  }

  handleLogin() {

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login({
      email: email!,
      password: password!
    }).subscribe({
      next: () =>this.router.navigate(['dashboard']),
      error: (err) => {
        console.error('Erro login', err);
      }
    });
  }

  handleRegister() {

    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;

    this.authService.register({
      userName: email!,
      name: name!,
      email: email!,
      password: password!,
      passCode: 'default'
    }).subscribe({
      next: () =>this.router.navigate(['dashboard']),
      error: (err) => {
        console.error('Erro register', err);
      }
    });

  }

}