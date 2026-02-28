import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './features/auth/login-register/login-register';
import { DashboardComponent } from './features/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.guard';
import { TransactionsComponent } from './features/transactions/transactions';
import { AccountsComponent } from './features/accounts/accounts';
import { CategoriesComponent } from './features/categories/categories';

export const routes: Routes = [
    {
        component: LoginRegisterComponent,
        path: 'login',
        
    },
    {
        component: DashboardComponent,
        path: 'dashboard',
        canActivate: [AuthGuard]
    },
    {
        component: TransactionsComponent,
        path: 'transactions',
        canActivate: [AuthGuard]
    },
    {
        component: AccountsComponent,
        path: 'accounts',
        canActivate: [AuthGuard]
    },
     {
        component: CategoriesComponent,
        path: 'categories',
        canActivate: [AuthGuard]
    },
];
