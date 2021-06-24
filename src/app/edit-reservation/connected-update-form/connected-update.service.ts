import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TranslocoService } from '@ngneat/transloco'
import { Observable } from 'rxjs'
import { tap, switchMap, first, map, shareReplay, filter, withLatestFrom, startWith, mapTo, take } from 'rxjs/operators'
import { ReservationLocations } from 'src/app/calendar/calendar/calendar.service'
import { GetRelatedReservationsGQL, GetRelatedReservationsQuery } from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'
import { EditReservationFormService } from '../edit-reservation-form.service'
import { EditReservationService } from '../edit-reservation.service'
import { ConnectedUpdateFormService } from './connected-update-form.service'

interface ProposedChanges {
  name?: string
  startTime?: Date
  endTime?: Date
  locations?: Partial<ReservationLocations>
}

export type RelatedReservation = GetRelatedReservationsQuery['recurringReservations'][number]

export type RelatedReservationWithChanges = GetRelatedReservationsQuery['recurringReservations'][number] & {
  proposedChanges: ProposedChanges
}

@Injectable()
export class ConnectedUpdateService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  private readonly connectedUpdateForm = this.editReservationFormService.form.get('connectedUpdate') as FormGroup
  private readonly editForm = this.editReservationFormService.form
  private readonly validValueChanges$ = this.editForm.valueChanges.pipe(
    startWith(this.editForm.value),
    filter(() => this.editForm.valid || this.editForm.pending),
  )

  readonly relatedReservations$: Observable<RelatedReservationWithChanges[]> = this.connectedUpdateForm
    .get('shouldUpdateConnected')
    .valueChanges.pipe(
      filter(val => val === true),
      take(1),
      switchMap(() => this.getRelatedReservations()),
      withLatestFrom(this.editReservationService.editedReservation$),
      map(([relatedReservations, editedReservation]) =>
        relatedReservations
          .filter(relatedReservation => relatedReservation.id !== editedReservation.id)
          .sort((a, b) => a.startTime.getTime() - b.startTime.getTime()),
      ),
      tap(relatedReservations => {
        relatedReservations.forEach(relatedReservation =>
          this.connectedUpdateFormService.addConnectedReservationOption(relatedReservation),
        )
      }),
      switchMap(relatedReservations => this.validValueChanges$.pipe(mapTo(relatedReservations))),
      withLatestFrom(this.editReservationService.editedReservation$),
      map(([relatedReservations, editedReservation]) =>
        relatedReservations.map(relatedReservation =>
          this.connectedUpdateFormService.calculateProposedChanges(relatedReservation, editedReservation),
        ),
      ),
      shareReplay(1),
    ) as Observable<RelatedReservationWithChanges[]>
  // TODO: Remove this ^ workaround - too long pipe causes typing issues?

  constructor(
    private readonly getRelatedReservationsGQL: GetRelatedReservationsGQL,
    private readonly editReservationService: EditReservationService,
    private readonly editReservationFormService: EditReservationFormService,
    private readonly connectedUpdateFormService: ConnectedUpdateFormService,
    private readonly transloco: TranslocoService,
  ) {}

  private getRelatedReservations(): Observable<RelatedReservation[]> {
    return this.editReservationService.editedReservation$.pipe(
      first(),
      switchMap(editedReservation =>
        this.getRelatedReservationsGQL.fetch({ recurringId: editedReservation.recurringId }),
      ),
      map(res => res.data.recurringReservations),
      map(recurringReservations =>
        recurringReservations.map(reservation => ({
          ...reservation,
          startTime: new Date(reservation.startTime),
          endTime: new Date(reservation.endTime),
        })),
      ),
      handleRetry(this, this.transloco.translate('edit_reservation.related_load_fail')),
    )
  }
}
