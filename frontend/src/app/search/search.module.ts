import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {SearchFormService} from './form/search-form.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, TranslateModule, AppRoutingModule, SharedModule, ReactiveFormsModule
  ],
  declarations: [SearchComponent],
  providers: [SearchFormService]
})
export class SearchModule { }
