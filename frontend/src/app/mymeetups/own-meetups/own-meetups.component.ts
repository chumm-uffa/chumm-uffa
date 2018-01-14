import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {Meetup, Hall} from '@chumm-uffa/interface';
import {Util} from '../../shared/util';
import {ConfirmDialogComponent} from '../../material/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-own-meetups',
  templateUrl: './own-meetups.html',
})
export class OwnMeetupsComponent implements OnInit {

  meetups: Meetup[] = [];
  halls: Hall[] = [];

  constructor(private businessService: BusinessService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getMeetups();
    this.businessService.getHalls().subscribe(res => this.halls = res.halls);
  }

  getMeetups(): void {
    this.businessService.getMeetUps().subscribe(meetups => this.meetups = meetups);
  }

  getLocation(meetup: Meetup): string {
    return Util.resolveLocation(meetup, this.halls);
  }

  deleteMeetup(event, meetupId: string): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: {confirmText: 'ownMeetups.dialog.deleteText', confirmTitle: 'ownMeetups.dialog.deleteTitle'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.businessService.deleteMeetup(meetupId).subscribe(_ => this.getMeetups());
      }
    });

  }
}
