/**
 * Notification service
 */
import {Injectable} from '@angular/core';
import {AppStateService} from './app-state.service';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';
import {
  PushNotification
} from '@chumm-uffa/interface';

@Injectable()
export class NotificationService {

  private socket$: WebSocketSubject<PushNotification>;

  constructor(private appState: AppStateService) {
  }

  /**
   * Connects to web socket server
   * @returns {WebSocketSubject<PushNotification>}
   */
  public connect(): WebSocketSubject<PushNotification> {
    if (!this.socket$) {
      console.log('hostname' + window.location.hostname);
      console.log('host ' + window.location.host);
      console.log('port ' + window.location.port);
      this.socket$ = WebSocketSubject.create(`ws://${window.location.host}/ws/?token=${this.appState.token}`);
      this.socket$
          .subscribe(
          (message) => console.log('Notification data:' + message.info),
          (err) => this.closeSocket(err),
          () => this.closeSocket(null)
          );
    }
    return this.socket$;
  }

  public disconnect(): void {
    this.socket$.unsubscribe();
  }

  private closeSocket(err): void {
    if (err) {
      console.error(err);
    } else {
      console.warn('Complete');
    }
    this.socket$ = null;
  }
}
