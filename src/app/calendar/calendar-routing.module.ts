import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarComponent } from './calendar/calendar.component'
import { CreateReservationComponent } from './calendar/create-reservation/create-reservation.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CalendarComponent },
  { path: 'create', component: CreateReservationComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
