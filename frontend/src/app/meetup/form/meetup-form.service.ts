import {Injectable} from '@angular/core';
import {Meetup} from '../../core/model/meetup';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {
  validateDateFormat,
  validateNotBefore,
  validateAfterBefore
} from '../../shared/validators/validate-date';
import {validateOneOf} from '../../shared/validators/one-of.validator';

@Injectable()
export class MeetupFormService {

  static readonly DATE_FORMAT = 'YYYY-MM-DD';
  static readonly TIME_FORMAT = 'HH:mm';

  constructor(private fB: FormBuilder) {
  }

  createForm(meetup: Meetup): FormGroup {
    return this.fB.group({
      date: [moment(meetup.from.getTime()).format(MeetupFormService.DATE_FORMAT),
        [Validators.required, validateDateFormat(MeetupFormService.DATE_FORMAT),
          validateNotBefore(MeetupFormService.DATE_FORMAT)]],
      fromTime: [moment(meetup.from.getTime()).format(MeetupFormService.TIME_FORMAT),
        [Validators.required, validateNotBefore(MeetupFormService.TIME_FORMAT)]],
      toTime: [moment(meetup.to.getTime()).format(MeetupFormService.TIME_FORMAT), [Validators.required]],
      locationType: meetup.outdoor ? 'out' : 'in',
      indoor: meetup.indoor,
      outdoor: meetup.outdoor,
      activity: [meetup.activity]
    }, {
      validator: [validateOneOf('indoor', 'outdoor'),
        validateAfterBefore(MeetupFormService.TIME_FORMAT, 'fromTime', 'toTime')]  // Formvalidators -> validate between Fields
    });
  }


  public checkMeetup(meetup?: Meetup): Meetup {
    if (meetup) {
      return meetup;
    }
    return new Meetup('', null, new Date(), new Date(), '', '', '', 0, 0);
  }


  public mergeMeetUp(formvalue, meetup: Meetup): Meetup {

    meetup.activity = formvalue.activity;
    meetup.from = this.getDateTime(formvalue.date, formvalue.fromTime);
    meetup.to = this.getDateTime(formvalue.date, formvalue.toTime);

    if (formvalue.locationType === 'in') {
      meetup.indoor = formvalue.indoor;
      meetup.outdoor = null;
    } else {
      meetup.indoor = null;
      meetup.outdoor = formvalue.outdoor;
    }
    return meetup;
  }

  private getDateTime(date, time) {

    return new Date(date + 'T' + time);
  }
}
