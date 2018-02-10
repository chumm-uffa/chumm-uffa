import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../core/business.service';
import {Meetup, Hall} from '@chumm-uffa/interface';
import {Util} from '../../shared/util';
import {ConfirmDialogComponent} from '../../material/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatIconRegistry, MatTableDataSource} from '@angular/material';
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
      this.meetups = meetups.sort( (a: Meetup, b: Meetup) => {
        return b.from.getTime() - a.from.getTime();
      });
      this.dataSource = new MatTableDataSource(meetups);
    });
  }

  getLocation(meetup: Meetup): string {
    return Util.resolveLocation(meetup, this.halls);
  }

  selectRow(row) {
    this.router.navigate(['/meetupdetail'], { queryParams: { meetupId: row.id } });
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
