import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, NgIcon, ReactiveFormsModule, FormsModule],
  templateUrl: './login-register.html'
})
export class LoginRegister {

  showLogin = true;

  login = {
    email: '',
    password: ''
  };

  register = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  switchToRegister() {
    this.showLogin = false;
  }

  switchToLogin() {
    this.showLogin = true;
  }

  handleLogin() {
    console.log('Login', this.login);
  }

  handleRegister() {
    console.log('Register', this.register);
  }

}