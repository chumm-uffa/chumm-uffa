import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/services/business.service';
import {Hall, Meetup} from '@chumm-uffa/interface';
import {Util} from '../../shared/util';
import {MatTableDataSource} from '@angular/material';
import {MEETUP_DETAIL_URL} from '../../app-routing-urls';

@Component({
  selector: 'app-news-ticker',
  templateUrl: './news-ticker.html',
  styleUrls: ['./news-ticker.component.scss']
})
export class NewsTickerComponent implements OnInit {

  meetups: Meetup[] = [];
  halls: Hall[] = [];
  columnDefinition: string[] = ['time', 'location', 'numberOfParticipant'];
  dataSource = new MatTableDataSource(this.meetups);
  meetupDetailUrl = MEETUP_DETAIL_URL;

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    this.getMeetups();
    this.businessService.getHalls().subscribe(halls => this.halls = halls);
  }

  getMeetups(): void {
    this.businessService.getNewsTickers().subscribe(meetups => {
      this.meetups = meetups.sort((a: Meetup, b: Meetup) => {
        return a.from.getTime() - b.from.getTime();
      });
      this.dataSource = new MatTableDataSource(meetups);
    });
  }

  getLocation(meetup: Meetup): string {
    return Util.resolveLocation(meetup, this.halls);
  }
}

