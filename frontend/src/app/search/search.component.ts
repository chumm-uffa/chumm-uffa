import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SearchFormService} from './form/search-form.service';
import {BusinessService} from '../core/business.service';
import {FormUtil} from '../shared/form/form.util';
import {Util} from '../shared/util';
import {Hall, Meetup} from '@chumm-uffa/interface';


import {MatDialog, MatTableDataSource} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results: MatTableDataSource<Meetup> = new MatTableDataSource<Meetup>([]);
  searchForm: FormGroup;
  halls: Hall[] = [];
  hasAllreadySearched = false;
  columnDefinition: string[] = ['owner', 'location', 'fromTime', 'toTime', 'register'];

  constructor(private searchFormService: SearchFormService,
              private businessService: BusinessService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(all => this.halls = all);
    this.searchForm = this.searchFormService.createForm();
    this.searchForm.valueChanges.subscribe(_ => this.hasAllreadySearched = false);
  }

  startSearch() {
    FormUtil.markAsTouched(this.searchForm);
    if (this.searchForm.valid && !this.searchForm.pending) {
      console.log('search initiated');
      // this.meetup = this.fB.mergeMeetUp(this.form.value, this.meetup);
      this.businessService.searchMeetUp(this.searchForm.value).subscribe(meetups => {
        this.results = new MatTableDataSource<Meetup>(meetups);
        this.hasAllreadySearched = true;
      });
    }
  }

  requestForParticipation(event, meetupId: string): void {
    event.stopPropagation();  // prevent link action
    this.businessService.requestForParticipation(meetupId).subscribe(ack => {
      if (ack) {
        this.dialog.open(InfoPopupComponent,
          {data: {infoText: 'Deine Anfrage wurde dem Meetup Owner mitgeteilt.', infoTitle: 'Anfrage'}});
      }
    });
  }

  isIndoor(): boolean {
    return this.searchForm.get('locationType').value === 'in';
  }

  getLocation(meetup: Meetup): string {
    return Util.resolveLocation(meetup, this.halls);
  }
}
