import {async, inject, TestBed} from '@angular/core/testing';
import {FormBuilder, FormGroup} from '@angular/forms';
import { LogionFormService } from './login-form.service';

describe('user Form', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [LogionFormService, FormBuilder]
    }).compileComponents();
  }));

});

