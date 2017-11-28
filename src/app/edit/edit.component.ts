import { Component, OnInit } from '@angular/core';
import { CounterService } from '../_services/counter.service';
import { Counter } from '../_classes/counter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'tt-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private readonly _defaultCounter: Counter = {
    name: '',
    initial: 0,
    color: 'rgba(255, 255, 255, 0.28)',
    reset: true,
    value: 0
  };


  counters$: BehaviorSubject<Counter[]>;
  isFormOpen = false;

  current: Counter = JSON.parse(JSON.stringify(this._defaultCounter));

  currentIndex: number = null;


  color = {
    r: 255,
    g: 255,
    b: 255,
    a: 0.28,
  };

  constructor(private _counterSvc: CounterService) { }

  ngOnInit() {
    this.counters$ = this._counterSvc.counters$;
  }

  /** Converts the RGBA values to a color string */
  setColor() {
    this.color.r = Number(this.color.r);
    this.color.g = Number(this.color.g);
    this.color.b = Number(this.color.b);
    this.color.a = Number(this.color.a);
    this.current.color = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
  }

  /** Loads the RGBA values from the color string */
  loadColor() {
    let color = this.current.color;
    color = color.slice(5);
    color = color.slice(0, -1);
    const colors = color.split(', ').map(c => Number(c));
    this.color.r = colors[0];
    this.color.g = colors[1];
    this.color.b = colors[2];
    this.color.a = colors[3];
  }

  /** Loads info for selected counter */
  editCounter(index: number) {
    this.current = JSON.parse(JSON.stringify(this._counterSvc.counters[index]));
    this.currentIndex = index;
    this.loadColor();
    this.isFormOpen = true;
  }

  /** Opens the form without an index to add a new counter */
  addCounter() {
    this.loadDefault();
    this.isFormOpen = true;
  }

  /** Saves the counter, or creates a new counter */
  saveCounter() {
    const counters = this._counterSvc.counters;
    if (this.currentIndex || this.currentIndex === 0) {
      counters[this.currentIndex] = this.current;
    } else {
      this.current.value = this.current.initial;
      counters.push(this.current);
    }
    this._counterSvc.counters = counters;
    this.cancelEdit();
  }

  /** Cancels the current edit, and resets the form */
  cancelEdit() {
    this.loadDefault();
    this.isFormOpen = false;
  }

  /** Deletes the currently open column */
  delete() {
    const answer = window.confirm('Are you sure you want to delete ' + this.current.name + '?');
    if (answer) {
      const counters = this._counterSvc.counters;
      counters.splice(this.currentIndex, 1);
      this._counterSvc.counters = counters;
      this.cancelEdit();
    }

  }

  loadDefault() {
    this.currentIndex = null;
    this.current = JSON.parse(JSON.stringify(this._defaultCounter));
    this.loadColor();
  }

}
