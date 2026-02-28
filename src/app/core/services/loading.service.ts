import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  // Usamos WritableSignal para performance (Angular 17+)
  public isLoading = signal(false);

  show() { this.isLoading.set(true); }
  hide() { this.isLoading.set(false); }
}