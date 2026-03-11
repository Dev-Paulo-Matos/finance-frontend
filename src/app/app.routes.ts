import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

export const routes: Routes = [

  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
            .then(m => m.Dashboard),
        data: { animation: 'dashboard' }
      },

      {
        path: 'accounts',
        loadComponent: () =>
          import('./features/accounts/accounts')
            .then(m => m.Accounts),
        data: { animation: 'accounts' }
      },

      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories')
            .then(m => m.CategoriesComponent),
        data: { animation: 'categories' }
      },

      {
        path: 'transactions',
        loadComponent: () =>
          import('./features/transactions/transactions')
            .then(m => m.Transactions),
        data: { animation: 'transactions' }
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: 'login-register',
    canActivate: [GuestGuard],
    loadComponent: () =>
      import('./features/login-register/login-register')
        .then(m => m.LoginRegister)
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];