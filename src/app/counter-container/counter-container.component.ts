import { Component, OnInit } from '@angular/core';
import { Counter } from '../_classes/counter';
import { CounterService } from '../_services/counter.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'tt-counter-container',
  templateUrl: './counter-container.component.html',
  styleUrls: ['./counter-container.component.scss']
})
export class CounterContainerComponent implements OnInit {
  counters: Counter[];
  counters$: BehaviorSubject<Counter[]>;

  constructor(private _counterSvc: CounterService) { }

  ngOnInit() {
    this.counters = this._counterSvc.counters;
  }

}
