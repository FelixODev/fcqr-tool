import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  constructor() { }

  async toClipboard(p) {
    await navigator.clipboard.writeText(p);
  }
}
