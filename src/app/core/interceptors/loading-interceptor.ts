import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { delay, finalize } from 'rxjs'; // Importa o delay aqui

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  loadingService.show(); // Liga o esqueleto

  return next(req).pipe(
    // Adiciona 1.5 segundos (1500ms) de atraso proposital
    delay(1500), 
    
    // Quando terminar (mesmo com erro), esconde o esqueleto
    finalize(() => loadingService.hide())
  );
};