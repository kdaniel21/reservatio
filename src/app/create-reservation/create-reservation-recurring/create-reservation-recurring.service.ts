import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'
import { TranslocoService } from '@ngneat/transloco'

@Injectable()
export class CreateReservationRecurringService {
  readonly form = this.formBuilder.group(
    {
      isRecurring: [false],
      recurrence: [undefined],
      timePeriod: [undefined],
      includedDates: [[]],
      excludedDates: [[]],
    },
    { validators: [this.recurringValidator()] },
  )

  constructor(private readonly formBuilder: FormBuilder, private readonly transloco: TranslocoService) {}

  private recurringValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const { isRecurring, recurrence, timePeriod } = group.value
      if (!isRecurring) return null

      return recurrence && timePeriod
        ? null
        : { recurrence: this.transloco.translate('create_reservation.recurring.all_required') }
    }
  }
}
