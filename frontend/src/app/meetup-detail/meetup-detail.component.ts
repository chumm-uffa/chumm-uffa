import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BusinessService} from '../core/services/business.service';
import {Hall, Meetup, MeetupRequest, RequestStatus} from '@chumm-uffa/interface';
import {Util} from '../shared/util';
import {AppStateService} from '../core/services/app-state.service';
import {AppDialogService} from '../core/services/app-dialog.service';
import {Subscription} from 'rxjs/Subscription';

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

  private activateRoute$: Subscription;

  constructor(private businessService: BusinessService,
              private activatedRoute: ActivatedRoute,
              private appState: AppStateService,
              private appDialogService: AppDialogService) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(halls => this.halls = halls);

    this.activateRoute$ = this.activatedRoute.queryParams.subscribe((params: Params) => {
      const meetupId = params['meetupId'];
      this.businessService.loadRequests(meetupId).subscribe(requests => {
        this.meetupRequests = requests;
        this.isAccepted = requests.some(req =>
          req.participant.username === this.appState.loggedInUser.username
          &&
          req.status === RequestStatus.ACCEPT
        );
      });

      this.businessService.loadMeetup(meetupId).subscribe(meetup => {
        if (meetup) {
          this.meetup = meetup;
          this.isMeetupOwner = this.appState.loggedInUser.username === meetup.owner.username;
        } else {
          this.loadError = true;
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.activateRoute$) {
      this.activateRoute$.unsubscribe();
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

}
