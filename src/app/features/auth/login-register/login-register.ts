import { ChangeDetectorRef, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

// Imports Corretos do Angular Material
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../../core/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-login-register',
  standalone: true,
  styleUrl: 'login-register.scss',
  templateUrl: 'login-register.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule
  ]
})
export class LoginRegisterComponent {
  public isRegisterMode = false;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onSubmit(): void {
    this.isRegisterMode ? this.configureRegisterMode() : this.configureLoginMode();
  }

  private configureLoginMode(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.errorMessage = null;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.errorMessage = "Email ou senha inválidos."
        this.cdr.detectChanges();
      }
    });
  }

  private configureRegisterMode(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => this.router.navigate(['/dashboard']),
      error: (err: HttpErrorResponse) => {
        if (err.error && err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = "Erro interno no servidor. Tente mais tarde.";
        }
        this.cdr.detectChanges();
        console.error('Erro detalhado:', err);
      }
    });
  }

  public toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = null; // Limpa o erro ao trocar de tela
  }
}