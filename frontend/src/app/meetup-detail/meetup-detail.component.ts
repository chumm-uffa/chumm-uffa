import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BusinessService} from '../core/business.service';
import {Meetup} from '../core/model/meetup';
import {MeetupRequest} from '../core/model/meetup-request';
import {Hall} from '../core/model/hall';
import {Util} from '../shared/util';

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.html',
  styleUrls: ['./meetup-detail.component.css']
})
export class MeetupDetailComponent implements OnInit {

  loadError = false;
  private meetup: Meetup;
  private meetupRequests: MeetupRequest[] = [];
  private halls: Hall[] = [];

  constructor(private businessService: BusinessService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(all => this.halls = all);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const meetupId = params['meetupId'];
      this.businessService.loadRequests(meetupId).subscribe(requests =>
        this.meetupRequests = requests);

      this.businessService.loadMeetup(meetupId).subscribe(meetupReloaded => {

        if (meetupReloaded) {
          this.meetup = meetupReloaded;
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
