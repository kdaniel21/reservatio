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
import { CalendarTaigaModule } from './calendar-taiga.module';
import { CalendarItemComponent } from './calendar/calendar-item/calendar-item.component'

@NgModule({
  declarations: [CalendarComponent, CalendarDesktopComponent, CalendarItemComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarTaigaModule,
    AngularCalendarCommonModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AngularCalendarWeekModule,
  ],
})
export class CalendarModule {}
