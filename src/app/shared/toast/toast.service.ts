import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
  durationMs: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<ToastMessage>();
  public toast$ = this.toastSubject.asObservable();

  private counter = 0;

  show(type: ToastType, text: string, durationMs = 3000) {
    const id = ++this.counter;
    const toast: ToastMessage = { id, type, text, durationMs };
    this.toastSubject.next(toast);

    // Consumers can auto-remove using the id and duration if needed
  }
}

