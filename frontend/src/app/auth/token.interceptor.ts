/**
 * This interceptor will add authorization token to each request
 */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppStateService} from '../core/services/app-state.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private appState: AppStateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.appState.token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.appState.token
        }
      });
    }

    return next.handle(request);
  }
}
