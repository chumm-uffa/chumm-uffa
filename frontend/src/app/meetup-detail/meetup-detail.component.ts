import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BusinessService} from '../core/business.service';
import {Hall, Meetup, MeetupRequest, RequestStatus} from '@chumm-uffa/interface';
import {Util} from '../shared/util';
import {AppStateService} from '../core/app-state.service';

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.html',
  styleUrls: ['./meetup-detail.component.scss']
})
export class MeetupDetailComponent implements OnInit {

  loadError = false;
  private meetup: Meetup;
  private meetupRequests: MeetupRequest[] = [];
  private halls: Hall[] = [];
  isMeetupOwner = false;
  isAccepted = false;

  constructor(private businessService: BusinessService,
              private activatedRoute: ActivatedRoute,
              private appState: AppStateService) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(all => this.halls = all);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const meetupId = params['meetupId'];
      this.businessService.loadRequests(meetupId).subscribe(requests => {
        this.meetupRequests = requests;
        this.isAccepted = requests.some(req =>
          req.participant.username === this.appState.loggedInUser.username
          &&
          req.status === RequestStatus.ACCEPT
        );
      });

      this.businessService.loadMeetup(meetupId).subscribe(meetupReloaded => {
        if (meetupReloaded) {
          this.meetup = meetupReloaded;
          this.isMeetupOwner = this.appState.loggedInUser.username === meetupReloaded.owner.username;
        } else {
          this.loadError = true;
        }
      });
    });
  }

  getLocation(): string {
    return Util.resolveLocation(this.meetup, this.halls);
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

}
