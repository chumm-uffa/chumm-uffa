import {FormControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Validation} from './validation';


export function validateDateFormat(format: string): ValidatorFn {
  return ((c: FormControl): { [key: string]: any } => {
    if (!moment(c.value, format).isValid()) {
      return Validation.getInvalidObject('dateformat'); // validation failed
    }
    return null; // validation OK
  });
}

/**
 * Prüft ob ein Datum vor einem bestimmten Referenzdatum liegt.
 * Wird kein Referenzdatum angegeben, wird Heute als Referenz gesetzt.
 * @param {string} format   Format des zu validierenden Datums
 * @param {moment.Moment} fromDate  Referenzdatum
 * @returns {ValidatorFn}
 */
export function validateNotBefore(format: string, fromDate?: Moment): ValidatorFn {

  if (!fromDate) {
    fromDate = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
  }

  return ((c: FormControl): { [key: string]: any } => {
    if (fromDate.isAfter(moment(c.value, format))) {
      return Validation.getInvalidObject('dateNotBefore'); // validation failed
    }
    return null; // validation OK
  });
}

/**
 * Prüft ob ein Zeitpunkt vor einem bestimmten Referenzzeitpunkt liegt.
 * Die Prüfung bezieht sich auf einen Zeitpunkt innerhalb von 24h
 * Wird kein Referenzzeitpunkt angegeben, wird Jetzt als Referenz gesetzt.
 * @param {moment.Moment} fromDate  Referenzzeitpunkt HH:mm
 * @returns {ValidatorFn}
 */
export function validateTimeNotBefore(fromDate?: Moment): ValidatorFn {

  if (!fromDate) {
    fromDate = moment().seconds(0).milliseconds(0);
  }

  return ((c: FormControl): { [key: string]: any } => {
    if (fromDate.isAfter(moment(c.value, 'HH:mm'))) {
      return Validation.getInvalidObject('timeNotBefore'); // validation failed
    }
    return null; // validation OK
  });
}

/**
 * 2 Zeitpunkt werden gegeneinander geprüft. 'Before' muss vor dem 'After' Zeitpunkt liegen.
 * Die Zeiten sind auf 24h bezogen.
 * @param {string} timeBefore
 * @param {string} timeAfter
 * @returns {ValidatorFn}
 */
export function validateTimeBefore(timeBefore: string, timeAfter: string): ValidatorFn {

  return ((c: FormControl): { [key: string]: any } => {
    const before = c.get(timeBefore).value;
    const after = c.get(timeAfter).value;
    if (moment(before, 'HH:mm').isAfter(moment(after, 'HH:mm'))) {
      return Validation.getInvalidObject('timeAfterBefore'); // validation failed
    }
    return null; // validation OK
  });
}
