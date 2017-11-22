import {Component} from "@angular/core";
import {BusinessService} from "../core/business.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  appState: string;

  constructor(private businessService: BusinessService){
    // to show Service
     businessService.checkAlive().subscribe(state => this.appState = state);
  }


}
