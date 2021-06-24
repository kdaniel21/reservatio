import { Injectable, Injector } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { TuiDialogService } from '@taiga-ui/core'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, shareReplay, switchMap, tap } from 'rxjs/operators'
import { GetReservationQuery } from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { ReservationService } from 'src/app/core/services/reservation-service/reservation.service'
import { CalendarReservationDetailsComponent } from './calendar-reservation-details.component'

export type Reservation = Omit<GetReservationQuery['reservation'], '__typename'>

@Injectable()
export class ReservationDetailsService {
  readonly loader = new Loader()

  private readonly reservationIdSubject = new BehaviorSubject<string>(undefined)
  readonly reservation$: Observable<Reservation> = this.reservationIdSubject.pipe(
    filter(val => !!val),
    tap(() => this.loader.startLoading()),
    switchMap(reservationId => this.reservationService.getReservation(reservationId)),
    tap(() => this.loader.stopLoading()),
    shareReplay(1),
  )

  constructor(
    private readonly reservationService: ReservationService,
    private readonly dialogService: TuiDialogService,
    private readonly injector: Injector,
    private readonly transloco: TranslocoService,
  ) {}

  showDetailsModal(reservationId: string): void {
    this.reservationIdSubject.next(reservationId)

    console.log('open')

    const dialogComponent = new PolymorpheusComponent(CalendarReservationDetailsComponent, this.injector)
    const label = this.transloco.translate('reservation.details')
    console.log('label', label)
    this.dialogService.open(dialogComponent, { data: { reservationId }, label }).subscribe()
  }
}
