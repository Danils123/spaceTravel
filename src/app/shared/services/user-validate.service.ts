import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from './users.service';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ErrorInterface {
	[s: string]: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class UserValidateService {
	constructor(public db: AngularFirestore, public us: UsersService, private http: HttpClient) {}

	async isNickValid(control: FormControl): Promise<ErrorInterface> {
		const usersRef = this.db.collection('users');
		const usersSnap = await usersRef.get().toPromise();
		return {
			userValid: usersSnap.docs.filter(x => x.get('name') === control.value).length === 0,
		};
	}

	async existUser(control: FormControl): Promise<ErrorInterface> {
		try {
			const user = await this.http.get<User>(`${environment.url}/api/getUser?name=${control.value}`).toPromise();
			this.us.setUser(user);
			console.log(user);
			return {
				userValid: user != undefined,
			};
		} catch (error) {
			throw error;
		}
	}
}
