import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule,
  MatSelectModule, MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    MatRadioModule, MatSelectModule, MatInputModule, MatButtonModule, MatTableModule, MatFormFieldModule
  ],
  declarations: [],
  exports: [MatRadioModule, MatSelectModule, MatInputModule, MatButtonModule, MatTableModule, MatFormFieldModule]
})
export class MaterialModule {
}
