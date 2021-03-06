import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserValidateService } from '../../shared/services/user-validate.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersService } from '../../shared/services/users.service';
import { MatInput } from '@angular/material/input';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return !!(control && control.invalid && (control.dirty || control.touched));
	}
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	@ViewChild('loginInput') loginInput: MatInput;
	@ViewChild('registerInput') registerInput: MatInput;

	public isvalidating: boolean;
	public isUserExist: boolean;
	public isUserValid: boolean;
	public isTypeSelect: boolean;
	public typeInput?: boolean;
	public matcher;

	public loginFormControl: FormControl;
	public registerFormControl: FormControl;
	@Output() response = new EventEmitter<string>();
	constructor(private uvs: UserValidateService, private us: UsersService) {}

	ngOnInit(): void {
		this.loginFormControl = new FormControl('', [Validators.required]);
		this.registerFormControl = new FormControl('', Validators.required);

		this.matcher = new MyErrorStateMatcher();

		setTimeout(() => {
			if (sessionStorage.getItem('user')) {
				this.response.emit(JSON.parse(sessionStorage.getItem('user')).name);
				this.us.setUser(JSON.parse(sessionStorage.getItem('user')));
			}
		}, 1000);
	}

	selectType(type: boolean) {
		this.isTypeSelect = true;
		setTimeout(() => {
			this.typeInput = type;
		}, 1000);
	}

	async login() {
		try {
			this.isvalidating = true;
			this.isUserExist = (await this.uvs.existUser(this.loginFormControl)).userValid;
			if (this.isUserExist) {
				sessionStorage.setItem('user', JSON.stringify(this.us.getUser()));
				this.response.emit(this.loginFormControl.value);
			} else {
				this.loginFormControl.setErrors({ incorrect: true });
			}
			this.isvalidating = false;
		} catch (error) {
			alert('por favor recarga la página');
			console.log(error);
			this.loginFormControl.setErrors({ incorrect: true });
		}
	}
	async register() {
		try {
			this.isvalidating = true;
			this.isUserValid = (await this.uvs.isNickValid(this.registerFormControl)).userValid;
			if (this.isUserValid) {
				this.us.createUser(this.registerFormControl.value).subscribe(user => {
					sessionStorage.setItem('user', JSON.stringify(user));
					this.response.emit(this.loginFormControl.value);
					this.isvalidating = false;
				});
			} else {
				this.registerFormControl.setErrors({ incorrect: true });
				this.isvalidating = false;
			}
		} catch (error) {
			alert('por favor recarga la página');
			console.log(error);
			this.registerFormControl.setErrors({ incorrect: true });
		}
	}
}
