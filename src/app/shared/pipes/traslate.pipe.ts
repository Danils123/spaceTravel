import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { ELanguages } from '../enums/languages.enum';

@Pipe({
	name: 'traslate',
	pure: false,
})
export class TraslatePipe implements PipeTransform {
	constructor(private ts: TranslationService) {}
	transform(value: string, ..._args: any): string {
		return this.ts.translate(value);
	}
}
