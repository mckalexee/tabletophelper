import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';
import { Notification } from '../_classes/notification';

@Component({
  selector: 'tt-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private _notifySvc: NotificationService) { }

  ngOnInit() {
    this._notifySvc.notifications$.subscribe(notificaiton => {
      this.notifications.push(notificaiton);
    });


  }

  buttonClicked(name: string, index: number) {
    this.notifications[index].response.next(name);
    this.notifications[index].response.complete();
    this.notifications.splice(index, 1);
  }

}
