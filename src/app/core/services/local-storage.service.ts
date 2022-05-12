import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {

  store: Storage;

  constructor() {
    switch (environment.storage) {
      case 'session':
        this.store = window.sessionStorage;
        break;
      case 'local':
        this.store = window.localStorage;
        break;
      default:
        this.store = window.localStorage;
        break;
    }
  }

  getItem(key: string): any {
    return this.store.getItem(key);
  }

  setItem(id: string, value: any): any {
    if (!value) {
      this.store.removeItem(id);
    } else {
      if (typeof value === 'object') {
        this.store.setItem(id, JSON.stringify(value));
      } else {
        this.store.setItem(id, value);
      }
    }
    return value;
  }

  remove(id: string) {
    this.store.removeItem(id);
  }

  clear(): void {
    return this.store.clear();
  }
}
