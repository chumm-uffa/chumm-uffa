import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BusinessService} from '../core/services/business.service';
import {Hall, Meetup, MeetupRequest, RequestStatus} from '@chumm-uffa/interface';
import {Util} from '../shared/util';
import {AppStateService} from '../core/services/app-state.service';
import {AppDialogService} from '../core/services/app-dialog.service';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../core/services/notification.service';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {MatDialog} from '@angular/material';
import {MY_MEETUPS_URL} from '../app-routing-urls';
import {ConfirmDialogComponent} from '../material/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.html',
  styleUrls: ['./meetup-detail.component.scss']
})
export class MeetupDetailComponent implements OnInit, OnDestroy {

  loadError = false;
  private meetup: Meetup;
  private meetupRequests: MeetupRequest[] = [];
  private halls: Hall[] = [];
  isMeetupOwner = false;
  isAccepted = false;
  isRegistered = false;

  private activateRouteSubscription: Subscription;
  private meetupId: string;

  constructor(private businessService: BusinessService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private appState: AppStateService,
              private router: Router,
              private appDialogService: AppDialogService) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(halls => this.halls = halls);
    this.notificationService.connect().subscribe((notification) => this.loadMeetupDetail());

    this.activateRouteSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.meetupId = params['meetupId'];
      this.loadMeetupDetail();
    });
  }

  ngOnDestroy(): void {
    if (this.activateRouteSubscription) {
      this.activateRouteSubscription.unsubscribe();
    }
  }

  getLocation(): string {
    if (this.meetup && this.halls) {
      return Util.resolveLocation(this.meetup, this.halls);
    } else {
      return '';
    }
  }

  /**
   * nur der Meetup Owner sieht alle Requests.
   * Die Partizipanten sehen nur die Akzeptierten
   * @returns {MeetupRequest[]}
   */
  getMeetUpRequestsToShow(): MeetupRequest[] {
    if (this.isMeetupOwner) {
      return this.meetupRequests;
    }
    return this.meetupRequests.filter(req => req.status === RequestStatus.ACCEPT);
  }

  showGoogleMapsDialog() {
    this.appDialogService.showGoogleMaps(this.meetup.latitude, this.meetup.longitude, false).subscribe();
  }

  register() {
    this.businessService.requestForParticipation(this.meetup).subscribe(() => {
        const dialogRef =  this.dialog.open(InfoPopupComponent,
          {data: {infoText: 'meetupDetail.dialog.startRequestText', infoTitle: 'meetupDetail.dialog.startRequestTitle'}});
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/' + MY_MEETUPS_URL]);
        });
      },
      err => this.appDialogService.showError(err)
    );
  }

  signOff(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {disableClose: true, data: {confirmText: 'meetupDetail.dialog.signOffText', confirmTitle: 'meetupDetail.dialog.signOffTitle'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.meetupRequests.map(req => {
          if (req.participant.username === this.appState.loggedInUser.username) {
            this.businessService.deleteRequest(req.id).subscribe(() => {
                this.router.navigate(['/' + MY_MEETUPS_URL]);
              },
              err => this.appDialogService.showError(err)
            );
          }
        });
      }
    });
  }

  private loadMeetupDetail(): void {
    this.businessService.loadRequests(this.meetupId).subscribe(requests => {
      this.meetupRequests = requests;
      this.isAccepted = requests.some(req =>
        req.participant.username === this.appState.loggedInUser.username
        &&
        req.status === RequestStatus.ACCEPT
      );

      this.isRegistered = requests.some(req =>
        req.participant.username === this.appState.loggedInUser.username
      );
    });

    this.businessService.loadMeetup(this.meetupId).subscribe(meetup => {
      if (meetup) {
        this.meetup = meetup;
        this.isMeetupOwner = this.appState.loggedInUser.username === meetup.owner.username;
      } else {
        this.loadError = true;
      }
    });
  }
}
