import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Notification } from '../_classes/notification';

@Injectable()
export class NotificationService {

  notifications$ = new Subject<Notification>();

  constructor() { }

  add(notification: Notification) {
    const response = new Subject<string>();
    notification.response = response;
    this.notifications$.next(notification);
    return notification.response;
  }

}
