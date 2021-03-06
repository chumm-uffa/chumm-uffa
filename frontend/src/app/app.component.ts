import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.setDefaultLang('de');
  }
}
