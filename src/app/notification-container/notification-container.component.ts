import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'tt-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
