import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../core/business.service';
import {Hall} from '../core/model/hall';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {validateOneOf} from '../shared/validators/one-of.validator';
import {validateDateFormat, validateDateRange} from '../shared/validators/validate-date';
import {Meetup} from '../core/model/meetup';
import {ActivatedRoute, Params} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-meetup',
  templateUrl: './meetup.html',
  styleUrls: ['./meetup.component.scss']
})
export class MeetupComponent implements OnInit {

  static readonly DATE_FORMAT = 'YYYY-MM-DD';

  halls: Hall[];
  form: FormGroup;
  isMutateMode = false;
  private meetup: Meetup;

  constructor(private businessService: BusinessService,
              private fB: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.businessService.getHalls().subscribe(all => {
      console.log('meine Hallen', all);
      this.halls = all;
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const meetupId = params['meetupId'];

      if (meetupId) {
        this.businessService.loadMeetup(meetupId).subscribe(meetupReloaded => {
          if (meetupReloaded) {
            this.isMutateMode = true;
          }
          this.meetup = this.checkMeetup(meetupReloaded);
          this.createForm();
        });
      } else {
        this.meetup = this.checkMeetup();
        this.createForm();
      }
    });
  }

  private checkMeetup(meetup?: Meetup): Meetup {
    if (meetup) {
      return meetup;
    }
    return new Meetup('', null, new Date(), new Date(), '', '', '', 0, 0);
  }

  private createForm() {
    this.form = this.fB.group({
      date: [moment(this.meetup.from.getTime()).format(MeetupComponent.DATE_FORMAT),
        [Validators.required, validateDateFormat(MeetupComponent.DATE_FORMAT),
          validateDateRange(MeetupComponent.DATE_FORMAT)]],
      fromTime: [moment(this.meetup.from.getTime()).format('HH:mm'), [Validators.required]],
      toTime: [moment(this.meetup.to.getTime()).format('HH:mm'), [Validators.required]],
      locationType: this.meetup.outdoor ? 'out' : 'in',
      indoor: this.meetup.indoor,
      outdoor: this.meetup.outdoor,
      activity: [this.meetup.activity]
    }, {
      validator: validateOneOf('indoor', 'outdoor')  // Formvalidators -> validate between Fields
    });
  }

  isIndoor(): boolean {
    return this.form.get('locationType').value === 'in';
  }

  submit(): void {
    FormUtil.markAsTouched(this.form);
    if (this.form.valid && !this.form.pending) {
      console.log('form value', this.form.value);
      console.log('send data to Service');
      this.businessService.saveMeetUp(this.mergeMeetUp(this.form.value));

    } else {
      console.log('form invald', this.form.errors);
      console.log('form invald', this.form.hasError('passwordMismatch'));
      console.log('form invald', this.form);
    }
  }

  private mergeMeetUp(formvalue): Meetup {

    this.meetup.activity = formvalue.activity;
    this.meetup.from = this.getDateTime(formvalue.date, formvalue.fromTime);
    this.meetup.to = this.getDateTime(formvalue.date, formvalue.toTime);

    if (formvalue.locationType === 'in') {
      this.meetup.indoor = formvalue.indoor;
      this.meetup.outdoor = null;
    } else {
      this.meetup.indoor = null;
      this.meetup.outdoor = formvalue.outdoor;
    }
    return this.meetup;
  }

  private getDateTime(date, time) {

    return new Date(date + 'T' + time);
  }

}
