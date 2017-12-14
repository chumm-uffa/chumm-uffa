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
 * Prüft ob ein Zeitpunkt vor einem bestimmten Referenz-Zeitpunkt liegt.
 * Wird kein Referenzdatum angegeben, wird eine Referenz abhängig des Formats gesetzt.
 * zb:  dd.MM.YYYY  ergibt als Referenz  15.12.2017 00:00  (Als Datum gilt heute)
 *      HH:mm  ergibt als Referenz  20:17   (Wobei 20.17 die aktuelle Zeit beim Aufruf ist)
 *
 * @param {string} format   Format des zu validierenden Datums
 * @param {moment.Moment} fromDate  Referenzdatum
 * @returns {ValidatorFn}
 */
export function validateNotBefore(format: string, fromDate?: Moment): ValidatorFn {

  if (!fromDate) {
    // Erzeugt eine Ref. welche kleinere Einheiten als im Format spezifiziert auf 0 setzt
    // und grösser auf Heute und Jetzt
    fromDate = moment(moment().format(format), format);
  }

  return ((c: FormControl): { [key: string]: any } => {
    if (fromDate.isAfter(moment(c.value, format))) {
      return Validation.getInvalidObject('notBefore'); // validation failed
    }
    return null; // validation OK
  });
}

/**
 * 2 Zeitpunkt werden gegeneinander geprüft. 'Before' muss vor dem 'After' Zeitpunkt liegen.
 * Reine Zeiten sind auf 24h bezogen.
 * @param {string} timeBefore
 * @param {string} timeAfter
 * @returns {ValidatorFn}
 */
export function validateAfterBefore(format: string, timeBefore: string, timeAfter: string): ValidatorFn {

  return ((c: FormControl): { [key: string]: any } => {
    const before = c.get(timeBefore).value;
    const after = c.get(timeAfter).value;
    if (before && after && moment(before, format).isAfter(moment(after, format))) {
      return Validation.getInvalidObject('timeAfterBefore'); // validation failed
    }
    return null; // validation OK
  });
}
