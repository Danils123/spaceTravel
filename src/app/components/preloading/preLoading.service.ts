import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PreLoadingService {
	private isHiddenBrand: BehaviorSubject<boolean>;
	private nickNameSubject: Subject<string> = new Subject<string>();
	constructor() {}

	getObservable(): Observable<boolean> {
		if (this.isHiddenBrand === undefined) {
			this.isHiddenBrand = new BehaviorSubject<boolean>(false);
		}
		return this.isHiddenBrand.asObservable();
	}

	getObservableNick(): Observable<string> {
		return this.nickNameSubject.asObservable();
	}

	setNick(nick: string): void {
		this.nickNameSubject.next(nick);
	}

	hideBrand() {
		this.isHiddenBrand.next(false);
	}

	show() {
		this.isHiddenBrand.next(true);
	}
}
