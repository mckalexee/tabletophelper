import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CounterContainerComponent } from './counter-container/counter-container.component';
import { CounterService } from './_services/counter.service';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { SliderComponent } from './slider/slider.component';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterContainerComponent,
    EditComponent,
    NavComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
