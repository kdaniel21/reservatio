import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, map, shareReplay, switchMap } from 'rxjs/operators'
import { GetReservationsGQL, GetReservationsQuery } from 'src/app/core/graphql/generated'

export interface TimePeriod {
  startDate: Date
  endDate: Date
}

export type ReservationListItem = GetReservationsQuery['reservations'][number]

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private readonly selectedTimePeriodSubject = new BehaviorSubject<TimePeriod>(undefined)
  readonly selectedTimePeriod$ = this.selectedTimePeriodSubject.pipe(filter(val => !!val))

  readonly reservations$: Observable<ReservationListItem[]> = this.selectedTimePeriod$.pipe(
    switchMap(({ startDate, endDate }) => this.getReservations(startDate, endDate)),
    shareReplay(1)
  )

  constructor(private readonly getReservationsGQL: GetReservationsGQL) {}

  setTimePeriod(startDate: Date, endDate: Date) {
    this.selectedTimePeriodSubject.next({ startDate, endDate })
  }

  private getReservations(startDate: Date, endDate: Date): Observable<ReservationListItem[]> {
    return this.getReservationsGQL.fetch({ startDate, endDate }).pipe(
      map(res => res.data.reservations),
      map(reservations =>
        reservations.map(reservation => ({
          ...reservation,
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
        }))
      )
    )
  }
}
