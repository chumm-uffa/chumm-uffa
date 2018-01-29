import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../core/business.service';
import {Hall, IBaseResponse, LocationType, Meetup} from '@chumm-uffa/interface';
import {FormGroup} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MeetupFormService} from './form/meetup-form.service';
import {MatDialog} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {AppDialogService} from '../core/AppDialogService';

@Component({
  selector: 'app-create-meetup',
  templateUrl: './meetup.html',
  styleUrls: ['./meetup.component.scss']
})
export class MeetupComponent implements OnInit {

  halls: Hall[];
  form: FormGroup;
  isMutateMode = false;
  locationType = LocationType;
  private meetup: Meetup;

  constructor(private businessService: BusinessService,
              private fB: MeetupFormService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private appDialogService: AppDialogService) {
  }

  ngOnInit() {

    this.businessService.getHalls().subscribe(res => {
      this.halls = res.halls;
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
        this.businessService.loadMeetup(meetupId).subscribe(res => {
          if (res.meetup) {
            this.isMutateMode = true;
          }
          this.meetup = this.fB.checkMeetup(res.meetup);
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
      this.businessService.saveMeetUp(this.meetup).subscribe(response => {
        const myDialog = this.dialog.open(InfoPopupComponent,
          {data: {infoText: '', infoTitle: 'meetup.dialog.SaveSuccessfulTitle'}});
        myDialog.afterClosed().subscribe(result => {
          this.router.navigate(['/mymeetups']);
        });
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('Save meetup failed, ', response.message);
        this.dialog.open(InfoPopupComponent, {
          data: {
            infoText: response.message,
            infoTitle: 'meetup.dialog.SaveFailedTitle'
          }
        });
      });
    }
  }

  showGoogleMapsDialog(showOnly = false) {
    this.appDialogService.showGoogleMaps(this.meetup.latitude, this.meetup.longitude, showOnly).subscribe(result => {
      if (result.ok) {
        this.meetup.latitude = result.lat;
        this.meetup.longitude = result.lng;
      }
    });
  }
}
