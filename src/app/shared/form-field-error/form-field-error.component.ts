import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="control && showError"
      class="mt-1 text-xs text-red-400"
    >
      <ng-container *ngFor="let errorKey of errorKeys">
        <span *ngIf="control.errors?.[errorKey]">
          {{ resolveMessage(errorKey, control.errors![errorKey]) }}
        </span>
      </ng-container>
    </div>
  `
})
export class FormFieldErrorComponent {

  @Input() control: AbstractControl | null = null;
  @Input() customMessages: { [key: string]: string } | null = null;

  get showError(): boolean {
    return !!this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get errorKeys(): string[] {
    if (!this.control || !this.control.errors) {
      return [];
    }
    return Object.keys(this.control.errors);
  }

  resolveMessage(errorKey: string, errorValue: ValidationErrors[keyof ValidationErrors]): string {
    if (this.customMessages && this.customMessages[errorKey]) {
      return this.customMessages[errorKey];
    }

    switch (errorKey) {
      case 'required':
        return 'Campo obrigatório.';
      case 'email':
        return 'Informe um e-mail válido.';
      case 'minlength':
        return `Informe ao menos ${(errorValue as { requiredLength: number }).requiredLength} caracteres.`;
      case 'maxlength':
        return `Informe no máximo ${(errorValue as { requiredLength: number }).requiredLength} caracteres.`;
      case 'pattern':
        return 'Valor inválido.';
      case 'passwordMismatch':
        return 'As senhas não coincidem.';
      default:
        return 'Valor inválido.';
    }
  }

}

