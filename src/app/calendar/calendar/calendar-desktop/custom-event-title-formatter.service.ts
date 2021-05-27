import { Injectable } from '@angular/core'
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar'

@Injectable({
  providedIn: 'root',
})
export class CustomEventTitleFormatterService extends CalendarEventTitleFormatter {
  monthTooltip(event: CalendarEvent) {
    return ''
  }

  weekTooltip(event: CalendarEvent) {
    return ''
  }

  dayTooltip(event: CalendarEvent) {
    return ''
  }
}
