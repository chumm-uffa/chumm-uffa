import {async, inject, TestBed} from '@angular/core/testing';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserFormService} from './user-form.service';
import {User, Sex} from '@chumm-uffa/interface';

describe('user Form', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UserFormService, FormBuilder]
    }).compileComponents();
  }));

  it('should should validate valid user', inject([UserFormService], (userFb: UserFormService) => {
    const form = createValidForm(userFb);
    expect(form.invalid).toBeFalsy();
    expect(form.valid).toBeTruthy();
  }));

  it('should should validate username filled', inject([UserFormService], (userFb: UserFormService) => {
    const form = createValidForm(userFb);
    form.controls.username.patchValue('');
    expect(form.controls.username.errors.required).toBeTruthy();
    checkFormBaseInvalid(form);
  }));

  it('should should validate username min length', inject([UserFormService], (userFb: UserFormService) => {
    const form = createValidForm(userFb);
    form.controls.username.patchValue('1');
    expect(form.controls.username.errors.minlength).toBeTruthy();
    checkFormBaseInvalid(form);
  }));

  it('should should validate password filled', inject([UserFormService], (userFb: UserFormService) => {
    const form = createValidForm(userFb);
    form.controls.password.patchValue('');
    expect(form.controls.password.errors.required).toBeTruthy();
    checkFormBaseInvalid(form);
  }));

  it('should should validate password min length', inject([UserFormService], (userFb: UserFormService) => {
    const form = createValidForm(userFb);
    form.controls.password.patchValue('1234567');
    expect(form.controls.password.errors.minlength).toBeTruthy();
    checkFormBaseInvalid(form);
  }));

  it('should should validate sex filled', inject([UserFormService], (userFb: UserFormService) => {
    const form = createValidForm(userFb);
    form.controls.sex.patchValue('');
    expect(form.controls.sex.errors.required).toBeTruthy();
    checkFormBaseInvalid(form);
  }));

  it('should should validate password mismatch', inject([UserFormService], (userFb: UserFormService) => {
    const form = createValidForm(userFb);
    form.controls.password.patchValue('einPasssssss');
    expect(form.errors.passwordMismatch.valid).toBeFalsy();
    checkFormBaseInvalid(form);
  }));

  it('should merge user', inject([UserFormService], (userFb: UserFormService) => {

    const form = createValidForm(userFb);
    form.controls.username.patchValue('MeisterEder');
    form.controls.password.patchValue('Pumuckel');
    form.controls.sex.patchValue(Sex.FEMALE);
    form.controls.email.patchValue('Meista@Eda.at');
    form.controls.weight.patchValue('65');
    let refUser = new User();
    refUser = userFb.mergeUser(form.value, refUser);
    expect(refUser.username).toBe('MeisterEder');
    expect(refUser.password).toBe('Pumuckel');
    expect(refUser.sex).toBe(Sex.FEMALE);
    expect(refUser.email).toBe('Meista@Eda.at');
    expect(refUser.weight).toBe('65');
  }));

  function createUser(): User {
    return new User('id', 'Fridolin', 'MeinPasssssss', Sex.MALE, 'emil.kommt@noch.ch', '5');
  }

  function createValidForm(userFb: UserFormService): FormGroup {
    const form = userFb.createRegistrationForm(createUser());
    form.controls.password.patchValue(createUser().password);
    form.controls.passwordRepeat.patchValue(createUser().password);
    return form;
  }

  function checkFormBaseInvalid(form: FormGroup) {
    expect(form.invalid).toBeTruthy();
    expect(form.valid).toBeFalsy();
  }

});

