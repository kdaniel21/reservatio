import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TimePeriod, Recurrence } from 'src/app/core/graphql/generated'
import { CreateReservationBaseComponent } from '../create-reservation-base/create-reservation-base.component'

const timePeriodOptions = {
  [TimePeriod.CurrentYear]: 'Until the end of the current year',
  [TimePeriod.HalfYear]: 'For the next six months',
}

const recurrenceOptions = {
  [Recurrence.Weekly]: 'Every week on the same day',
  [Recurrence.Monthly]: 'Every four weeks at the same day',
}

@Component({
  selector: 'app-create-reservation-recurring',
  templateUrl: './create-reservation-recurring.component.html',
  styleUrls: ['./create-reservation-recurring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReservationRecurringComponent extends CreateReservationBaseComponent {
  readonly timePeriodOptions = timePeriodOptions
  readonly recurrenceOptions = recurrenceOptions

  get haveAllControlsBeenTouched(): boolean {
    const group = this.createReservationForm.get('recurring') as FormGroup
    const { timePeriod, recurrence } = group.controls

    return group && timePeriod.touched && recurrence.touched
  }
}
