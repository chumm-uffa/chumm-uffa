import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {Hall, Meetup, MeetupRequest} from '@chumm-uffa/interface';
import {Util} from '../../shared/util';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../material/confirm-dialog/confirm-dialog.component';
import {AppDialogService} from '../../core/AppDialogService';

@Component({
  selector: 'app-open-requests',
  templateUrl: './open-requests.html',
})
export class OpenRequestsComponent implements OnInit {

  meetUpRequests: MeetupRequest[] = [];
  halls: Hall[] = [];

  constructor(private businessService: BusinessService,
              private dialog: MatDialog,
              private appDialogService: AppDialogService) {
  }

  ngOnInit() {
    this.getMeetupRequests();
    this.businessService.getHalls().subscribe(halls => this.halls = halls);

  }

  getMeetupRequests(): void {
    this.businessService.getMeetUpRequests().subscribe(requests => this.meetUpRequests = requests);
  }

  getLocation(meetUp: Meetup): string {
    return Util.resolveLocation(meetUp, this.halls);
  }

  /**
   * Deletes the request
   * @param event
   * @param requestId
   */
  signOff(event, requestId): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: {confirmText: 'openRequests.dialog.signOffText', confirmTitle: 'openRequests.dialog.signOffTitle'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.businessService.deleteRequest(requestId).subscribe(() => {
            this.getMeetupRequests();
          },
          err => this.appDialogService.showError(err)
        );
      }
    });
  }
}
