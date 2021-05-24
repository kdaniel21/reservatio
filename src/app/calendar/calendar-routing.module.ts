import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { CalendarComponent } from './calendar/calendar.component'

const routes: Routes = [{ path: '', pathMatch: 'full', component: CalendarComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
