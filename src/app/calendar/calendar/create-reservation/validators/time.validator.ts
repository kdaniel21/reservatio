import { FormGroup, ValidationErrors } from '@angular/forms'
import { isBefore } from 'date-fns'
import { TaigaUtils } from 'src/app/core/taiga-utils'

export const timeValidator = (group: FormGroup): ValidationErrors => {
  try {
    const { startTime: tuiStartTime, endTime: tuiEndTime } = group.value

    const startTime = TaigaUtils.convertDateTimeToNativeDate(tuiStartTime)
    const endTime = TaigaUtils.convertDateTimeToNativeDate(tuiEndTime)

    return isBefore(startTime, endTime) ? null : { timeValidator: `The 'startTime' must be before the 'endTime'!` }
  } catch {
    return { timeValidator: 'Incomplete date or time!' }
  }
}
