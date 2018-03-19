import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SearchFormService} from './form/search-form.service';
import {BusinessService} from '../core/services/business.service';
import {FormUtil} from '../shared/form/form.util';
import {Util} from '../shared/util';
import {Hall, LocationType, Meetup, Sex} from '@chumm-uffa/interface';

import {MatDialog, MatTableDataSource, Sort} from '@angular/material';
import {InfoPopupComponent} from '../material/info-popup/info-popup.component';
import {AppDialogService} from '../core/services/app-dialog.service';
import {AppErrorStateMatcher} from '../shared/error-state-matcher/app-error-state-matcher';
import {AppStateService} from '../core/services/app-state.service';
import {Subscription} from 'rxjs/Subscription';
import {MEETUP_DETAIL_URL} from '../app-routing-urls';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  results: MatTableDataSource<Meetup> = new MatTableDataSource<Meetup>([]);
  searchForm: FormGroup;
  halls: Hall[] = [];
  hasAllreadySearched = false;
  columnDefinition: string[] = ['owner', 'location', 'fromTime', 'toTime', 'register'];
  sexType = Sex;
  locationType = LocationType;
  beginAfterBeforeMatcher = new AppErrorStateMatcher('timeAfterBefore');
  meetupDetailUrl = MEETUP_DETAIL_URL;
  private searchFormSubscription: Subscription;

  constructor(private searchFormService: SearchFormService,
              private businessService: BusinessService,
              private dialog: MatDialog,
              private appDialogService: AppDialogService,
              private appState: AppStateService) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(halls => this.halls = halls);
    this.searchForm = this.searchFormService.createForm();
    this.searchFormSubscription = this.searchForm.valueChanges.subscribe(_ => this.hasAllreadySearched = false);
    const meetups = this.businessService.getCachedSearchResults();
    this.results = new MatTableDataSource<Meetup>(meetups);
  }

  ngOnDestroy(): void {
    this.searchFormService.unsubscribe();
    if (this.searchFormSubscription) {
      this.searchFormSubscription.unsubscribe();
    }
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

  showGoogleMapsDialog() {

    const latitude = Number(this.searchForm.get('latitude').value);
    const longitude = Number(this.searchForm.get('longitude').value);

    this.appDialogService.showGoogleMaps(latitude, longitude).subscribe(result => {
      if (result && result.ok) {
        this.searchForm.get('latitude').patchValue(result.lat);
        this.searchForm.get('longitude').patchValue(result.lng);
      }
    });
  }

  sortResults(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.results.data = this.results.data.sort((a: Meetup, b: Meetup) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'owner':
          return compare(a.owner.username, b.owner.username, isAsc);
        case 'location':
          return compare(getLocationString(a), getLocationString(b), isAsc);
        case 'fromTime':
          return compare(a.from.getTime(), b.from.getTime(), isAsc);
        case 'toTime':
          return compare(a.to.getTime(), b.to.getTime(), isAsc);
        default:
          return 0;
      }
    });
  }

  /*Mark messages of the current user*/
  getCurrentUserClass(username: string): string {
    return this.isCurrentUser(username) ? 'currentUser' : '';
  }

  isCurrentUser(username: string): boolean {
    return username === this.appState.loggedInUser.username;
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function getLocationString(mu: Meetup) {
  return mu.indoor ? mu.indoor : mu.outdoor;
}


