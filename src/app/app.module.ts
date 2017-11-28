import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CounterContainerComponent } from './counter-container/counter-container.component';
import { CounterService } from './_services/counter.service';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
