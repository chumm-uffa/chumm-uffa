import {Component, Input} from '@angular/core';
import {MeetupRequest, RequestStatus} from '@chumm-uffa/interface';
import {BusinessService} from '../../core/business.service';
import {AppDialogService} from '../../core/AppDialogService';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent {

  @Input()
  meetupRequest: MeetupRequest;
  @Input()
  showStateButtons = false;

  requestStatus = RequestStatus;

  constructor(private businesService: BusinessService, private appDialogService: AppDialogService) {
  }

  setState(state: RequestStatus): void {
    this.businesService.updateRequest(this.meetupRequest, state).subscribe(res =>
        res.success ? this.meetupRequest = res.request : this.appDialogService.showError(res.message),
      err => this.appDialogService.showServerError(err)
    );
  }
}
