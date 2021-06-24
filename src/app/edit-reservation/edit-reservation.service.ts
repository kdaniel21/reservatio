import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EMPTY, Observable } from 'rxjs'
import { map, mapTo, shareReplay, switchMap, tap } from 'rxjs/operators'
import { Reservation } from '../calendar/calendar/calendar-reservation-details/reservation-details.service'
import { UpdateReservationGQL, UpdateReservationMutationVariables } from '../core/graphql/generated'
import { Loader } from '../core/loader/loader'
import { handleRetry } from '../core/retry-error-handler/handle-retry'
import { RetryErrorHandler } from '../core/retry-error-handler/retry-error-handler'
import { RetryableService } from '../core/retry-error-handler/retryable.service'
import { NotificationsService } from '../core/services/notifications.service'
import { PromptService } from '../core/prompt/prompt.service'
import { ReservationService } from '../core/services/reservation-service/reservation.service'
import { TranslocoService } from '@ngneat/transloco'

export type UpdatedProperties = UpdateReservationMutationVariables['updatedProperties']

@Injectable()
export class EditReservationService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  readonly editedReservation$: Observable<Reservation> = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('id')),
    switchMap((editedReservationId: string) => this.reservationService.getReservation(editedReservationId)),
    shareReplay(1),
  )

  constructor(
    private readonly reservationService: ReservationService,
    private readonly updateReservationGQL: UpdateReservationGQL,
    private readonly notificationsService: NotificationsService,
    private readonly route: ActivatedRoute,
    private readonly promptService: PromptService,
    private readonly transloco: TranslocoService,
  ) {}

  updateReservation(id: string, updatedProperties: UpdatedProperties, connectedUpdates?: string[]): Observable<void> {
    return this.updateReservationGQL.mutate({ id, updatedProperties, connectedUpdates }).pipe(
      map(res => res.data.updateReservation),
      tap(updatedReservation => {
        const { name } = updatedReservation
        const numOfReservations = connectedUpdates.length
        const message = numOfReservations
          ? this.transloco.translate('edit_reservation.multi_update_success', { name, numOfReservations })
          : this.transloco.translate('edit_reservation.single_update_success', { name })
        this.notificationsService.showSuccess(message)
      }),
      mapTo(void 0),
      handleRetry(this, this.transloco.translate('edit_reservation.update_fail')),
    )
  }

  deleteReservation(id: string, connectedUpdates?: string[]): Observable<void> {
    return this.promptService.open(this.transloco.translate('edit_reservation.confirm_delete')).pipe(
      switchMap(isConfirmed => {
        if (!isConfirmed) return EMPTY

        return this.updateReservationGQL.mutate({ id, updatedProperties: { isActive: false }, connectedUpdates })
      }),
      tap(() => {
        const numOfReservations = connectedUpdates.length
        const message =
          numOfReservations > 1
            ? this.transloco.translate('edit_reservation.multi_delete_success', { numOfReservations })
            : this.transloco.translate('edit_reservation.single_delete_success')
        this.notificationsService.showSuccess(message)
      }),
      mapTo(void 0),
      handleRetry(this, this.transloco.translate('edit_reservation.delete_fail')),
    )
  }
}
