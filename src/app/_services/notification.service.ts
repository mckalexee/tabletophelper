import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Notification } from '../_classes/notification';

interface NotificationEvent {
  event: 'add' | 'delete';
  notification?: Notification;
  id?: Symbol;
}

@Injectable()
export class NotificationService {

  notifications$ = new Subject<NotificationEvent>();

  constructor() { }

  add(notification: Notification) {
    const response = new Subject<string>();
    notification.id = Symbol();
    notification.response = response;
    const event: NotificationEvent = {
      event: 'add',
      notification: notification
    };
    this.notifications$.next(event);
    return notification;
  }

  delete(id: Symbol) {
    const event: NotificationEvent = {
      event: 'delete',
      id: id
    };
    this.notifications$.next(event);
  }

}
