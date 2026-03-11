import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    @if (loadingService.isLoading()) {

      <div class="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">

        <div class="flex flex-col items-center gap-6 bg-slate-800/80 border border-slate-700 px-10 py-8 rounded-2xl shadow-2xl">

          <!-- Spinner -->
          <div class="relative w-16 h-16">

            <div class="absolute inset-0 rounded-full border-4 border-slate-600"></div>

            <div class="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>

          </div>

          <!-- Texto -->
          <div class="text-center">

            <p class="text-lg font-semibold text-white">
              Carregando
            </p>

            <p class="text-sm text-slate-400">
              Aguarde um instante...
            </p>

          </div>

          <!-- Barra animada -->
          <div class="w-48 h-1 bg-slate-700 rounded-full overflow-hidden">

            <div class="h-full w-1/2 bg-emerald-500 animate-loading-bar"></div>

          </div>

        </div>

      </div>

    }
  `
})
export class LoaderComponent {

  loadingService = inject(LoadingService);

}