import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/services/business.service';
import {Hall, Meetup} from '@chumm-uffa/interface';
import {Util} from '../../shared/util';
import {ConfirmDialogComponent} from '../../material/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatIconRegistry, MatTableDataSource, Sort} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-own-meetups',
  templateUrl: './own-meetups.html',
  styleUrls: ['./own-meetups.component.scss']
})
export class OwnMeetupsComponent implements OnInit {

  meetups: Meetup[] = [];
  halls: Hall[] = [];

  columnDefinition: string[] = ['time', 'location', 'numberOfRequest', 'numberOfParticipant', 'edit', 'delete'];
  dataSource = new MatTableDataSource(this.meetups);

  constructor(private businessService: BusinessService,
              private dialog: MatDialog,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private router: Router) {
    iconRegistry.addSvgIcon('delete-icon', sanitizer.bypassSecurityTrustResourceUrl('assets/img/delete.svg'));
    iconRegistry.addSvgIcon('edit-icon', sanitizer.bypassSecurityTrustResourceUrl('assets/img/pencil.svg'));
  }

  ngOnInit() {
    this.getMeetups();
    this.businessService.getHalls().subscribe(halls => this.halls = halls);
  }

  getMeetups(): void {
    this.businessService.getMeetUps().subscribe(meetups => {
      this.meetups = meetups.sort((a: Meetup, b: Meetup) => {
        return a.from.getTime() - b.from.getTime();
      });
      this.dataSource = new MatTableDataSource(meetups);
    });
  }

  getLocation(meetup: Meetup): string {
    return Util.resolveLocation(meetup, this.halls);
  }

  deleteMeetup(event, meetupId: string): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {disableClose: true, data: {confirmText: 'ownMeetups.dialog.deleteText', confirmTitle: 'ownMeetups.dialog.deleteTitle'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.businessService.deleteMeetup(meetupId).subscribe(_ => this.getMeetups());
      }
    });
  }

  sortMeetups(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data = this.dataSource.data.sort((a: Meetup, b: Meetup) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'numberOfRequest':
          return compare(a.numberOfRequest, b.numberOfRequest, isAsc);
        case 'numberOfParticipant':
          return compare(a.numberOfParticipant, b.numberOfParticipant, isAsc);
        case 'location':
          return compare(getLocationString(a), getLocationString(b), isAsc);
        case 'time':
          return compare(a.from.getTime(), b.from.getTime(), isAsc);
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
