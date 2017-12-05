import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {MymeetupsComponent} from './mymeetups/mymeetups.component';
import {MeetupComponent} from './meetup/meetup.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'updateuser', component: RegistrationComponent },
  { path: 'mymeetups', component: MymeetupsComponent },
  { path: 'meetup', component: MeetupComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
