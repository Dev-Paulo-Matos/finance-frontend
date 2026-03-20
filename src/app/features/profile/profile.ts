import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { UserService } from '../../core/services/user.service';

// Import icons globally or provide them
import { provideIcons } from '@ng-icons/core';
import { tablerUser, tablerPhone, tablerMail, tablerLock, tablerCheck } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  providers: [provideIcons({ tablerUser, tablerPhone, tablerMail, tablerLock, tablerCheck })],
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  profileForm!: FormGroup;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    const user = this.userService.getUser();
    
    this.profileForm = this.fb.group({
      name: [user?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [{ value: user?.email || '', disabled: true }],
      phone: [user?.phone || ''],
      password: ['']
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) return;
    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValues = this.profileForm.getRawValue();
    const updateData: any = {
      name: formValues.name,
      phone: formValues.phone
    };

    if (formValues.password && formValues.password.trim() !== '') {
      updateData.password = formValues.password;
    }

    this.userService.updateUser(updateData).subscribe({
      next: (res) => {
        this.isSaving = false;
        this.successMessage = 'Perfil atualizado com sucesso!';
        this.profileForm.get('password')?.setValue('');
        
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = 'Ocorreu um erro ao atualizar os dados.';
        console.error(err);
      }
    });
  }
}
