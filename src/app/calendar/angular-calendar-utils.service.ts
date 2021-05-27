import { Injectable } from '@angular/core'
import { CalendarEvent } from 'angular-calendar'
import { GetReservationsGQL } from '../core/graphql/generated'
import { ReservationListItem } from './calendar/calendar.service'

export type ReservationCalendarEvent = CalendarEvent<{ reservation: ReservationListItem }>

@Injectable({ providedIn: 'root' })
export class AngularCalendarUtilsService {
  convertReservationToCalendarEvent(reservation: ReservationListItem): ReservationCalendarEvent {
    return { start: reservation.startTime, end: reservation.endTime, title: reservation.name, meta: { reservation } }
  }
}
