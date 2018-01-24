import { Component, OnInit } from '@angular/core';
import { SwUpdateService } from './_services/sw-update.service';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tabletop Helper';

  constructor(private _appUpdate: SwUpdateService) { }
}
