import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from './login/login.modul';
import {RegistrationModule} from './user/user.module';
import {HomeModule} from './home/home.module';
import {MymeetupsModule} from './mymeetups/mymeetups.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MeetupModule} from './meetup/meetup.module';
import {MeetupDetailModule} from './meetup-detail/meetup-detail.module';
import {SearchModule} from './search/search.module';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {TokenInterceptor} from './auth/token.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// npm install @ngx-translate/http-loader --save
//
// noch die json ins assests verschieben

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent, HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RegistrationModule,
    HomeModule,
    MymeetupsModule,
    MeetupModule,
    MeetupDetailModule,
    SearchModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),



    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
