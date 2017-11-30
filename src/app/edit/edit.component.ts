import { Component, OnInit } from '@angular/core';
import { CounterService } from '../_services/counter.service';
import { Counter } from '../_classes/counter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'tt-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  // Observable of all counters
  counters$: BehaviorSubject<Counter[]>;
  // Flag for if the form is open
  isFormOpen = false;
  // Current index of column being edited
  currentIndex: number = null;
  // This is the range on the alpha slider
  alphaRange = 200;

  // Private variables for the color sliders
  private _red = 255;
  private _green = 255;
  private _blue = 255;
  private _alpha = 0.5;

  counterForm: FormGroup;

  constructor(private _counterSvc: CounterService) { }

  ngOnInit() {
    this.counters$ = this._counterSvc.counters$;
    this.initForm();
  }

  /** Loads the RGBA values from the color string into the form */
  loadColor(color: string) {
    color = color.slice(5);
    color = color.slice(0, -1);
    const colors = color.split(', ').map(c => Number(c));
    this._red = colors[0];
    this._green = colors[1];
    this._blue = colors[2];
    this._alpha = colors[3];
  }

  /** Creates a color string based on the colors, then sets the color form control to the correct value */
  setColor(r: number, g: number, b: number, a: number) {
    this.color.setValue(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  /** Loads info for selected counter */
  editCounter(index: number) {
    this.color.setValue(this._counterSvc.counters[index].color);
    this.name.setValue(this._counterSvc.counters[index].name);
    this.initial.setValue(this._counterSvc.counters[index].initial);
    this.reset.setValue(this._counterSvc.counters[index].reset);
    this.currentIndex = index;
    this.loadColor(this._counterSvc.counters[index].color);
    this.isFormOpen = true;
    console.log(this.red, this.green, this.blue, this.alpha);
  }

  /** Load's default values into form */
  initForm() {
    this.counterForm = new FormGroup({
      name: new FormControl('NAME'),
      initial: new FormControl(0),
      color: new FormControl('rgba(0, 0, 0, 0.5)'),
      reset: new FormControl(true),
    });
    this.currentIndex = null;
  }

  /** Opens the form without an index to add a new counter */
  addCounter() {
    this.initForm();
    this.loadColor(this.color.value);
    this.isFormOpen = true;
  }

  /** Saves the counter, or adds a new one */
  saveCounter() {
    const counters = this._counterSvc.counters;
    let newCounter = new Counter();
    newCounter = {
      color: this.color.value,
      initial: this.initial.value,
      name: this.name.value,
      reset: this.reset.value,
      value: this.initial.value
    };
    // If we're editing a column, we'll save over it. We also have to check for an index of 0 because it's falsey
    if (this.currentIndex || this.currentIndex === 0) {
      // We don't want to overwrite the value of the column if it already exists
      newCounter.value = counters[this.currentIndex].value;
      counters[this.currentIndex] = newCounter;
    } else {
      counters.push(newCounter);
    }

    // Save the new counters
    this._counterSvc.counters = counters;
    this.cancelEdit();
  }

  /** Cancels the current edit, and resets the form */
  cancelEdit() {
    this.initForm();
    this.isFormOpen = false;
  }

  /** Disables submit functionality, required fro android keyboard to not automatically save the form */
  submit() { }

  /** Deletes the currently open column */
  delete() {
    const counters = this._counterSvc.counters;
    const answer = window.confirm('Are you sure you want to delete ' + counters[this.currentIndex].name + '?');
    if (answer) {
      counters.splice(this.currentIndex, 1);
      this._counterSvc.counters = counters;
      this.cancelEdit();
    }
  }

  // Provides an easy way to access the form controls.
  get color() { return this.counterForm.get('color'); }
  get name() { return this.counterForm.get('name'); }
  get initial() { return this.counterForm.get('initial'); }
  get reset() { return this.counterForm.get('reset'); }

  // Colors
  // Red
  set red(value) {
    if (value > 255) { value = 255; }
    if (value < 0) { value = 0; }
    this._red = value;
    this.setColor(this._red, this._green, this._blue, this._alpha);
  }
  get red() { return this._red; }

  // Green
  set green(value) {
    if (value > 255) { value = 255; }
    if (value < 0) { value = 0; }
    this._green = value;
    this.setColor(this._red, this._green, this._blue, this._alpha);
  }
  get green() { return this._green; }

  // Blue
  set blue(value) {
    if (value > 255) { value = 255; }
    if (value < 0) { value = 0; }
    this._blue = value;
    this.setColor(this._red, this._green, this._blue, this._alpha);
  }
  get blue() {
    return this._blue;
  }

  // Alpha. This one is different because alpha is 0 to 1, but the slider needs integer values.
  set alpha(value) {
    if (value > this.alphaRange) { value = this.alphaRange; }
    if (value < 0) { value = 0; }
    const normalValue = value / this.alphaRange;
    this._alpha = normalValue;
    this.setColor(this._red, this._green, this._blue, this._alpha);
  }
  get alpha() {
    const normalValue = this._alpha * this.alphaRange;
    return normalValue;
  }


}
