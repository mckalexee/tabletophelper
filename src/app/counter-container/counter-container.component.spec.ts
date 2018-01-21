import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterContainerComponent } from './counter-container.component';
import { CounterComponent } from '../counter/counter.component';

import { CounterService } from '../_services/counter.service';

describe('CounterContainerComponent', () => {
  let component: CounterContainerComponent;
  let fixture: ComponentFixture<CounterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CounterContainerComponent,
        CounterComponent
      ],
      providers: [
        CounterService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
