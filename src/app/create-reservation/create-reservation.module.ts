import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CalendarReservationDetailsComponent } from '../calendar/calendar/calendar-reservation-details/calendar-reservation-details.component'
import { CreateReservationBaseComponent } from './create-reservation-base/create-reservation-base.component'
import { CreateReservationGeneralComponent } from './create-reservation-general/create-reservation-general.component'
import { CreateReservationLocationsComponent } from './create-reservation-locations/create-reservation-locations.component'
import { CreateReservationRecurringComponent } from './create-reservation-recurring/create-reservation-recurring.component'
import { CreateReservationTaigaModule } from './create-reservation-taiga.module'
import { CreateReservationTimeComponent } from './create-reservation-time/create-reservation-time.component'
import { ScheduleItemComponent } from './create-reservation-time/schedule-item/schedule-item.component'
import { CreateReservationComponent } from './create-reservation.component'
import { ReservationLocationsSelectModule } from './reservation-locations-select/reservation-locations-select.module'

@NgModule({
  declarations: [
    CreateReservationComponent,
    CreateReservationLocationsComponent,
    CreateReservationTimeComponent,
    ScheduleItemComponent,
    CreateReservationGeneralComponent,
    CreateReservationBaseComponent,
    CreateReservationRecurringComponent,
    CalendarReservationDetailsComponent,
  ],
  imports: [
    CommonModule,
    CreateReservationTaigaModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CreateReservationComponent }]),
    ReservationLocationsSelectModule,
  ],
  exports: [RouterModule],
})
export class CreateReservationModule {}
