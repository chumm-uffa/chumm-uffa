import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UpdateComponent} from './user/update/update.component';
import {HomeComponent} from './home/home.component';
import {MymeetupsComponent} from './mymeetups/mymeetups.component';
import {MeetupComponent} from './meetup/meetup.component';
import {MeetupDetailComponent} from './meetup-detail/meetup-detail.component';
import {SearchComponent} from './search/search.component';
import {AuthGuard} from './auth/auth-guard.service';
import {RegistrationComponent} from './user/registration/registration.component';
import {
  LOGIN_URL, MEETUP_DETAIL_URL, MEETUP_SEARCH_URL, MEETUP_URL, MY_MEETUPS_URL, REGISTRATION_URL,
  UPDATE_USER_URL
} from './app-routing-urls';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: LOGIN_URL, component: LoginComponent},
  {path: REGISTRATION_URL, component: RegistrationComponent},
  {path: UPDATE_USER_URL, component: UpdateComponent, canActivate: [AuthGuard]},
  {path: MY_MEETUPS_URL, component: MymeetupsComponent, canActivate: [AuthGuard]},
  {path: MEETUP_URL, component: MeetupComponent, canActivate: [AuthGuard]},
  {path: MEETUP_DETAIL_URL, component: MeetupDetailComponent, canActivate: [AuthGuard]},
  {path: MEETUP_SEARCH_URL, component: SearchComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
