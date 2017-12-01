import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {MeetupRequest} from '../../core/model/meetup-request';

@Component({
  selector: 'app-open-requests',
  templateUrl: './open-requests.component.html',
})
export class OpenRequestsComponent implements OnInit {

  meetUpRequests: MeetupRequest[];

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.getMeetupRequests();
  }

  getMeetupRequests(): void {
    this.businessService.getMeetUpRequests().subscribe(meetUpRequests => this.meetUpRequests = meetUpRequests);
  }

}
