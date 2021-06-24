import { Injectable } from '@angular/core'
import { AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms'
import { TranslocoService } from '@ngneat/transloco'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { updatedDiff } from 'deep-object-diff'
import { EMPTY, merge, Observable, of, timer } from 'rxjs'
import { defaultIfEmpty, map, mapTo, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators'
import { Reservation } from '../calendar/calendar/calendar-reservation-details/reservation-details.service'
import { TimeProposalInput } from '../core/graphql/generated'
import { ReservationService } from '../core/services/reservation-service/reservation.service'
import { TaigaUtils } from '../core/taiga-utils'
import { GeneralFormService } from '../shared/general-form/general-form.service'
import { LocationsSelectFormService } from '../shared/locations-select-form/locations-select-form.service'
import { TimeSelectFormService } from '../shared/time-select-form/time-select-form.service'
import { ConnectedUpdateFormService } from './connected-update-form/connected-update-form.service'
import { EditReservationService } from './edit-reservation.service'

@Injectable()
export class EditReservationFormService {
  readonly form: FormGroup = this.formBuilder.group(
    {
      general: this.generalFormService.form,
      locations: this.locationsSelectFormService.form,
      time: this.timeSelectFormService.form,
      connectedUpdate: this.connectedUpdateFormService.form,
    },
    { asyncValidators: [this.timeAvailabilityValidator()] },
  )
  private readonly editedReservation$ = this.editReservationService.editedReservation$

  private readonly populateFormAction$: Observable<void> = this.editedReservation$.pipe(
    tap(editedReservation => this.populateForm(editedReservation)),
    mapTo(void 0),
  )

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly timeSelectFormService: TimeSelectFormService,
    private readonly locationsSelectFormService: LocationsSelectFormService,
    private readonly connectedUpdateFormService: ConnectedUpdateFormService,
    private readonly generalFormService: GeneralFormService,
    private readonly destroy$: TuiDestroyService,
    private readonly editReservationService: EditReservationService,
    private readonly reservationService: ReservationService,
    private readonly transloco: TranslocoService,
  ) {
    merge(this.populateFormAction$).pipe(takeUntil(this.destroy$)).subscribe()
  }

  getChangedValues(referenceReservation: Reservation): Partial<Reservation> {
    const { general, locations, time } = this.form.value

    const updatedReservation = {
      name: general.name,
      startTime: TaigaUtils.convertDateTimeToNativeDate(time.startTime),
      endTime: TaigaUtils.convertDateTimeToNativeDate(time.endTime),
      locations,
    }

    const diff: { [key: string]: any } = updatedDiff(referenceReservation, updatedReservation)
    if (diff.startTime || diff.endTime) {
      diff.startTime = updatedReservation.startTime
      diff.endTime = updatedReservation.endTime
    }

    if (diff.locations) diff.locations = updatedReservation.locations

    return diff
  }

  getConnectedUpdatedIds(): string[] {
    return this.connectedUpdateFormService.getConnectedUpdatedIds()
  }

  private populateForm(reservation: Reservation): void {
    const { name, startTime, endTime, locations } = reservation

    const general = { name }
    const time = {
      startTime: TaigaUtils.convertNativeDateToDateTime(startTime),
      endTime: TaigaUtils.convertNativeDateToDateTime(endTime),
    }

    this.form.patchValue({ general, locations, time })
  }

  private timeAvailabilityValidator(): AsyncValidatorFn {
    return (group: FormGroup): Observable<ValidationErrors> => {
      return timer(500).pipe(
        withLatestFrom(this.editedReservation$),
        switchMap(([, editedReservation]) => {
          const EXCLUDED_KEYS = ['name']

          const changes = this.getChangedValues(editedReservation)
          const changedKeys = Object.keys(changes).filter(key => !EXCLUDED_KEYS.includes(key))
          const hasChanges = changedKeys.length !== 0

          return hasChanges ? of(editedReservation) : EMPTY
        }),
        map(editedReservation => {
          const { locations, time } = group.value

          return {
            startTime: TaigaUtils.convertDateTimeToNativeDate(time.startTime),
            endTime: TaigaUtils.convertDateTimeToNativeDate(time.endTime),
            locations,
            excludedReservation: editedReservation.id,
          } as TimeProposalInput
        }),
        switchMap(timeProposal => this.reservationService.isTimeAvailable(timeProposal)),
        map(isTimeAvailable => {
          const message = this.transloco.translate('edit_reservation.time_not_available')
          return isTimeAvailable ? null : { timeNotAvailable: message }
        }),
        defaultIfEmpty(null),
      )
    }
  }
}
