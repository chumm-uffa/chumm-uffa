import {Component, Input} from '@angular/core';
import {MeetupRequest, RequestStatus} from '@chumm-uffa/interface';
import {BusinessService} from '../../core/business.service';
import {AppDialogService} from '../../core/app-dialogService';
import {MatSelectionListChange} from '@angular/material';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent {

  @Input()
  meetupRequests: MeetupRequest[] = [];

  @Input()
  enableCheckBoxes = false;

  constructor(private businesService: BusinessService,
              private appDialogService: AppDialogService) {
  }

  setState(change: MatSelectionListChange): void {
    this.businesService.updateRequest(change.option.value, this.getState(change.option.selected))
    .subscribe(() => {
     }, err => {
        this.appDialogService.showError(err);
        change.option.toggle(); // restore old state
      }
    );
  }

  isParticipantSelected(state: RequestStatus): boolean {
    return state === RequestStatus.ACCEPT;
  }

  private getState(selected: boolean): RequestStatus {
    if (selected) {
      return RequestStatus.ACCEPT;
    }
    return RequestStatus.OPEN;
  }
}
