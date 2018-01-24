import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Button} from '../_classes/notification';

@Component({
  selector: 'tt-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() message = '0';
  @Input() buttons: Button[] = [];

  @Output() buttonClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  clickButton(name: string) {
    this.buttonClicked.emit(name);
  }

}
