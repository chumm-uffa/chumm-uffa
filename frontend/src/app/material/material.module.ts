import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatInputModule, MatRadioModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MatRadioModule, MatSelectModule, MatInputModule, MatButtonModule
  ],
  declarations: [],
  exports: [MatRadioModule, MatSelectModule, MatInputModule, MatButtonModule]
})
export class MaterialModule {
}
