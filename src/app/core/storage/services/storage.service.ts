import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: Storage = localStorage;

  constructor() { }

  getData(key: string) {
    return JSON.parse(this.storage.getItem(key));
  }

  setData(key: string, data: any) {
    this.storage.setItem(key, JSON.stringify(data));
  }

  clearAll() {
    this.storage.clear();
  }
}
