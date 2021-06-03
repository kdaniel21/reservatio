import { Injectable, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { format } from 'date-fns'
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs'
import { filter, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators'
import {
  GetReservationsGQL,
  GetReservationsQuery,
  GraphQlReservationLocationOutput,
} from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'

export interface ReservationTimePeriod {
  startDate: Date
  endDate: Date
}

export type ReservationLocations = Omit<GraphQlReservationLocationOutput, '__typename'>

export type ReservationListItem = GetReservationsQuery['reservations'][number]

@Injectable({ providedIn: 'root' })
export class CalendarService implements RetryableService, OnDestroy {
  private readonly destroy$ = new Subject<void>()

  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  private readonly selectedTimePeriodSubject = new BehaviorSubject<ReservationTimePeriod>(undefined)
  readonly selectedTimePeriod$ = this.selectedTimePeriodSubject.pipe(filter(val => !!val))

  private readonly selectedLocationsSubject = new BehaviorSubject<ReservationLocations>({
    badminton: true,
    tableTennis: true,
  })
  readonly selectedLocations$: Observable<ReservationLocations> = this.selectedLocationsSubject.asObservable()

  readonly reservations$: Observable<ReservationListItem[]> = this.selectedTimePeriod$.pipe(
    switchMap(({ startDate, endDate }) =>
      combineLatest([this.getReservations(startDate, endDate), this.selectedLocations$]),
    ),
    map(([reservations, selectedLocations]) => this.filterReservationsByLocations(reservations, selectedLocations)),
    shareReplay(1),
  )

  private readonly updateQueryParamsAction$ = merge(
    this.selectedLocations$,
    this.selectedTimePeriod$.pipe(map(({ startDate }) => ({ startDate: format(startDate, 'yyyy-MM-dd') }))),
  ).pipe(tap(queryParams => this.updateQueryParams(queryParams)))

  constructor(
    private readonly getReservationsGQL: GetReservationsGQL,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.loadLocationsQueryParams()

    merge(this.updateQueryParamsAction$).pipe(takeUntil(this.destroy$)).subscribe()
  }

  setTimePeriod(startDate: Date, endDate: Date) {
    this.selectedTimePeriodSubject.next({ startDate, endDate })
  }

  setLocations(selectedLocations: ReservationLocations) {
    this.selectedLocationsSubject.next(selectedLocations)
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private loadLocationsQueryParams() {
    const badmintonQueryParam = this.route.snapshot.queryParamMap.get('badminton')
    const badminton = badmintonQueryParam ? badmintonQueryParam === 'true' : true

    const tableTennisQueryParam = this.route.snapshot.queryParamMap.get('tableTennis')
    const tableTennis = tableTennisQueryParam ? tableTennisQueryParam === 'true' : true

    this.setLocations({ badminton, tableTennis })
  }

  private getReservations(startDate: Date, endDate: Date): Observable<ReservationListItem[]> {
    // TODO: Implement better caching behavior
    return this.getReservationsGQL.fetch({ startDate, endDate }, { fetchPolicy: 'network-only' }).pipe(
      map(res => res.data.reservations),
      map(reservations =>
        reservations.map(reservation => ({
          ...reservation,
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
        })),
      ),
      handleRetry(this, 'Could not load reservations!'),
    )
  }

  private filterReservationsByLocations(reservations: ReservationListItem[], locations: ReservationLocations) {
    if (locations.badminton && locations.tableTennis) return reservations
    if (!locations.badminton && !locations.tableTennis) return []

    return reservations.filter(
      reservation =>
        reservation.locations.badminton === locations.badminton &&
        reservation.locations.tableTennis === locations.tableTennis,
    )
  }

  private updateQueryParams(newQueryParams: { [key: string]: any }) {
    const existingQueryParams = this.route.snapshot.queryParams
    this.router.navigate([], { queryParams: { ...existingQueryParams, ...newQueryParams } })
  }
}
