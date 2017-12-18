import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {HomeComponent} from './home/home.component';
import {MymeetupsComponent} from './mymeetups/mymeetups.component';
import {MeetupComponent} from './meetup/meetup.component';
import {MeetupDetailComponent} from './meetup-detail/meetup-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: UserComponent },
  { path: 'updateuser', component: UserComponent },
  { path: 'mymeetups', component: MymeetupsComponent },
  { path: 'meetup', component: MeetupComponent },
  { path: 'meetupdetail', component: MeetupDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
