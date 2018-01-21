import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tt-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() value = 60;
  @Input() min = 0;
  @Input() max = 255;
  @Output() valueChanged = new EventEmitter<number>();
  bg = 'linear-gradient(to right, #000, #ff0000)';

  private _startColor = '#000';
  private _endColor = '#ff0000';

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.valueChanged.emit(this.value);
  }

  @Input('color') set color(value: string) {
    this._endColor = value;
    this.bg = `linear-gradient(to right, ${this._startColor}, ${this._endColor})`;
  }
  get color() {
    return this._endColor;
  }

  @Input('start') set start(value: string) {
    this._startColor = value;
    this.bg = `linear-gradient(to right, ${this._startColor}, ${this._endColor})`;
  }
  get start() {
    return this._startColor;
  }

}
