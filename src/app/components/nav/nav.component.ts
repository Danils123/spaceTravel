import { Component, OnInit, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { PreLoadingService } from '../preloading/preLoading.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, AfterContentInit {
	public whiteLogoClases: string[] = ['fadeIn'];
	public colorLogoClases: string[] = [];
	public hiddenBrand = false;
	public nick;
	constructor(public plService: PreLoadingService, private cd: ChangeDetectorRef) {}
	ngOnInit(): void {}

	ngAfterContentInit() {
		this.plService.getObservable().subscribe(resp => {
			this.hiddenBrand = resp;
			if (this.hiddenBrand) {
				this.colorLogoClases = ['fadeOut', 'slow'];
				this.whiteLogoClases = ['fadeIn', 'very slow'];
			}
			this.cd.detectChanges();
		});

		this.plService.getObservableNick().subscribe(nick => {
			this.cd.detectChanges();
			this.nick = nick;
		});
	}
}
