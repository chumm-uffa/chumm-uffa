import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {InfoPopupComponent} from './info-popup/info-popup.component';

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
    TranslateModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule,
    MatSortModule
  ],
  declarations: [
    ConfirmDialogComponent,
    InfoPopupComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    InfoPopupComponent
  ],
  exports: [
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule,
    MatSortModule
  ]
})
export class MaterialModule {
}
