import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {MeetupRequest, Hall, Meetup} from '@chumm-uffa/interface';
import {Util} from '../../shared/util';

@Component({
  selector: 'app-open-requests',
  templateUrl: './open-requests.html',
})
export class OpenRequestsComponent implements OnInit {

  meetUpRequests: MeetupRequest[] = [];
  halls: Hall[] = [];

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    this.getMeetupRequests();
    this.businessService.getHalls().subscribe(all => this.halls = all);

  }

  getMeetupRequests(): void {
    this.businessService.getMeetUpRequests().subscribe(meetUpRequests => this.meetUpRequests = meetUpRequests);
  }

  getLocation(meetUp: Meetup): string {
    return Util.resolveLocation(meetUp, this.halls);
  }

}
