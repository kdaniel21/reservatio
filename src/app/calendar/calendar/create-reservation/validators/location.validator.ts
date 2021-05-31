import { FormGroup, ValidationErrors } from '@angular/forms'

export const locationValidator = (group: FormGroup): ValidationErrors => {
  const includesTrue = Object.values(group.value).some(value => value === true)

  return includesTrue ? null : { locationNotSelected: 'At least one location must be selected!' }
}
