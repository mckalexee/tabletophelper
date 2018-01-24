import { Component, OnInit, OnDestroy } from '@angular/core';
import { CounterService } from '../_services/counter.service';
import { NotificationService } from '../_services/notification.service';
import { Counter } from '../_classes/counter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tt-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  // Observable of all counters
  counters$: BehaviorSubject<Counter[]>;
  countersSub: Subscription;
  // Flag for if the form is open
  isFormOpen = false;
  // Current index of column being edited
  currentIndex: number = null;
  // This is the range on the alpha slider
  alphaRange = 200;
  // Total number of counters
  total = 0;

  // Private variables for the color sliders
  private _red = 255;
  private _green = 255;
  private _blue = 255;
  private _alpha = 0.5;

  // The object representing the edit counter form
  counterForm: FormGroup;

  // Subscription holding the delete confirmation
  delNotificationID: Symbol;

  constructor(private _counterSvc: CounterService, private _notifySvc: NotificationService) { }

  ngOnInit() {
    // Load the counter service, and subscribe to any saved counters
    this.counters$ = this._counterSvc.counters$;
    this.countersSub = this.counters$.subscribe(counters => {
      this.total = counters.length;
    });
    this.initForm();
  }

  ngOnDestroy() {
    this.countersSub.unsubscribe();
    // If there's an open delete notification, we want to get rid of it
    if (this.delNotificationID) {
      this._notifySvc.delete(this.delNotificationID);
      this.delNotificationID = null;
    }
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
    // If there's an open delete notification, we want to get rid of it
    if (this.delNotificationID) {
      this._notifySvc.delete(this.delNotificationID);
      this.delNotificationID = null;
    }
  }

  /** Disables submit functionality, required for android keyboard to not automatically save the form */
  submit() { }

  /** Deletes the currently open column */
  delete() {
    const counters = this._counterSvc.counters;
    const index = this.currentIndex;
    // Create a notification confirming if we want to delete the column
    const delNotification = this._notifySvc.add({
      message: `Delete column ${counters[index].name}?`,
      buttons: [
        { name: 'yes' },
        { name: 'Cancel', color: 'red' }
      ]
    });
    // We store the ID in the scope so we can delete the notification if we need to
    this.delNotificationID = delNotification.id;
    delNotification.response.subscribe(response => {
      // We delete the column if the user clicks yes
      if (response === 'yes') {
        counters.splice(index, 1);
        this._counterSvc.counters = counters;
        this.cancelEdit();
      }
    });
  }

  /** Moves the counter up in the list */
  moveUp(index = this.currentIndex) {
    if (index === 0) { return; }
    const counters = this._counterSvc.counters;
    const temp = counters[index - 1];
    counters[index - 1] = counters[index];
    counters[index] = temp;
    this._counterSvc.counters = counters;
    if (this.currentIndex) {
      this.editCounter(index - 1);
    }

  }

  /** Moves a counter down in the list */
  moveDown(index = this.currentIndex) {
    if (index === (this.total - 1)) { return; }
    const counters = this._counterSvc.counters;
    const temp = counters[index + 1];
    counters[index + 1] = counters[index];
    counters[index] = temp;
    this._counterSvc.counters = counters;
    if (this.currentIndex) {
      this.editCounter(index + 1);
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

  // Getters for the color slider colors for max/min.
  // Where redMax would be the current color with red at the highest value,
  // and redMin would be the current color with red at the lowest value
  // If the color hex is less than 16 it can cause the color to display incorrectly. We have to check for that

  get redMax() {
    const r = 'FF';
    const g = this._padIfNeeded(this.green.toString(16));
    const b = this._padIfNeeded(this.blue.toString(16));
    return `#${r}${g}${b}`;
  }
  get redMin() {
    const r = '00';
    const g = this._padIfNeeded(this.green.toString(16));
    const b = this._padIfNeeded(this.blue.toString(16));
    return `#${r}${g}${b}`;
  }

  get greenMax() {
    const r = this._padIfNeeded(this.red.toString(16));
    const g = 'FF';
    const b = this._padIfNeeded(this.blue.toString(16));
    return `#${r}${g}${b}`;
  }
  get greenMin() {
    const r = this._padIfNeeded(this.red.toString(16));
    const g = '00';
    const b = this._padIfNeeded(this.blue.toString(16));
    return `#${r}${g}${b}`;
  }

  get blueMax() {
    const r = this._padIfNeeded(this.red.toString(16));
    const g = this._padIfNeeded(this.green.toString(16));
    const b = 'FF';
    return `#${r}${g}${b}`;
  }
  get blueMin() {
    const r = this._padIfNeeded(this.red.toString(16));
    const g = this._padIfNeeded(this.green.toString(16));
    const b = '00';
    return `#${r}${g}${b}`;
  }

  /** Returns the hex value of the current color selected. */
  get colorHex() {
    const r = this._padIfNeeded(this.red.toString(16));
    const g = this._padIfNeeded(this.green.toString(16));
    const b = this._padIfNeeded(this.blue.toString(16));
    return `#${r}${g}${b}`;
  }

  /** Pads a hex color to have 2 digits */
  private _padIfNeeded(color: string) {
    if (color.length === 1) {
      color = '0' + color;
    }
    return color;
  }

}
