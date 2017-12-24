import {Component, Input, OnInit} from '@angular/core';
import {MeetupRequest, RequestStatus} from '@chumm-uffa/interface';
import {BusinessService} from '../../core/business.service';

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

  constructor(private businesService: BusinessService) {
  }

  setState(state: RequestStatus): void {
    this.meetupRequest.status = state;
    this.businesService.updateRequest(this.meetupRequest).subscribe(mrq => this.meetupRequest = mrq);
  }
}
