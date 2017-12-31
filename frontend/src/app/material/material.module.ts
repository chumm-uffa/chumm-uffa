import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    TranslateModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule]
})
export class MaterialModule {
}
