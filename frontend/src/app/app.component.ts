import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.setDefaultLang('de');


    // this.translate.setTranslation('de', require('./i18n/de.json'), true);
    // this.translate.setTranslation('fr', require('./i18n/fr.json'), true);

  }


}
