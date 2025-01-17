import { Nullable } from '@angular-monorepo/entities/data-repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  retrieveData<T>(key: string): Nullable<T> {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }
}
