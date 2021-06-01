import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarComponent } from './calendar/calendar.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CalendarComponent },
  {
    path: 'create',
    loadChildren: () => import('./create-reservation/create-reservation.module').then(m => m.CreateReservationModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
