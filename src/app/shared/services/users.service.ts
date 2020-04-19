import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user: User;
  private userSubject: Subject<User> = new Subject<User>();
  constructor(private http: HttpClient) {}

  getUser() {
    return this.user;
  }

  getObservableUser(): Observable<User>  {
    return this.userSubject.asObservable();
  }

  createUser(name: string): Observable<User> {
    this.http.post<User>(`${environment.url}/api/createUser?name=${name}`, { name }).subscribe(user => {
      this.user = user;
      this.userSubject.next(this.user);
    });
    return this.userSubject;
  }

  invokeAsterius() {
    return this.http.post<string>(`${environment.url}/api/asteriuosInvoke`, { });
  }
}
