import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ToastMessage, ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed z-50 top-4 right-4 flex flex-col items-end space-y-2 pointer-events-none"
    >
      <div
        *ngFor="let toast of toasts"
        class="pointer-events-auto w-full max-w-sm rounded-xl border px-4 py-3 shadow-lg flex flex-col gap-2 toast-slide-in"
        [ngClass]="{
          'bg-emerald-500/10 border-emerald-500/40 text-emerald-100': toast.type === 'success',
          'bg-red-500/10 border-red-500/40 text-red-100': toast.type === 'error',
          'bg-slate-700 border-slate-500/60 text-slate-100': toast.type === 'info'
        }"
      >
        <div class="flex items-start gap-3">
          <div class="flex-1 text-sm">
            {{ toast.text }}
          </div>
        </div>
        <div class="w-full h-0.5 overflow-hidden rounded-full bg-slate-600/40">
          <div class="h-full toast-progress bg-slate-200/80"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-slide-in {
      transform: translateX(-16px);
      opacity: 0;
      animation: toast-slide-in 0.25s ease-out forwards;
    }

    @keyframes toast-slide-in {
      from {
        transform: translateX(-16px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-progress {
      width: 100%;
      transform-origin: left;
      animation: toast-progress-linear 3s linear forwards;
    }

    @keyframes toast-progress-linear {
      from {
        transform: scaleX(1);
      }
      to {
        transform: scaleX(0);
      }
    }
  `]
})
export class ToastContainerComponent implements OnDestroy {

  toasts: ToastMessage[] = [];
  private sub;
  private timeouts = new Map<number, any>();

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.sub = this.toastService.toast$.subscribe((toast) => {
      // Mantém apenas o toast mais recente no topo
      this.toasts = [toast];

      const duration = toast.durationMs || 3000;
      const idToRemove = toast.id;

      // Limpa qualquer timeout anterior para esse id
      const existing = this.timeouts.get(idToRemove);
      if (existing) {
        clearTimeout(existing);
      }

      const handle = setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== idToRemove);
        this.timeouts.delete(idToRemove);
        this.cdr.detectChanges();
      }, duration);

      this.timeouts.set(idToRemove, handle);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.timeouts.forEach(handle => clearTimeout(handle));
    this.timeouts.clear();
  }
}

