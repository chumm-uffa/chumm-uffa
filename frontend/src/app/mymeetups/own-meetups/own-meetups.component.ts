import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {Meetup} from '../../core/model/meetup';

@Component({
  selector: 'app-own-meetups',
  templateUrl: './own-meetups.html',
})
export class OwnMeetupsComponent implements OnInit {

  meetups: Meetup[] = [];

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.getMeetups();
  }

  getMeetups(): void {
    this.businessService.getMeetUps().subscribe(meetups => this.meetups = meetups);
  }
}
