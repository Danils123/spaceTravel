import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

export interface ErrorInterface {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserValidateService {

  constructor(public db: AngularFirestore) { }

  async isNickValid(control: FormControl): Promise<ErrorInterface> {
    const usersRef = this.db.collection('users');
    const usersSnap = await usersRef.get().toPromise();
    console.log(usersSnap.docs.filter(x => x.get('name') === control.value));
    return {
      userValid: usersSnap.docs.filter(x => x.get('name') === control.value).length === 0
    };
  }

  async existUser(control: FormControl): Promise<ErrorInterface> {
    try {
      const usersRef = this.db.collection('users');
      const usersSnap = await usersRef.get().toPromise();
      console.log(control.value);
      console.log(usersSnap.docs.filter(x => x.get('name') === control.value));
      return {
        userValid: usersSnap.docs.filter(x => x.get('name') === control.value).length > 0
      };
    } catch (error) {
      throw(error);
    }
  }
}
