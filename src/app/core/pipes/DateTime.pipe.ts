import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const myTimezone = 'America/Toronto';
    const myDatetimeFormat = 'MMMM DD, YYYY hh:mm A';
    value = moment(value)
      .tz(myTimezone)
      .format(myDatetimeFormat);
    return value + ' EDT ';
  }
}
