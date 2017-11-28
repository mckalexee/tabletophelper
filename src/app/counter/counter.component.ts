import { Component, OnInit, Input } from '@angular/core';
import { CounterService } from '../_services/counter.service';

@Component({
  selector: 'tt-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() color = 'rgba(255, 255, 255, 0.1)';
  @Input() initial = 0;
  @Input() resetButton = true;
  @Input() value = 0;
  @Input() index: number;

  constructor(private _counterSvc: CounterService) { }

  ngOnInit() {
  }

  up(amount = 1) {
    this.value += amount;
    this._counterSvc.updateValue(this.index, this.value);
  }

  down(amount = 1) {
    this.value -= amount;
    this._counterSvc.updateValue(this.index, this.value);
  }

  reset() {
    this.value = this.initial;
  }

}
