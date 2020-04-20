import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloadingComponent } from './components/preloading/preloading.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatOption, MatOptionModule } from '@angular/material/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutofocusDirective } from './shared/directive/autofocus.directive';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { TraslatePipe } from './shared/pipes/traslate.pipe';
import { LangsComponent } from './components/langs/langs.component';

@NgModule({
	declarations: [AppComponent, PreloadingComponent, HomepageComponent, NavComponent, LoginComponent, AutofocusDirective, FooterComponent, TraslatePipe, LangsComponent],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatIconModule,
		MatRippleModule,
		MatButtonModule,
		AngularFireAuthModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		HttpClientModule,
		NgbModule,
		MatSelectModule,
		MatOptionModule,
	],
	providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
	bootstrap: [AppComponent],
})
export class AppModule {}
