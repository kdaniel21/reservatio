import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { CalendarEvent } from 'angular-calendar'
import { addHours, startOfDay, addDays } from 'date-fns'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date()

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 5),
      end: addHours(startOfDay(new Date()), 17),
      title: 'Event 1',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      allDay: true,
    },
    {
      start: addHours(startOfDay(addDays(new Date(), 1)), 2),
      end: addHours(startOfDay(addDays(new Date(), 1)), 18),
      title: 'Event 2',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 8),
      title: 'Event 3',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      allDay: true,
    },
  ]

  constructor() {}

  ngOnInit(): void {}
}
