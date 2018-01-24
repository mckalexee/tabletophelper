import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Counter } from '../_classes/counter';

@Injectable()
export class CounterService {
  private _defaultCounters: Counter[] = [
    { name: 'health', value: 50, initial: 50, color: 'rgba(105, 255, 0, 0.67)', reset: false },
    { name: 'attack', value: 0, initial: 0, color: 'rgba(255, 0, 0, 0.67)', reset: true },
    { name: 'gold', value: 0, initial: 0, color: 'rgba(255, 229, 0, 0.82)', reset: true },
  ];

  counters$ = new BehaviorSubject<Counter[]>([]);

  constructor() {
    const savedCounters = localStorage.getItem('counters');
    if (savedCounters) {
      const parsedCounters: Counter[] = JSON.parse(savedCounters);
      this.counters$.next(parsedCounters);
    } else {
      this.counters$.next(this._defaultCounters);
      this.save();
    }
  }

  /** Saves the current counters to local storage */
  save() {
    localStorage.setItem('counters', JSON.stringify(this.counters$.getValue()));
  }

  /** Updates the value of a column and saves it */
  updateValue(colIndex: number, value: number) {
    const c = this.counters;
    c[colIndex].value = value;
    this.counters = c;
  }


  get counters() {
    return this.counters$.getValue();
  }

  set counters(counters: Counter[]) {
    this.counters$.next(counters);
    this.save();
  }


}
