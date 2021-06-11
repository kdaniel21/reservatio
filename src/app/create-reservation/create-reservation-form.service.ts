import { Injectable, Injector } from '@angular/core'
import { AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { BehaviorSubject, merge, Observable, of } from 'rxjs'
import { distinctUntilChanged, map, startWith, takeUntil, tap } from 'rxjs/operators'
import { TaigaUtils } from 'src/app/core/taiga-utils'
import { GeneralFormService } from '../shared/general-form/general-form.service'
import { LocationsSelectFormService } from '../shared/locations-select-form/locations-select-form.service'
import { TimeSelectFormService } from '../shared/time-select-form/time-select-form.service'
import { CreateReservationRecurringService } from './create-reservation-recurring/create-reservation-recurring.service'
import { CreateReservationService } from './create-reservation.service'
import { timeAvailabilityValidator } from './validators/time-availability.validator'

@Injectable()
export class CreateReservationFormService {
  readonly form = this.formBuilder.group({
    general: this.generalFormService.form,
    locations: this.locationsSelectFormService.form,
    recurring: this.createReservationRecurringService.form,
    time: this.timeSelectFormService.form,
  })

  private readonly availableTimesSubject = new BehaviorSubject<Date[]>([])
  readonly availableTimes$ = this.availableTimesSubject.asObservable()

  private readonly unavailableTimesSubject = new BehaviorSubject<Date[]>([])
  readonly unavailableTimes$ = this.unavailableTimesSubject.asObservable()

  private readonly setCorrectValidatorAction$ = this.form.controls.recurring.valueChanges.pipe(
    map(value => value.isRecurring),
    startWith(false),
    distinctUntilChanged(),
    tap(isRecurring => {
      const validator = isRecurring
        ? this.recurringTimeAvailabilityValidator()
        : timeAvailabilityValidator(this.injector)

      this.form.setAsyncValidators(validator)
    }),
  )

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly createReservationService: CreateReservationService,
    private readonly timeSelectFormService: TimeSelectFormService,
    private readonly locationsSelectFormService: LocationsSelectFormService,
    private readonly createReservationRecurringService: CreateReservationRecurringService,
    private readonly generalFormService: GeneralFormService,
    private readonly destroy$: TuiDestroyService,
    private readonly injector: Injector,
  ) {
    merge(this.setCorrectValidatorAction$).pipe(takeUntil(this.destroy$)).subscribe()
  }

  rescheduleTime(oldTime: Date, newTime: Date, wasAvailable: boolean) {
    const availableTimes = [...this.availableTimesSubject.getValue()]
    const unavailableTimes = [...this.unavailableTimesSubject.getValue()]

    const subject = wasAvailable ? availableTimes : unavailableTimes
    const index = subject.findIndex(time => time.getTime() === oldTime.getTime())

    if (wasAvailable) {
      unavailableTimes.splice(index, 1)
      availableTimes.push(newTime)
      this.unavailableTimesSubject.next(unavailableTimes)
    } else {
      availableTimes[index] = newTime
    }

    this.availableTimesSubject.next(availableTimes)

    const { includedDates, excludedDates } = this.form.get('recurring').value
    this.form
      .get('recurring')
      .patchValue({ includedDates: [...includedDates, newTime], excludedDates: [...excludedDates, oldTime] })
  }

  private recurringTimeAvailabilityValidator(): AsyncValidatorFn {
    return (group: FormGroup): Observable<ValidationErrors> => {
      const hasStillUnavailableTimes = !!this.unavailableTimesSubject.getValue().length
      if (hasStillUnavailableTimes) return of({ recurringTimeAvailability: false })

      const { locations, recurring, time } = group.value

      const startTime = TaigaUtils.convertDateTimeToNativeDate(time.startTime)
      const endTime = TaigaUtils.convertDateTimeToNativeDate(time.endTime)

      return this.createReservationService
        .isRecurringTimeAvailable({ startTime, endTime, locations, ...recurring })
        .pipe(
          tap(availability => {
            this.availableTimesSubject.next(availability.availableTimes)
            this.unavailableTimesSubject.next(availability.unavailableTimes)
          }),
          map(availability => {
            const isAvailable = !availability.unavailableTimes.length
            return isAvailable ? null : { recurringTimeAvailability: false }
          }),
        )
    }
  }
}
