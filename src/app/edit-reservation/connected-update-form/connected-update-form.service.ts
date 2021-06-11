import { Injectable, Injector } from '@angular/core'
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, ValidationErrors } from '@angular/forms'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { addMilliseconds } from 'date-fns'
import { EMPTY, merge, Observable, of } from 'rxjs'
import {
  defaultIfEmpty,
  delay,
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators'
import { Reservation } from 'src/app/calendar/calendar/calendar-reservation-details/reservation-details.service'
import { TimeAvailableInputDto } from 'src/app/core/graphql/generated'
import { ReservationService } from 'src/app/core/services/reservation-service/reservation.service'
import { EditReservationFormService } from '../edit-reservation-form.service'
import { EditReservationService } from '../edit-reservation.service'
import { RelatedReservation } from './connected-update.service'

@Injectable()
export class ConnectedUpdateFormService {
  readonly form = this.formBuilder.group({
    shouldUpdateConnected: [false],
    connectedUpdates: this.formBuilder.array([]),
  })

  get connectedUpdates(): FormArray {
    return this.form.get('connectedUpdates') as FormArray
  }

  private readonly clearConnectedUpdatesAction$ = this.form.get('shouldUpdateConnected').valueChanges.pipe(
    distinctUntilChanged(),
    filter(val => val === false),
    tap(() => {
      this.connectedReservationIdsMap.clear()
      this.connectedUpdates.clear()
    }),
  )

  private readonly connectedReservationIdsMap = new Map<number, string>()

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly destroy$: TuiDestroyService,
    private readonly injector: Injector,
    private readonly editReservationService: EditReservationService,
    private readonly reservationService: ReservationService,
  ) {
    merge(this.clearConnectedUpdatesAction$).pipe(takeUntil(this.destroy$)).subscribe()
  }

  addConnectedReservationOption(relatedReservation: RelatedReservation) {
    const index = this.connectedUpdates.controls.length
    this.connectedReservationIdsMap.set(index, relatedReservation.id)

    const group = this.formBuilder.control(false, [], this.validateTimeAvailability(relatedReservation))
    this.connectedUpdates.insert(index, group, { emitEvent: false })
  }

  calculateProposedChanges(relatedReservation: RelatedReservation, editedReservation: Reservation) {
    const editReservationFormService = this.injector.get(EditReservationFormService)
    const updatedValues = editReservationFormService.getChangedValues(editedReservation)

    const startTimeDiffMs =
      'startTime' in updatedValues ? updatedValues.startTime.getTime() - editedReservation.startTime.getTime() : 0
    const endTimeDiffMs =
      'endTime' in updatedValues ? updatedValues.endTime.getTime() - editedReservation.endTime.getTime() : 0

    const proposedChanges = { ...updatedValues }
    if (proposedChanges.startTime)
      proposedChanges.startTime = addMilliseconds(relatedReservation.startTime, startTimeDiffMs)
    if (proposedChanges.endTime) proposedChanges.endTime = addMilliseconds(relatedReservation.endTime, endTimeDiffMs)

    return { ...relatedReservation, proposedChanges }
  }

  getConnectedUpdatedIds(): string[] {
    return this.connectedUpdates.controls
      .filter(control => control.value)
      .map((_, index) => this.connectedReservationIdsMap.get(index))
  }

  private validateTimeAvailability(reservation: RelatedReservation): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      const { value } = control
      if (!value) return of(null)

      return this.editReservationService.editedReservation$.pipe(
        first(),
        switchMap(editedReservation => {
          const reservationWithProposedChanges = this.calculateProposedChanges(reservation, editedReservation)

          const EXCLUDED_KEYS = ['name']
          const changedKeys = Object.keys(reservationWithProposedChanges.proposedChanges).filter(
            key => !EXCLUDED_KEYS.includes(key),
          )
          const hasChanges = changedKeys.length !== 0
          return hasChanges ? of(reservationWithProposedChanges) : EMPTY
        }),
        map(reservation => {
          const { startTime, endTime, locations, proposedChanges } = reservation

          const timeProposal: TimeAvailableInputDto = {
            startTime: proposedChanges.startTime || startTime,
            endTime: proposedChanges.endTime || endTime,
            locations: {
              tableTennis: proposedChanges.locations?.tableTennis || locations.tableTennis,
              badminton: proposedChanges.locations?.badminton || locations.badminton,
            },
            excludedReservation: reservation.id,
          }
          return timeProposal
        }),
        delay(500),
        switchMap(timeProposal => this.reservationService.isTimeAvailable(timeProposal)),
        map(isTimeAvailable => (isTimeAvailable ? null : { timeNotAvailable: true })),
        defaultIfEmpty(null),
      )
    }
  }
}
