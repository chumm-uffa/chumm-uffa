import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../core/business.service';
import {Hall} from '../core/model/hall';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {validateOneOf} from '../shared/validators/one-of.validator';
import {validateDateFormat, validateDateRange} from '../shared/validators/validate-date';
import {Meetup} from '../core/model/meetup';

@Component({
  selector: 'app-create-meetup',
  templateUrl: './create-meetup.html',
  styleUrls: ['./create-meetup.component.scss']
})
export class CreateMeetupComponent implements OnInit {

  static readonly DATE_FORMAT = 'YYYY-MM-DD';

  halls: Hall[];
  form: FormGroup;

  constructor(private businessService: BusinessService,
              private fB: FormBuilder) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(all => {
      console.log('meine Hallen', all);
      this.halls = all;
    });

    this.form = this.fB.group({
      date: ['', [Validators.required, validateDateFormat(CreateMeetupComponent.DATE_FORMAT),
        validateDateRange(CreateMeetupComponent.DATE_FORMAT)]],
      fromTime: ['', [Validators.required]],
      toTime: ['', [Validators.required]],
      locationType: 'in',
      indoor: '',
      outdoor: '',
      activity: ['']
    }, {
      validator: validateOneOf('indoor', 'outdoor')  // Formvalidators -> validate between Fields
    });

  }

  isIndoor(): boolean {
    return this.form.get('locationType').value === 'in';
  }

  create(): void {
    FormUtil.markAsTouched(this.form);
    if (this.form.valid && !this.form.pending) {
      console.log('form value', this.form.value);
      console.log('send data to Service');
      const fb = this.form.value;
      // this.appState.loggedInUser = new User(fb.username, fb.password, fb.sex, fb.email);

      this.businessService.saveMeetUp(this.createMeetUp(this.form.value));

    } else {
      console.log('form invald', this.form.errors);
      console.log('form invald', this.form.hasError('passwordMismatch'));
      console.log('form invald', this.form);
    }
  }

  private createMeetUp(formvalue): Meetup {

    return new Meetup(null /*id*/,
      null /*User*/,
      this.getDateTime(formvalue.date, formvalue.fromTime),
      this.getDateTime(formvalue.date, formvalue.toTime),
      formvalue.outdoor,
      formvalue.indoor,
      formvalue.activity,
      null /*_numberOfRequest*/,
      null /*_numberOfParticipant*/
    );
  }

  private getDateTime(date, time) {

    return new Date(date + 'T' + time);
  }

}
