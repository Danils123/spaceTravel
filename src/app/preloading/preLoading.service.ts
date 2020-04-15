import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreLoadingService {
  private isHiddenBrand: Subject<boolean> = new Subject<boolean>();
  private nickNameSubject: Subject<string> = new Subject<string>();
  constructor() { }

  getObservable(): Observable<boolean> {
    return this.isHiddenBrand.asObservable();
  }

  getObservableNick(): Observable<string> {
    return this.nickNameSubject.asObservable();
  }

  setNick(nick: string = 'Anonimus'): void {
    this.nickNameSubject.next(nick);
  }

  hideBrand() {
    this.isHiddenBrand.next(false);
  }

  show() {
    this.isHiddenBrand.next(true);
  }
}
