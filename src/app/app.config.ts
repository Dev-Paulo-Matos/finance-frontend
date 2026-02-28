import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importe estes caras

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';       // Caminho do seu interceptor de auth
import { LoadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    
    // Adicionamos o Cliente HTTP com a lista de interceptors
    provideHttpClient(
      withInterceptors([
        LoadingInterceptor, // 1º Liga o loading
        AuthInterceptor     // 2º Adiciona o Token "Bearer ..."
      ])
    )
  ]
};