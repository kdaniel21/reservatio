import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CalendarReservationDetailsComponent } from '../calendar/calendar/calendar-reservation-details/calendar-reservation-details.component'
import { GeneralFormModule } from '../shared/general-form/general-form.module'
import { LocationsSelectFormModule } from '../shared/locations-select-form/locations-select-form.module'
import { TimeSelectFormModule } from '../shared/time-select-form/time-select-form.module'
import { CreateReservationRecurringComponent } from './create-reservation-recurring/create-reservation-recurring.component'
import { CreateReservationTaigaModule } from './create-reservation-taiga.module'
import { CreateReservationTimeComponent } from './create-reservation-time/create-reservation-time.component'
import { ScheduleItemComponent } from './create-reservation-time/schedule-item/schedule-item.component'
import { CreateReservationComponent } from './create-reservation.component'
import { LocationsSelectModule } from '../shared/locations-select/locations-select.module'

@NgModule({
  declarations: [
    CreateReservationComponent,
    CreateReservationTimeComponent,
    ScheduleItemComponent,
    CreateReservationRecurringComponent,
    CalendarReservationDetailsComponent,
  ],
  imports: [
    CommonModule,
    CreateReservationTaigaModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CreateReservationComponent }]),
    LocationsSelectModule,
    TimeSelectFormModule,
    LocationsSelectFormModule,
    GeneralFormModule,
  ],
  exports: [RouterModule],
})
export class CreateReservationModule {}
