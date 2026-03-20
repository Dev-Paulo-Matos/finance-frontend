import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormFieldErrorComponent } from '../../shared/form-field-error/form-field-error.component';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon, FormFieldErrorComponent],
  templateUrl: './login-register.html'
})
export class LoginRegister {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  showLogin = true;

  loginErrorMessage: string | null = null;
  registerErrorMessage: string | null = null;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.passwordMatchValidator }
  );

  switchToRegister() {
    this.showLogin = false;
    this.loginErrorMessage = null;
    this.registerErrorMessage = null;
  }

  switchToLogin() {
    this.showLogin = true;
    this.loginErrorMessage = null;
    this.registerErrorMessage = null;
  }

  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value as string) || '';
    const digits = value.replace(/\D/g, '');

    if (!digits) {
      return { invalidPhone: true };
    }

    if (digits.length < 10 || digits.length > 11) {
      return { invalidPhone: true };
    }

    return null;
  }

  private extractErrorMessage(err: any, fallback: string): string {
    const backendError = err?.error;

    if (!backendError) {
      return err?.message || err?.statusText || fallback;
    }

    if (typeof backendError === 'string') {
      return backendError || fallback;
    }

    if (backendError.message) return backendError.message;
    if (backendError.detail) return backendError.detail;
    if (backendError.error) return backendError.error;
    if (backendError.title) return backendError.title;

    if (Array.isArray(backendError.errors) && backendError.errors.length > 0) {
      const first = backendError.errors[0];
      return first.message || first.defaultMessage || fallback;
    }

    return fallback;
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get passwordsDoNotMatch(): boolean {
    const groupHasError = this.registerForm.hasError('passwordMismatch');
    const confirmTouched = this.registerForm.get('confirmPassword')?.touched;
    return !!groupHasError && !!confirmTouched;
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '').slice(0, 11);

    let formatted = '';

    if (digits.length > 0) {
      if (digits.length <= 2) {
        formatted = `(${digits}`;
      } else if (digits.length <= 6) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length <= 10) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }
    }

    this.registerForm.get('phone')?.setValue(formatted, { emitEvent: false });
  }

  handleLogin() {

    if (this.loginForm.invalid) return;

    this.loginErrorMessage = null;

    const { email, password } = this.loginForm.value;

    this.authService
      .login({
        email: email!,
        password: password!
      })
      .subscribe({
        next: () => this.router.navigate(['app', 'dashboard']),
        error: (err) => {
          console.error('Erro login', err);
          const message = this.extractErrorMessage(
            err,
            'Não foi possível fazer login. Verifique suas credenciais e tente novamente.'
          );
          // Não exibimos mais erros de API no card, apenas no toast
          this.toastService.show('error', message);
        }
      });
  }

  handleRegister() {

    if (this.registerForm.invalid) return;

    this.registerErrorMessage = null;

    const { name, email, password, phone } = this.registerForm.value;

    this.authService
      .register({
        userName: email!,
        name: name!,
        email: email!,
        password: password!,
        passCode: 'default',
        phone: phone!
      })
      .subscribe({
        next: () => this.router.navigate(['app', 'dashboard']),
        error: (err) => {
          console.error('Erro register', err);
          const message = this.extractErrorMessage(
            err,
            'Não foi possível criar sua conta. Tente novamente em alguns instantes.'
          );
          // Não exibimos mais erros de API no card, apenas no toast
          this.toastService.show('error', message);
        }
      });

  }

}