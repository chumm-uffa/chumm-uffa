import {Component, OnInit} from '@angular/core';
import {Meetup} from '../core/model/meetup';
import {FormGroup} from '@angular/forms';
import {SearchFormService} from './form/search-form.service';
import {BusinessService} from '../core/business.service';
import {FormUtil} from '../shared/form/form.util';
import {Hall} from '../core/model/hall';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results: Meetup[] = []
  searchForm: FormGroup;
  halls: Hall[] = [];

  constructor(private searchFormService: SearchFormService,
              private businessService: BusinessService) {
  }

  ngOnInit() {
    this.businessService.getHalls().subscribe(all => this.halls = all);
    this.searchForm = this.searchFormService.createForm();
  }

  startSearch() {
    FormUtil.markAsTouched(this.searchForm);
    if (this.searchForm.valid && !this.searchForm.pending) {
      console.log('search initiated');
      // this.meetup = this.fB.mergeMeetUp(this.form.value, this.meetup);
      // this.businessService.saveMeetUp(this.meetup);
      // this.router.navigate(['/mymeetups']);

    }
  }

  isIndoor(): boolean {
    return this.searchForm.get('locationType').value === 'in';
  }
}
