import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from './login/login.modul';
import {RegistrationModule} from './user/user.module';
import {APP_BASE_HREF} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {MymeetupsComponent} from './mymeetups/mymeetups.component';
import {MeetupComponent} from './meetup/meetup.component';
import {OwnMeetupsComponent} from './mymeetups/own-meetups/own-meetups.component';
import {OpenRequestsComponent} from './mymeetups/open-requests/open-requests.component';
import {SharedModule} from './shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppStateService} from './core/app-state.service';
import {MeetupDetailComponent} from './meetup-detail/meetup-detail.component';
import {ParticipantComponent} from './meetup-detail/participant/participant.component';
import {ChatComponent} from './meetup-detail/chat/chat.component';
import {SearchComponent} from './search/search.component';
import {MaterialModule} from './material/material.module';


/**
 * Demo Unit Test
 * Sollte aber wieder raus. Da er die Root Componente Testet wird er immer wieder Probleme machen
 * und viel zu fett werden.
 */


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, LoginModule, RegistrationModule, SharedModule,
        TranslateModule.forRoot(), ReactiveFormsModule, FormsModule, MaterialModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        MymeetupsComponent,
        OwnMeetupsComponent,
        OpenRequestsComponent,
        MeetupComponent,
        MeetupDetailComponent,
        ParticipantComponent,
        ChatComponent,
        SearchComponent
      ],
      providers: [AppStateService, {provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Chumm-Uffa');
  }));
});
