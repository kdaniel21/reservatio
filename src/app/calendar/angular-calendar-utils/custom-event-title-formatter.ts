import { Injectable } from '@angular/core'
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar'

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
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
