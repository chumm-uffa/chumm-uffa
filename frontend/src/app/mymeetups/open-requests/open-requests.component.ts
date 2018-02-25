import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {Hall, Meetup, MeetupRequest} from '@chumm-uffa/interface';
import {Util} from '../../shared/util';
import {MatDialog, MatTableDataSource, Sort} from '@angular/material';
import {ConfirmDialogComponent} from '../../material/confirm-dialog/confirm-dialog.component';
import {AppDialogService} from '../../core/AppDialogService';

@Component({
  selector: 'app-open-requests',
  templateUrl: './open-requests.html',
  styleUrls: ['./open-requests.component.scss']
})
export class OpenRequestsComponent implements OnInit {

  meetUpRequests: MeetupRequest[] = [];
  halls: Hall[] = [];
  columnDefinition: string[] = ['time', 'location', 'state', 'request'];
  dataSource = new MatTableDataSource(this.meetUpRequests);

  constructor(private businessService: BusinessService,
              private dialog: MatDialog,
              private appDialogService: AppDialogService) {
  }

  ngOnInit() {
    this.getMeetupRequests();
    this.businessService.getHalls().subscribe(halls => this.halls = halls);

  }

  getMeetupRequests(): void {
    this.businessService.getMeetUpRequests().subscribe(requests => {
      this.meetUpRequests = requests.sort((a: MeetupRequest, b: MeetupRequest) => {
        return a.meetup.from.getTime() - b.meetup.from.getTime();
      });

      this.dataSource = new MatTableDataSource(this.meetUpRequests);
    });
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

  sortMeetups(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data = this.dataSource.data.sort((a: MeetupRequest, b: MeetupRequest) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'time':
          return compare(a.meetup.from, b.meetup.from, isAsc);
        case 'state':
          return compare(a.status, b.status, isAsc);
        case 'location':
          return compare(getLocationString(a.meetup), getLocationString(b.meetup), isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function getLocationString(mu: Meetup) {
  return mu.indoor ? mu.indoor : mu.outdoor;
}
