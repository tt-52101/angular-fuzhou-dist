import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({ name: 'datezone' })


export class Datezone implements PipeTransform {
	transform(value): string {
		let date = moment(value).add(8,'h').format('YYYY-MM-DD')
		return date;
	}
}