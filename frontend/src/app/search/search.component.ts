import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SearchFormService} from './form/search-form.service';
import {BusinessService} from '../core/business.service';
import {FormUtil} from '../shared/form/form.util';
import {Util} from '../shared/util';
import {Hall, Meetup, Sex, LocationType} from '@chumm-uffa/interface';

import {MatDialog, MatTableDataSource} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {AppDialogService} from '../core/AppDialogService';
import {AppErrorStateMatcher} from '../shared/error-state-matcher/app-error-state-matcher';

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
  sexType = Sex;
  locationType = LocationType;
  beginAfterBeforeMatcher = new AppErrorStateMatcher('timeAfterBefore');

  constructor(private searchFormService: SearchFormService,
              private businessService: BusinessService,
              private dialog: MatDialog,
              private appDialogService: AppDialogService) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(halls => this.halls = halls);
    this.searchForm = this.searchFormService.createForm();
    this.searchForm.valueChanges.subscribe(_ => this.hasAllreadySearched = false);
  }

  startSearch() {
    FormUtil.markAsTouched(this.searchForm);
    if (this.searchForm.valid && !this.searchForm.pending) {
      this.businessService.searchMeetUp(this.searchFormService.createDto(this.searchForm.value)).subscribe(meetups => {
        this.results = new MatTableDataSource<Meetup>(meetups);
        this.hasAllreadySearched = true;
      }, err => {
        this.appDialogService.showError(err);
      });
    }
  }

  requestForParticipation(event, meetupId: Meetup): void {
    event.stopPropagation();  // prevent link action
    this.businessService.requestForParticipation(meetupId).subscribe(() => {
          this.dialog.open(InfoPopupComponent,
            {data: {infoText: 'Deine Anfrage wurde dem Meetup Owner mitgeteilt.', infoTitle: 'Anfrage'}});
      },
      err => this.appDialogService.showError(err)
    );
  }

  isIndoor(): boolean {
    return this.searchForm.get('locationType').value === 'in';
  }

  getLocation(meetup: Meetup): string {
    return Util.resolveLocation(meetup, this.halls);
  }
}
