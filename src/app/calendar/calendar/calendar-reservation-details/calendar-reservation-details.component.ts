import { Component, ChangeDetectionStrategy, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { TuiDialogContext } from '@taiga-ui/core'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { isPast } from 'date-fns'
import { combineLatest, Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { AuthStateService } from 'src/app/auth/auth-state.service'
import { ReservationDetailsService } from './reservation-details.service'

export interface ReservationDetailsModalContext {
  reservationId: string
}

@Component({
  selector: 'app-calendar-reservation-details',
  templateUrl: './calendar-reservation-details.component.html',
  styleUrls: ['./calendar-reservation-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarReservationDetailsComponent {
  readonly reservation$ = this.reservationDetailsService.reservation$
  readonly isLoading$ = this.reservationDetailsService.loader.isLoading$

  readonly canEdit$: Observable<boolean> = combineLatest([this.reservation$, this.authStateService.isAdmin$]).pipe(
    map(([reservation, isAdmin]) => {
      const isReservationPast = isPast(reservation.startTime)
      return !isReservationPast || isAdmin
    }),
  )

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, ReservationDetailsModalContext>,
    private readonly reservationDetailsService: ReservationDetailsService,
    private readonly authStateService: AuthStateService,
    private readonly router: Router,
  ) {}

  onDelete() {}

  onEdit(): void {
    this.reservation$.pipe(first()).subscribe({
      next: reservation => {
        this.router.navigate(['/', 'edit', reservation.id])
        this.cancel()
      },
    })
  }

  cancel(): void {
    this.context.completeWith()
  }
}
