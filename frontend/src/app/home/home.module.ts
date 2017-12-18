import { NgModule } from '@angular/core';
import {HomeComponent} from './home.component';
import {CoreModule} from '../core/core.module';
import {CommonModule} from '@angular/common';


@NgModule({

  declarations: [
    HomeComponent
  ],
  imports: [CoreModule, CommonModule]
})
export class HomeModule { }
