import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TimePeriod, Recurrence } from 'src/app/core/graphql/generated'
import { CreateReservationRecurringService } from './create-reservation-recurring.service'

const timePeriodOptions = {
  [TimePeriod.CurrentYear]: 'Until the end of the current year',
  [TimePeriod.HalfYear]: 'For the next six months',
}

const recurrenceOptions = {
  [Recurrence.Weekly]: 'Every week on the same day',
  [Recurrence.Monthly]: 'Every four weeks on the same day',
}

@Component({
  selector: 'app-create-reservation-recurring',
  templateUrl: './create-reservation-recurring.component.html',
  styleUrls: ['./create-reservation-recurring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReservationRecurringComponent {
  readonly timePeriodOptions = timePeriodOptions
  readonly recurrenceOptions = recurrenceOptions

  readonly recurringForm = this.createReservationRecurringService.form

  constructor(private readonly createReservationRecurringService: CreateReservationRecurringService) {}

  get haveAllControlsBeenTouched(): boolean {
    const { timePeriod, recurrence } = this.recurringForm.controls

    return timePeriod.touched && recurrence.touched
  }
}
