import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ReservationDetailsService } from './calendar-reservation-details/reservation-details.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReservationDetailsService],
})
export class CalendarComponent {}
