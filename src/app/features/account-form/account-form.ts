import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideDrawerService } from '../../core/services/side-drawer.service';
import { AccountService } from '../../core/services/account.service';
import { AccountRequest } from '../../../types/api-types';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.html'
})
export class AccountForm implements OnInit {

  private fb = inject(FormBuilder);
  public drawer = inject(SideDrawerService);
  private accountService = inject(AccountService);

  private id: number | null = null;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    desc: [''],
    balance: [0]
  });

  ngOnInit(): void {

    const data = this.drawer.data();

    if (data) {
      this.id = data.id;
      this.form.patchValue({
        name: data.name,
        desc: data.desc,
        balance: data.balance
      });
    }

  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Partial<AccountRequest> = this.form.getRawValue();

    if (this.id) {
      this.update(data);
      return;
    }

    this.create(data);

  }

  private create(data: Partial<AccountRequest>) {

    this.accountService.create(data).subscribe({
      next: () => {
        this.drawer.methodUpdateList()();
        this.drawer.close();
      }
    });

  }

  private update(data: Partial<AccountRequest>) {

    this.accountService.update(this.id!, data).subscribe({
      next: () => {
        this.drawer.methodUpdateList()();
        this.drawer.close();
      }
    });

  }

}