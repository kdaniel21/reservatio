import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { ReservationCalendarEvent } from '../../angular-calendar-utils.service'

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarItemComponent {
  @Input() calendarEvent: ReservationCalendarEvent
  @Input() height: number

  get reservation() {
    return this.calendarEvent.meta.reservation
  }
}
