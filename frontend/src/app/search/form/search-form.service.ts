import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {validateTimeBefore, validateTimeNotBefore} from '../../shared/validators/validate-date';
import {validateOneOf} from '../../shared/validators/one-of.validator';

@Injectable()
export class SearchFormService {

  static readonly DATE_FORMAT = 'YYYY-MM-DDTHH:mm';

  constructor(private fB: FormBuilder) {
  }

  createForm(): FormGroup {
    const form = this.fB.group({
      fromDateTime: [moment(new Date().getTime()).format(SearchFormService.DATE_FORMAT), [Validators.required, validateTimeNotBefore()]],
      toDateTime: ['', [Validators.required]],
      locationType: 'in',
      indoor: '',
      outdoor: '',
      sex: '',
      weightMin: '',
      weightMax: ''
    }, {
      validator: [validateTimeBefore('fromDateTime', 'toDateTime')]
    });

    form.get('fromDateTime').valueChanges.subscribe(value => {
      this.patchToTime(value, form);
    });
    return form;
  }

  patchToTime(fromDateTimeString: string, form: FormGroup): void {

    const fromDateTime = moment(fromDateTimeString, SearchFormService.DATE_FORMAT);
    if (fromDateTime.isValid()) {
      const toDateTime = moment(form.get('toDateTime').value, SearchFormService.DATE_FORMAT);
      if (!toDateTime.isValid() || toDateTime.isBefore(fromDateTime)) {
        form.get('toDateTime').patchValue(fromDateTimeString);
      }
    }
  }


}
