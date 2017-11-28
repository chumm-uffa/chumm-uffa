import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from './login/login.modul';
import {RegistrationModule} from './registration/registration.module';
import {HomeModule} from './home/home.module';


@NgModule({
  declarations: [
    AppComponent, HeaderComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, LoginModule, RegistrationModule, HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
