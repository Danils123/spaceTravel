import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreLoadingService {
  private isHiddenBrand: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  getObservable(): Observable<boolean> {
    return this.isHiddenBrand.asObservable();
  }

  hideBrand() {
    this.isHiddenBrand.next(false);
  }

  show() {
    this.isHiddenBrand.next(true);
  }
}
