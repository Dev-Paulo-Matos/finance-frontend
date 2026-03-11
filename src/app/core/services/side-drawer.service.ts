import { Injectable, signal, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideDrawerService {

  isOpen = signal(false);
  title = signal('');
  component = signal<Type<any> | null>(null);
  data = signal<any>(null);

  open(component: Type<any>, options?: { title?: string, data?: any }) {

    this.title.set(options?.title ?? '');
    this.data.set(options?.data ?? null);
    this.component.set(component);
    this.isOpen.set(true);

  }

  close() {
    this.isOpen.set(false);
    this.component.set(null);
    this.data.set(null);
  }

}