import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tt-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() color = 'rgba(255, 255, 255, 0.1)';
  @Input() initial = 0;
  @Input() resetButton = true;
  count = 50;

  constructor() { }

  ngOnInit() {
    this.count = this.initial;
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
