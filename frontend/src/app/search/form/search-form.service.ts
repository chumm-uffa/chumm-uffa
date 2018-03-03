import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {validateAfterBefore, validateNotBefore} from '../../shared/validators/date-validator';
import {SearchDto} from '@chumm-uffa/interface';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class SearchFormService {

  static readonly DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
  private fromDate$: Subscription;

  constructor(private fB: FormBuilder) {
  }

  createForm(): FormGroup {
    const form = this.fB.group({
      fromDateTime: [moment(new Date().getTime()).format(SearchFormService.DATE_TIME_FORMAT),
        [Validators.required, validateNotBefore(SearchFormService.DATE_TIME_FORMAT)]],
      toDateTime: ['', [Validators.required]],
      locationType: 'in',
      indoor: '',
      outdoor: '',
      sex: '',
      weightMin: '',
      weightMax: '',
      longitude: '',
      latitude: '',
      radius: ''
    }, {
      validator: [validateAfterBefore(SearchFormService.DATE_TIME_FORMAT, 'fromDateTime', 'toDateTime')]
    });

    this.fromDate$ = form.get('fromDateTime').valueChanges.subscribe(value => {
      this.patchToTime(value, form);
    });
    return form;
  }

  createDto(formvalue): SearchDto {

    return new SearchDto(
      new Date(formvalue.fromDateTime),
      new Date(formvalue.toDateTime),
      formvalue.locationType,
      formvalue.indoor,
      formvalue.outdoor,
      formvalue.sex,
      Number(formvalue.weightMin),
      Number(formvalue.weightMax),
      Number(formvalue.latitude),
      Number(formvalue.longitude),
      Number(formvalue.radius));
  }

  unsubscribe() {
    if (this.fromDate$) {
      this.fromDate$.unsubscribe();
    }
  }

  private patchToTime(fromDateTimeString: string, form: FormGroup): void {

    const fromDateTime = moment(fromDateTimeString, SearchFormService.DATE_TIME_FORMAT);
    if (fromDateTime.isValid()) {
      const toDateTime = moment(form.get('toDateTime').value, SearchFormService.DATE_TIME_FORMAT);
      if (!toDateTime.isValid() || toDateTime.isBefore(fromDateTime)) {
        form.get('toDateTime').patchValue(fromDateTimeString);
      }
    }
  }
}
