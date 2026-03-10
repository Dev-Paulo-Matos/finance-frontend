import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importe estes caras

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';       // Caminho do seu interceptor de auth
import { LoadingInterceptor } from './core/interceptors/loading-interceptor';
import { provideIcons } from '@ng-icons/core';
import { tablerBuildingBank, tablerCheck, tablerEdit, tablerEye, tablerHome, tablerLayoutDashboard, tablerLogout, tablerPlus, tablerReceipt, tablerTags, tablerTrash, tablerTrendingDown, tablerTrendingUp, tablerUser, tablerWallet } from '@ng-icons/tabler-icons'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),
    
    // Adicionamos o Cliente HTTP com a lista de interceptors
    provideHttpClient(
      withInterceptors([
        LoadingInterceptor, // 1º Liga o loading
        AuthInterceptor     // 2º Adiciona o Token "Bearer ..."
      ])
    ),
     provideIcons({
      tablerHome,
      tablerBuildingBank,
      tablerTags,
      tablerReceipt,
      tablerWallet,
      tablerLayoutDashboard,
      tablerUser,
      tablerLogout,
      tablerTrendingUp,
      tablerTrendingDown,
      tablerPlus,
      tablerEdit
    })
  ]
};