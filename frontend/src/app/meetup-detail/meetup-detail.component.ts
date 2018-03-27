import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BusinessService} from '../core/services/business.service';
import {Hall, Meetup, MeetupRequest, RequestStatus} from '@chumm-uffa/interface';
import {Util} from '../shared/util';
import {AppStateService} from '../core/services/app-state.service';
import {AppDialogService} from '../core/services/app-dialog.service';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../core/services/notification.service';

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
              private appState: AppStateService,
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

    this.businessService.requestForParticipation(meetupId).subscribe(() => {
        this.dialog.open(InfoPopupComponent,
          {data: {infoText: 'Deine Anfrage wurde dem Meetup Owner mitgeteilt.', infoTitle: 'Anfrage'}});
      },
      err => this.appDialogService.showError(err)
    );

  }

  private loadMeetupDetail(): void {
    this.businessService.loadRequests(this.meetupId).subscribe(requests => {
      this.meetupRequests = requests;
      this.isAccepted = requests.some(req =>
        req.participant.username === this.appState.loggedInUser.username
        &&
        req.status === RequestStatus.ACCEPT
      );

      this.isRegistered = !requests.some(req =>
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
