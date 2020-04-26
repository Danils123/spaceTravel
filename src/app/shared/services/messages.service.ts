import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Message } from '../models/messages';

@Injectable({
	providedIn: 'root',
})
export class MessagesService {
	private deleteSubject: Subject<boolean> = new Subject<boolean>();
	constructor(private http: HttpClient) {}

	public getObservable(): Observable<boolean> {
		return this.deleteSubject.asObservable();
	}

	public setDelete() {
		this.deleteSubject.next(true);
	}

	public deleteMessages(): Observable<boolean> {
		return this.http.delete<boolean>(`${environment.url}/api/deleteMessages`);
	}

	public sendMessages(ms: Message): Observable<Message> {
		console.log(ms);
		return this.http.post<Message>(`${environment.url}/api/createMessage?id=${ms.userId}&message=${ms.message}`, {});
	}
}
