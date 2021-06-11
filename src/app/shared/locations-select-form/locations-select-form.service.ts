import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'

@Injectable()
export class LocationsSelectFormService {
  readonly form = this.formBuilder.group(
    {
      tableTennis: [false],
      badminton: [false],
    },
    { validators: [this.locationsValidator()] },
  )

  constructor(private readonly formBuilder: FormBuilder) {}

  private locationsValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const includesTrue = Object.values(group.value).some(value => value === true)

      return includesTrue ? null : { locationNotSelected: 'At least one location must be selected!' }
    }
  }
}
