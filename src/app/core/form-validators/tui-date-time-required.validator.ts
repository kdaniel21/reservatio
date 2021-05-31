import { AbstractControl, ValidationErrors } from '@angular/forms'

export const tuiDateTimeRequired = (control: AbstractControl): ValidationErrors => {
  if (!control.value?.length || !control.value[0]) return { dateRequired: true }
  if (!control.value[1]) return { timeRequired: true }

  return null
}
