import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { isBefore, isValid } from 'date-fns'
import { tuiDateTimeFutureOnly } from 'src/app/core/form-validators/tui-date-time-future-only.validator'
import { tuiDateTimeRequired } from 'src/app/core/form-validators/tui-date-time-required.validator'
import { TaigaUtils } from 'src/app/core/taiga-utils'

@Injectable()
export class TimeSelectFormService {
  readonly form = this.formBuilder.group(
    {
      startTime: [undefined, [tuiDateTimeRequired, tuiDateTimeFutureOnly]],
      endTime: [undefined, [tuiDateTimeRequired, tuiDateTimeFutureOnly]],
    },
    { validators: [this.timeValidator()] },
  )

  constructor(private readonly formBuilder: FormBuilder, private readonly route: ActivatedRoute) {
    this.preFillQueryParams()
  }

  private preFillQueryParams() {
    const startTimeParam = this.route.snapshot.queryParamMap.get('startTime')
    if (!startTimeParam) return

    const startTime = new Date(startTimeParam)

    if (isValid(startTime)) {
      const tuiStartTime = TaigaUtils.convertNativeDateToDateTime(startTime)
      this.form.patchValue({ startTime: tuiStartTime })
    }
  }

  private timeValidator(): ValidatorFn {
    return (group: FormGroup) => {
      try {
        const { startTime: tuiStartTime, endTime: tuiEndTime } = group.value

        const startTime = TaigaUtils.convertDateTimeToNativeDate(tuiStartTime)
        const endTime = TaigaUtils.convertDateTimeToNativeDate(tuiEndTime)

        return isBefore(startTime, endTime) ? null : { timeValidator: `The 'startTime' must be before the 'endTime'!` }
      } catch {
        return { timeValidator: 'Incomplete date or time!' }
      }
    }
  }
}
