import {async, inject, TestBed} from '@angular/core/testing';
import {SearchFormService} from './search-form.service';
import {FormBuilder} from '@angular/forms';
import moment = require('moment');

const optDate = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};

const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

describe('Search Form', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SearchFormService, FormBuilder]
    }).compileComponents();
  }));

  it('should create minimum valid form', inject([SearchFormService], (searchFb: SearchFormService) => {
    const form = searchFb.createForm();
    const testTime = moment().add(1, 'day');
    form.controls.fromDateTime.patchValue(testTime.format(DATE_TIME_FORMAT));
    expect(form.valid).toBeTruthy();
    expect(form.invalid).toBeFalsy();
  }));

  it('should validate from before now', inject([SearchFormService], (searchFb: SearchFormService) => {
    const form = searchFb.createForm();
    const testTime = moment().add(-1, 'day');
    form.controls.fromDateTime.patchValue(testTime.format(DATE_TIME_FORMAT));
    expect(form.controls.fromDateTime.errors.notBefore.valid).toBeFalsy();
  }));

  it('should validate from required', inject([SearchFormService], (searchFb: SearchFormService) => {
    const form = searchFb.createForm();
    form.controls.fromDateTime.patchValue('');
    expect(form.invalid).toBeTruthy();
    expect(form.valid).toBeFalsy();
    expect(form.controls.fromDateTime.errors.required).toBeTruthy();
  }));

  it('should validate to required', inject([SearchFormService], (searchFb: SearchFormService) => {
    const form = searchFb.createForm();
    form.controls.fromDateTime.patchValue('');
    expect(form.controls.toDateTime.errors.required).toBeTruthy();
  }));

  it('should validate toDateTime before fromDateTime', inject([SearchFormService], (searchFb: SearchFormService) => {
    const form = searchFb.createForm();
    let testTime = moment().add(2, 'day');
    form.controls.fromDateTime.patchValue(testTime.format(DATE_TIME_FORMAT));
    testTime = testTime.add(-1, 'day');
    form.controls.toDateTime.patchValue(testTime.format(DATE_TIME_FORMAT));
    expect(form.errors.timeAfterBefore.valid).toBeFalsy();
  }));

  it('should validate patch toDateTime', inject([SearchFormService], (searchFb: SearchFormService) => {
    const form = searchFb.createForm();
    const testTime = moment().add(1, 'day');
    form.controls.fromDateTime.patchValue(testTime.format(DATE_TIME_FORMAT));
    expect(form.controls.fromDateTime.value).toBe(form.controls.toDateTime.value);
  }));
});

