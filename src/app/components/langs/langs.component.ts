import { Component, OnInit } from '@angular/core';
import { ELanguages } from '../../shared/enums/languages.enum';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
	selector: 'app-langs',
	templateUrl: './langs.component.html',
	styleUrls: ['./langs.component.css'],
})
export class LangsComponent implements OnInit {
	public langs: string[] = [ELanguages.es, ELanguages.en];
	public defaultLan = 'es';
	constructor(public ts: TranslationService) {}

	ngOnInit(): void {}

	changeIdiom(value) {
		console.log(value);
		console.log(ELanguages);
		console.log(ELanguages[value]);
		this.ts.setLan(ELanguages[value]);
	}
}
