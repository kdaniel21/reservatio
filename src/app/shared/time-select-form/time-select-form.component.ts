import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TuiDay } from '@taiga-ui/cdk'
import { add } from 'date-fns'
import { Observable } from 'rxjs'
import { filter, map, startWith } from 'rxjs/operators'
import { TimeSelectFormService } from './time-select-form.service'

@Component({
  selector: 'app-time-select-form',
  templateUrl: './time-select-form.component.html',
  styleUrls: ['./time-select-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeSelectFormComponent {
  readonly timeSelectForm = this.timeSelectFormService.form

  readonly todayTuiDate: TuiDay = TuiDay.currentLocal()
  readonly oneYearFromNowTuiDate: TuiDay = TuiDay.fromLocalNativeDate(add(new Date(), { years: 1 }))

  readonly minEndTuiDate$: Observable<TuiDay> = this.timeSelectForm.valueChanges.pipe(
    filter(startTuiDateTime => startTuiDateTime && startTuiDateTime[0]),
    map(startTuiDateTime => startTuiDateTime[0]),
    startWith(this.todayTuiDate),
  )
  readonly maxStartTuiDate$: Observable<TuiDay> = this.timeSelectForm.valueChanges.pipe(
    filter(endTuiDateTime => endTuiDateTime && endTuiDateTime[0]),
    map(endTuiDateTime => endTuiDateTime[0]),
    startWith(this.oneYearFromNowTuiDate),
  )

  constructor(private readonly timeSelectFormService: TimeSelectFormService) {}
}
