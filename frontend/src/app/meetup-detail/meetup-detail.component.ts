import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BusinessService} from '../core/business.service';
import {Meetup} from '../core/model/meetup';

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.html',
  styleUrls: ['./meetup-detail.component.css']
})
export class MeetupDetailComponent implements OnInit {

  private meetup: Meetup;

  constructor(private businessService: BusinessService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const meetupId = params['meetupId'];

      this.businessService.loadMeetup(meetupId).subscribe(meetupReloaded => {

        if (meetupReloaded) {
          this.meetup = meetupReloaded;
        } else {
          // todo error Message
        }
      });
    });
  }

  getLocation(): string {
    return this.meetup.indoor ? this.meetup.indoor : this.meetup.outdoor;
  }



}
