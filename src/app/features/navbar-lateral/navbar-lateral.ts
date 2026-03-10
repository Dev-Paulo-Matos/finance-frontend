import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-navbar-lateral',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgIcon
  ],
  templateUrl: './navbar-lateral.html',
  styleUrl: './navbar-lateral.scss',
})
export class NavbarLateral {}