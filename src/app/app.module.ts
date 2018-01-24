import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CounterContainerComponent } from './counter-container/counter-container.component';
import { CounterService } from './_services/counter.service';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { SliderComponent } from './slider/slider.component';
import { NotificationService } from './_services/notification.service';
import { NotificationContainerComponent } from './notification-container/notification-container.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterContainerComponent,
    EditComponent,
    NavComponent,
    SliderComponent,
    NotificationContainerComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CounterService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
