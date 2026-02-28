import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login-register',
  standalone: true,
  styleUrl: 'login-register.scss',
  templateUrl: 'login-register.html',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginRegisterComponent {
  public isRegisterMode = false; // Controla a animação
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Ajustado para bater com a Interface RegisterType
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit(): void {
    if (this.isRegisterMode) {
      this.configureRegisterMode();
      return;
    }
    this.configureLoginMode();

  }

  private configureLoginMode(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => this.router.navigate(['/dashboard']),
      error: (err) => console.error(err)
    });
  }

  private configureRegisterMode(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => this.router.navigate(['/dashboard']),
      error: (err) => console.error(err)
    });
  }

  public toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }
}