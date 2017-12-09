import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

export class Constants {
  static readonly DATE_FMT = 'dd.MMM.yyyy';
  static readonly TIME_FMT = 'HH:mm';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} ${Constants.TIME_FMT}`;
}

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_FMT);
  }
}

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}

/**
 * Formatiert auf Zeit 24h
 */
@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.TIME_FMT);
  }
}
