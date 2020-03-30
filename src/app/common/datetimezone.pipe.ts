import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({ name: 'datetimezone' })


export class DateTimezone implements PipeTransform {
	transform(value): string {
		let date = moment(value).format('YYYY-MM-DD HH:mm:ss')
		return date;
	}
}