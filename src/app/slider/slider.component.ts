import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tt-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() value = 60;
  @Input() min = 0;
  @Input() max = 255;
  bg = 'linear-gradient(to right, #000, #ff0000)';

  private _color = '#ff0000';

  constructor() { }

  ngOnInit() {
  }

  @Input('color') set color(value: string) {
    this._color = value;
    this.bg = `linear-gradient(to right, #000, ${value})`;
  }

  get color() {
    return this._color;
  }

}
