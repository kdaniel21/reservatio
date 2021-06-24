import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { TimePeriod, Recurrence } from 'src/app/core/graphql/generated'
import { CreateReservationRecurringService } from './create-reservation-recurring.service'

@Component({
  selector: 'app-create-reservation-recurring',
  templateUrl: './create-reservation-recurring.component.html',
  styleUrls: ['./create-reservation-recurring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReservationRecurringComponent {
  readonly timePeriodOptions = {
    [TimePeriod.CurrentYear]: this.transloco.translate('reservation.time_period.current_year'),
    [TimePeriod.HalfYear]: this.transloco.translate('reservation.time_period.half_year'),
  }

  readonly recurrenceOptions = {
    [Recurrence.Weekly]: this.transloco.translate('reservation.recurrence.weekly'),
    [Recurrence.Monthly]: this.transloco.translate('reservation.recurrence.monthly'),
  }

  readonly recurringForm = this.createReservationRecurringService.form

  constructor(
    private readonly createReservationRecurringService: CreateReservationRecurringService,
    private readonly transloco: TranslocoService,
  ) {}

  get haveAllControlsBeenTouched(): boolean {
    const { timePeriod, recurrence } = this.recurringForm.controls

    return timePeriod.touched && recurrence.touched
  }
}
