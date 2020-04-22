import { Component, OnInit } from '@angular/core';
import { PreLoadingService } from './preLoading.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
	selector: 'app-preloading',
	templateUrl: './preloading.component.html',
	styleUrls: ['./preloading.component.css'],
})
export class PreloadingComponent implements OnInit {
	public imageClases: string[] = ['fadeInUp', 'slow'];
	public lanClases: string[] = ['fadeInUp', 'slow'];
	public inputClases: string[] = ['fadeIn', 'slow', 'delay-1s'];
	public pageClases: string[] = [];
	public containerClases = 'justify-content-center';
	public isHide = false;
	public value = '';
	constructor(public plService: PreLoadingService, public uService: UsersService) {}

	ngOnInit() {}

	async endingPreloading(value: string): Promise<void> {
		this.value = value ? value : 'Anonimus';
		this.imageClases = ['fadeOut', 'slow'];
		this.lanClases = ['fadeOut', 'slow'];
		this.inputClases = ['fadeOut'];
		this.pageClases = ['animated', 'pageOutUp', 'slow', 'delay-1s'];
		this.plService.setNick(this.value);
		setTimeout(() => {
			this.plService.show();
			this.isHide = true;
		}, 3000);
	}
}
