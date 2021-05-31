import { AbstractControl, ValidationErrors } from '@angular/forms'
import isPast from 'date-fns/isPast'
import { TaigaUtils } from '../taiga-utils'

export const tuiDateTimeFutureOnly = (control: AbstractControl): ValidationErrors => {
  try {
    const tuiDateTime = control.value
    const dateTime = TaigaUtils.convertDateTimeToNativeDate(tuiDateTime)

    return isPast(dateTime) ? { tuiFutureOnly: 'It must be a future date and time!' } : null
  } catch {
    return { tuiFutureOnly: 'Incomplete date or time!' }
  }
}
