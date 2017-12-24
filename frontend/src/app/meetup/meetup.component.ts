import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../core/business.service';
import {Hall, Meetup} from '@chumm-uffa/interface';
import {FormGroup} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MeetupFormService} from './form/meetup-form.service';

@Component({
  selector: 'app-create-meetup',
  templateUrl: './meetup.html',
  styleUrls: ['./meetup.component.scss']
})
export class MeetupComponent implements OnInit {

  halls: Hall[];
  form: FormGroup;
  isMutateMode = false;
  private meetup: Meetup;

  constructor(private businessService: BusinessService,
              private fB: MeetupFormService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.businessService.getHalls().subscribe(all => {
      this.halls = all;
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const meetupId = params['meetupId'];
      /**
       * Eine meetupId in der URL bringt uns in den mutate mode
       * ohne gehen wir in den create mode.
       * Wird mit der id kein meetup gefunden, gehen wir ebenfalls in
       * den create mode
       */
      if (meetupId) {
        this.businessService.loadMeetup(meetupId).subscribe(meetupReloaded => {
          if (meetupReloaded) {
            this.isMutateMode = true;
          }
          this.meetup = this.fB.checkMeetup(meetupReloaded);
          this.form = this.fB.createForm(this.meetup);
        });
      } else {
        this.meetup = this.fB.checkMeetup();
        this.form = this.fB.createForm(this.meetup);
      }
    });
  }

  isIndoor(): boolean {
    return this.form.get('locationType').value === 'in';
  }

  submit(): void {
    FormUtil.markAsTouched(this.form);
    if (this.form.valid && !this.form.pending) {
      this.meetup = this.fB.mergeMeetUp(this.form.value, this.meetup);
      this.businessService.saveMeetUp(this.meetup);
      this.router.navigate(['/mymeetups']);

    }
  }


}
