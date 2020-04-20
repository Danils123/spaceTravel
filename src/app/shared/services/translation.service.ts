import { Injectable } from '@angular/core';
import { ELanguages } from '../enums/languages.enum';
import { es } from '../models/es';
import { en } from '../models/en';
import { ILanguage } from '../models/Translation';

@Injectable({
	providedIn: 'root',
})
export class TranslationService {
	private language: ELanguages = ELanguages.es;
	private dictionary: { [key: string]: ILanguage } = {
		[ELanguages.es]: es,
		[ELanguages.en]: en,
	};
	constructor() {}

	setLan(lan: ELanguages) {
		console.log(lan);
		this.language = lan;
	}

	getLan() {
		return this.language;
	}

	translate(key: string): string {
		if (this.dictionary[this.language] != null) {
			return this.dictionary[this.language][key];
		}
	}
}
