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
    this._notifySvc.notifications$.subscribe(e => {
      switch (e.event) {
        case 'add':
          this.notifications.push(e.notification);
          break;
        case 'delete':
          this.notifications = this.notifications.filter(n => n.id !== e.id);
          break;
        default:
          break;
      }

    });


  }

  buttonClicked(name: string, index: number) {
    this.notifications[index].response.next(name);
    this.notifications.splice(index, 1);
  }

}
