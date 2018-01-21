import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EditComponent } from './edit.component';
import { SliderComponent } from '../slider/slider.component';
import { CounterService } from '../_services/counter.service';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [
        EditComponent,
        SliderComponent
      ],
      providers: [
        CounterService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
