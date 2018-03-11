import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusinessService} from '../core/services/business.service';
import {Hall, LocationType, Meetup} from '@chumm-uffa/interface';
import {FormGroup} from '@angular/forms';
import {FormUtil} from '../shared/form/form.util';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MeetupFormService} from './form/meetup-form.service';
import {MatDialog} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {AppDialogService} from '../core/services/app-dialog.service';
import {AppErrorStateMatcher} from '../shared/error-state-matcher/app-error-state-matcher';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-create-meetup',
  templateUrl: './meetup.html',
  styleUrls: ['./meetup.component.scss']
})
export class MeetupComponent implements OnInit, OnDestroy {

  halls: Hall[];
  form: FormGroup;
  isMutateMode = false;
  locationType = LocationType;
  locationTypeMatcher = new AppErrorStateMatcher('required');
  combinedMomentMatcher = new AppErrorStateMatcher('combinedMomentNotBefore');
  beginAfterBeforeMatcher = new AppErrorStateMatcher('timeAfterBefore');
  private meetup: Meetup;
  private activateRouteSubscription: Subscription;

  constructor(private businessService: BusinessService,
              private fB: MeetupFormService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private appDialogService: AppDialogService) {
  }

  ngOnInit() {

    this.businessService.getHalls().subscribe(halls => {
      this.halls = halls;
    });

    this.activateRouteSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      const meetupId = params['meetupId'];
      /**
       * Eine meetupId in der URL bringt uns in den mutate mode
       * ohne gehen wir in den create mode.
       * Wird mit der id kein meetup gefunden, gehen wir ebenfalls in
       * den create mode
       */
      if (meetupId) {
        this.businessService.loadMeetup(meetupId).subscribe(meetup => {
          if (meetup) {
            this.isMutateMode = true;
          }
          this.meetup = this.fB.checkMeetup(meetup);
          this.form = this.fB.createForm(this.meetup);
        });
      } else {
        this.meetup = this.fB.checkMeetup();
        this.form = this.fB.createForm(this.meetup);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.activateRouteSubscription) {
      this.activateRouteSubscription.unsubscribe();
    }
  }

  isIndoor(): boolean {
    return this.form.get('locationType').value === 'in';
  }

  submit(): void {
    FormUtil.markAsTouched(this.form);
    if (this.form.valid && !this.form.pending) {
      this.meetup = this.fB.mergeMeetUp(this.form.value, this.meetup);

      // if no meetup id is available, create a new one.
      if (this.meetup.id) {
        this.businessService.saveMeetUp(this.meetup).subscribe(() => {
          const myDialog = this.dialog.open(InfoPopupComponent,
            {data: {infoText: '', infoTitle: 'meetup.dialog.SaveSuccessfulTitle'}});
          myDialog.afterClosed().subscribe(() => {
            this.router.navigate(['/mymeetups']);
          });
        }, err => {
          this.dialog.open(InfoPopupComponent, {data: {infoText: err, infoTitle: 'meetup.dialog.CreateFailedTitle'}});
        });
      } else {
        this.businessService.createMeetUp(this.meetup).subscribe(() => {
          const myDialog = this.dialog.open(InfoPopupComponent,
            {data: {infoText: '', infoTitle: 'meetup.dialog.SaveSuccessfulTitle'}});
          myDialog.afterClosed().subscribe(() => {
            this.router.navigate(['/mymeetups']);
          });
        }, err => {
          this.dialog.open(InfoPopupComponent, {data: {infoText: err, infoTitle: 'meetup.dialog.SaveFailedTitle'}});
        });
      }
    }
  }

  showGoogleMapsDialog() {
    this.appDialogService.showGoogleMaps(this.meetup.latitude, this.meetup.longitude).subscribe(result => {
      if (result && result.ok) {
        this.meetup.latitude = result.lat;
        this.meetup.longitude = result.lng;
      }
    });
  }
}
