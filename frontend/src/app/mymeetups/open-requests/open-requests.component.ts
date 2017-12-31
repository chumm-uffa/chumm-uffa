import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {Hall, Meetup, MeetupRequest} from '@chumm-uffa/interface';
import {Util} from '../../shared/util';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../material/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-open-requests',
  templateUrl: './open-requests.html',
})
export class OpenRequestsComponent implements OnInit {

  meetUpRequests: MeetupRequest[] = [];
  halls: Hall[] = [];

  constructor(private businessService: BusinessService,
              private dialog: MatDialog) {
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

  /**
   * Deletes the request
   * @param event
   * @param meetupId
   */
  signOff(event, requestId): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: {confirmText: 'openRequests.dialog.signOff_text', confirmTitle: 'openRequests.dialog.signOff_title'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.businessService.deleteRequest(requestId).subscribe(_ => this.getMeetupRequests());
      }
    });
  }
}
