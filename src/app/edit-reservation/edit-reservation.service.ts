import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TuiNotification } from '@taiga-ui/core'
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
  ) {}

  updateReservation(id: string, updatedProperties: UpdatedProperties, connectedUpdates?: string[]): Observable<void> {
    return this.updateReservationGQL.mutate({ id, updatedProperties, connectedUpdates }).pipe(
      map(res => res.data.updateReservation),
      tap(updatedReservation => {
        const message = connectedUpdates.length
          ? `The reservation ${updatedReservation.name} and ${connectedUpdates.length} more have been successfully updated!`
          : `The reservation ${updatedReservation.name} has been successfully updated!`
        this.notificationsService.show(message, { status: TuiNotification.Success })
      }),
      mapTo(void 0),
      handleRetry(this, 'Something went wrong while updating the reservation.'),
    )
  }

  deleteReservation(id: string, connectedUpdates?: string[]): Observable<void> {
    return this.promptService.open('Are you sure you want to delete this reservation?').pipe(
      switchMap(isConfirmed => {
        if (!isConfirmed) return EMPTY

        return this.updateReservationGQL.mutate({ id, updatedProperties: { isActive: false }, connectedUpdates })
      }),
      tap(() => {
        const message =
          connectedUpdates.length > 1
            ? `${connectedUpdates.length} reservations have been removed!`
            : `Reservation has been removed!`
        this.notificationsService.show(message, { status: TuiNotification.Success })
      }),
      mapTo(void 0),
      handleRetry(this, 'Could not remove reservation.'),
    )
  }
}
