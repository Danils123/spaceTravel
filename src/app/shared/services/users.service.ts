import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private fns: AngularFireFunctions,
    private http: HttpClient
    ) {}

  createUser(name: string): void {
    console.log(name);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post('https://us-central1-asterius-f1308.cloudfunctions.net/createUser', { name }, httpOptions).subscribe(x => {
      console.log(x);
    });
    // (this.fns.httpsCallable<string, User>('createUser'))(name).subscribe(x => console.log(x));
  }
}
