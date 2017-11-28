import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tt-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() color = '#FFF';
  initial = 0;
  count = 50;

  constructor() { }

  ngOnInit() {
  }

  up() {
    this.count++;
  }

  down() {
    this.count--;
  }

  reset() {
    this.count = this.initial;
  }

}
