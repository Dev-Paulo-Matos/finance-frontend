import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  private requests = signal(0);

  // estado público
  public isLoading = computed(() => this.requests() > 0);

  show() {
    this.requests.update(v => v + 1);
  }

  hide() {
    this.requests.update(v => Math.max(0, v - 1));
  }

}