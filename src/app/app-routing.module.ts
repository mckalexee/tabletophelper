import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterContainerComponent } from './counter-container/counter-container.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: 'home', component: CounterContainerComponent },
  { path: 'edit', component: EditComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
