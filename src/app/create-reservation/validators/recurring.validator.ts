import { FormGroup, ValidationErrors } from '@angular/forms'

export const recurringValidator = (group: FormGroup): ValidationErrors => {
  const { isRecurring, recurrence, timePeriod } = group.value
  if (!isRecurring) return null

  return recurrence && timePeriod ? null : { recurrence: 'All fields are required' }
}
