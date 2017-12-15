import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {Meetup} from '../../core/model/meetup';
import {Hall} from '../../core/model/hall';
import {Util} from '../../shared/util';

@Component({
  selector: 'app-own-meetups',
  templateUrl: './own-meetups.html',
})
export class OwnMeetupsComponent implements OnInit {

  meetups: Meetup[] = [];
  halls: Hall[] = [];

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    this.getMeetups();
    this.businessService.getHalls().subscribe(all => this.halls = all);
  }

  getMeetups(): void {
    this.businessService.getMeetUps().subscribe(meetups => this.meetups = meetups);
  }

  getLocation(meetUp: Meetup): string {
    return Util.resolveLocation(meetUp, this.halls);
  }
}
