import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatProgressSpinnerModule, MAT_DIALOG_SCROLL_STRATEGY
} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {InfoPopupComponent} from './info-popup/info-popup.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {Overlay} from '@angular/cdk/overlay';

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
    MatProgressSpinnerModule
  ],
  declarations: [
    ConfirmDialogComponent,
    InfoPopupComponent,
    SpinnerComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    InfoPopupComponent,
    SpinnerComponent
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
    MatIconModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_SCROLL_STRATEGY,
      deps: [Overlay],
      useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.close()
    }
  ]
})
export class MaterialModule {
}
