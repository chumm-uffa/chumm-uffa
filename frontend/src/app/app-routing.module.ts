import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UpdateComponent} from './user/update/update.component';
import {HomeComponent} from './home/home.component';
import {MymeetupsComponent} from './mymeetups/mymeetups.component';
import {MeetupComponent} from './meetup/meetup.component';
import {MeetupDetailComponent} from './meetup-detail/meetup-detail.component';
import {SearchComponent} from './search/search.component';
import {AuthGuard} from './auth/auth-guard.service';
import {RegistrationComponent} from './user/registration/registration.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'updateuser', component: UpdateComponent, canActivate: [AuthGuard] },
  { path: 'mymeetups', component: MymeetupsComponent, canActivate: [AuthGuard] },
  { path: 'meetup', component: MeetupComponent, canActivate: [AuthGuard] },
  { path: 'meetupdetail', component: MeetupDetailComponent, canActivate: [AuthGuard] },
  { path: 'meetupsearch', component: SearchComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
