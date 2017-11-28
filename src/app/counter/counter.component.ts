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
  @Input() name = 'test';

  constructor(private _counterSvc: CounterService) { }

  ngOnInit() {
    console.log(name);
  }

  up(amount = 1) {
    this.value += amount;
    this.save();
  }

  down(amount = 1) {
    this.value -= amount;
    this.save();
  }

  reset() {
    this.value = this.initial;
    this.save();
  }

  save() {
    this._counterSvc.updateValue(this.index, this.value);
  }

}
