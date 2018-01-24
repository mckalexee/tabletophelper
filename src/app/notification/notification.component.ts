import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tt-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() message = '0';

  constructor() { }

  ngOnInit() {
  }

}
