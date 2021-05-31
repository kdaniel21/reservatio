import { Injectable, Injector } from '@angular/core'
import { TuiDialogService } from '@taiga-ui/core'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators'
import { GetReservationGQL, GetReservationQuery } from 'src/app/core/graphql/generated'
import { CalendarReservationDetailsComponent } from './calendar-reservation-details.component'

export type Reservation = Omit<GetReservationQuery['reservation'], '__typename'>

@Injectable()
export class ReservationDetailsService {
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false)
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable()

  private readonly reservationIdSubject = new BehaviorSubject<string>(undefined)
  readonly reservation$: Observable<Reservation> = this.reservationIdSubject.pipe(
    filter(val => !!val),
    tap(() => this.isLoadingSubject.next(true)),
    switchMap(reservationId => this.getReservation(reservationId)),
    tap(() => this.isLoadingSubject.next(false)),
    shareReplay(1),
  )

  constructor(
    private readonly getReservationGQL: GetReservationGQL,
    private readonly dialogService: TuiDialogService,
    private readonly injector: Injector,
  ) {}

  showDetailsModal(reservationId: string): void {
    const dialogComponent = new PolymorpheusComponent(CalendarReservationDetailsComponent, this.injector)

    this.reservationIdSubject.next(reservationId)
    this.dialogService.open(dialogComponent, { data: { reservationId }, label: 'Reservation details' }).subscribe()
  }

  private getReservation(id: string): Observable<Reservation> {
    return this.getReservationGQL.fetch({ id }).pipe(
      map(res => res.data.reservation),
      map(reservation => ({
        ...reservation,
        startTime: new Date(reservation.startTime),
        endTime: new Date(reservation.endTime),
      })),
    )
  }
}
