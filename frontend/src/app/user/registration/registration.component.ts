import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Sex, User} from '@chumm-uffa/interface';
import {Router} from '@angular/router';
import {UserFormService} from '../form/user-form.service';
import {BusinessService} from '../../core/services/business.service';
import {FormUtil} from '../../shared/form/form.util';
import {InfoPopupComponent} from '../../material/info-popup/info-popup.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['../user.scss']
})
export class RegistrationComponent implements OnInit {

  userForm: FormGroup;
  sexType = Sex;
  private user: User = new User();

  constructor(private userFormService: UserFormService,
              private businessService: BusinessService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userForm = this.userFormService.createRegistrationForm(this.user);
  }

  onClickRegister() {
    FormUtil.markAsTouched(this.userForm);  // macht Validierungsfehler sichtbar
    if (this.userForm.valid && !this.userForm.pending) {  // Form ist gültig und die Validierung ist abgeschlossen

      this.businessService.register(this.userFormService.mergeUser(this.userForm.value, this.user))
        .subscribe(() => {
          const myDialog = this.dialog.open(InfoPopupComponent,
            {data: {infoText: '', infoTitle: 'user.dialog.registrationSuccessfulTitle'}});
          myDialog.afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        }, err => {
          this.dialog.open(InfoPopupComponent, {
            data: {
              infoText: err,
              infoTitle: 'user.dialog.registrationFailedTitle'
            }
          });
          this.userForm.hasError(err);
        });
    }
  }
}
