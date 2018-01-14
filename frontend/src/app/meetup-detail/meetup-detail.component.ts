import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BusinessService} from '../core/business.service';
import {Meetup, Hall, MeetupRequest, RequestStatus} from '@chumm-uffa/interface';
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
    this.businessService.getHalls().subscribe(res => this.halls = res.halls);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const meetupId = params['meetupId'];
      this.businessService.loadRequests(meetupId).subscribe(requests => {
        this.meetupRequests = requests.requests;
        this.isAccepted = requests.requests.some(req =>
          req.participant.username === this.appState.loggedInUser.username
          &&
          req.status === RequestStatus.ACCEPT
        );
      });

      this.businessService.loadMeetup(meetupId).subscribe(res => {
        if (res.meetup) {
          this.meetup = res.meetup;
          this.isMeetupOwner = this.appState.loggedInUser.username === res.meetup.owner.username;
        } else {
          this.loadError = true;
        }
      });
    });
  }

  getLocation(): string {
    return Util.resolveLocation(this.meetup, this.halls);
  }


}
