import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importe estes caras

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';       // Caminho do seu interceptor de auth
import { LoadingInterceptor } from './core/interceptors/loading-interceptor';
import { provideIcons } from '@ng-icons/core';
import { tablerBuildingBank, tablerCheck, tablerEdit, tablerEye, tablerHome, tablerLayoutDashboard, tablerLogout, tablerPlus, tablerReceipt, tablerReportAnalytics, tablerTags, tablerTrash, tablerTrendingDown, tablerTrendingUp, tablerUser, tablerWallet } from '@ng-icons/tabler-icons'

export const appConfig: ApplicationConfig = {
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withHashLocation()
    ),
    
    provideHttpClient(
      withInterceptors([
        LoadingInterceptor, 
        AuthInterceptor
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
      tablerReportAnalytics,
      tablerEdit,
      tablerTrash
    })
  ]
};