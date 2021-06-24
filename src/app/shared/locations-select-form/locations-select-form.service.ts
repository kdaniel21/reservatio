import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'
import { TranslocoService } from '@ngneat/transloco'

@Injectable()
export class LocationsSelectFormService {
  readonly form = this.formBuilder.group(
    {
      tableTennis: [false],
      badminton: [false],
    },
    { validators: [this.locationsValidator()] },
  )

  constructor(private readonly formBuilder: FormBuilder, private readonly transloco: TranslocoService) {}

  private locationsValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const includesTrue = Object.values(group.value).some(value => value === true)

      return includesTrue
        ? null
        : { locationNotSelected: this.transloco.translate('shared.location_select.at_least_one_selected') }
    }
  }
}
