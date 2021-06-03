import { Injectable } from '@angular/core'
import { AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import isValid from 'date-fns/isValid'
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs'
import { distinctUntilChanged, map, startWith, takeUntil, tap } from 'rxjs/operators'
import { tuiDateTimeFutureOnly } from 'src/app/core/form-validators/tui-date-time-future-only.validator'
import { tuiDateTimeRequired } from 'src/app/core/form-validators/tui-date-time-required.validator'
import { TaigaUtils } from 'src/app/core/taiga-utils'
import { CreateReservationService } from './create-reservation.service'
import { locationValidator } from './validators/location.validator'
import { recurringValidator } from './validators/recurring.validator'
import { timeAvailabilityValidator } from './validators/time-availability.validator'
import { timeValidator } from './validators/time.validator'

@Injectable()
export class CreateReservationFormService {
  private readonly destroy$ = new Subject<void>()

  readonly form = this.formBuilder.group({
    name: [undefined, Validators.required],
    locations: this.formBuilder.group(
      {
        tableTennis: [false],
        badminton: [false],
      },
      { validators: [locationValidator] },
    ),
    recurring: this.formBuilder.group(
      {
        isRecurring: [false],
        recurrence: [undefined],
        timePeriod: [undefined],
        includedDates: [[]],
        excludedDates: [[]],
      },
      { validators: [recurringValidator] },
    ),
    time: this.formBuilder.group(
      {
        startTime: [undefined, [tuiDateTimeRequired, tuiDateTimeFutureOnly]],
        endTime: [undefined, [tuiDateTimeRequired, tuiDateTimeFutureOnly]],
      },
      { validators: [timeValidator] },
    ),
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
        : timeAvailabilityValidator(this.createReservationService)

      this.form.setAsyncValidators(validator)
    }),
  )

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly createReservationService: CreateReservationService,
    private readonly route: ActivatedRoute,
  ) {
    merge(this.setCorrectValidatorAction$).pipe(takeUntil(this.destroy$)).subscribe()

    this.preFillQueryParams()
  }

  toggleLocation(path: string) {
    const currentValue = this.form.get(path).value

    this.form.get(path).setValue(!currentValue)
    this.form.get(path).markAsTouched()
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

  private preFillQueryParams() {
    const startTimeParam = this.route.snapshot.queryParamMap.get('startTime')
    const startTime = new Date(startTimeParam)

    if (isValid(startTime)) {
      const tuiStartTime = TaigaUtils.convertNativeDateToDateTime(startTime)
      this.form.get('time').patchValue({ startTime: tuiStartTime })
    }
  }

  // TODO: Repeat this query only if there are no items left in the unavailableItems$ subject
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
