import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarComponent } from './calendar/calendar.component'
import { CalendarRoutingModule } from './calendar-routing.module'
import {
  DateAdapter,
  CalendarCommonModule as AngularCalendarCommonModule,
  CalendarWeekModule as AngularCalendarWeekModule,
} from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { CalendarDesktopComponent } from './calendar/calendar-desktop/calendar-desktop.component'
import { CalendarTaigaModule } from './calendar-taiga.module'
import { CalendarItemComponent } from './calendar/calendar-item/calendar-item.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CalendarDesktopActionButtonsComponent } from './calendar/calendar-desktop/calendar-desktop-action-buttons/calendar-desktop-action-buttons.component'
import { CalendarReservationDetailsComponent } from './calendar/calendar-reservation-details/calendar-reservation-details.component'
import { CreateReservationComponent } from './calendar/create-reservation/create-reservation.component'
import { CreateReservationLocationsComponent } from './calendar/create-reservation/create-reservation-locations/create-reservation-locations.component'
import { CreateReservationTimeComponent } from './calendar/create-reservation/create-reservation-time/create-reservation-time.component'
import { ScheduleItemComponent } from './calendar/create-reservation/create-reservation-time/schedule-item/schedule-item.component'
import { CreateReservationGeneralComponent } from './calendar/create-reservation/create-reservation-general/create-reservation-general.component'
import { CreateReservationBaseComponent } from './calendar/create-reservation/create-reservation-base/create-reservation-base.component'
import { CreateReservationRecurringComponent } from './calendar/create-reservation/create-reservation-recurring/create-reservation-recurring.component';
import { ReservationLocationsSelectComponent } from './calendar/create-reservation/create-reservation-locations/reservation-locations-select/reservation-locations-select.component'

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarDesktopComponent,
    CalendarItemComponent,
    CalendarDesktopActionButtonsComponent,
    CalendarReservationDetailsComponent,
    CreateReservationComponent,
    CreateReservationLocationsComponent,
    CreateReservationTimeComponent,
    ScheduleItemComponent,
    CreateReservationGeneralComponent,
    CreateReservationBaseComponent,
    CreateReservationRecurringComponent,
    ReservationLocationsSelectComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarTaigaModule,
    AngularCalendarCommonModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AngularCalendarWeekModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CalendarModule {}
