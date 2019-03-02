import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: Storage = localStorage;

  static getObjectId () {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }

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
