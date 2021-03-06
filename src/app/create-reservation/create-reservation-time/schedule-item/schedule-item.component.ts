import { Component, ChangeDetectionStrategy, Input, ViewChild, OnInit, Injector } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { TuiDay, TuiTime } from '@taiga-ui/cdk'
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core'
import { PolymorpheusTemplate } from '@tinkoff/ng-polymorpheus'
import { add, addMilliseconds, differenceInMilliseconds } from 'date-fns'
import { Observable } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { tuiDateTimeFutureOnly } from 'src/app/core/form-validators/tui-date-time-future-only.validator'
import { tuiDateTimeRequired } from 'src/app/core/form-validators/tui-date-time-required.validator'
import { TaigaUtils } from 'src/app/core/taiga-utils'
import { CreateReservationFormService } from '../../create-reservation-form.service'
import { timeAvailabilityValidator } from '../../validators/time-availability.validator'

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleItemComponent implements OnInit {
  @Input() time: Date
  @Input() isAvailable: boolean

  readonly todayTuiDate: TuiDay = TuiDay.currentLocal()
  readonly oneYearFromNowTuiDate: TuiDay = TuiDay.fromLocalNativeDate(add(new Date(), { years: 1 }))

  get originalReservationLengthMs(): number {
    const { startTime: tuiStartTime, endTime: tuiEndTime } = this.createReservationFormService.form.get('time').value
    const startTime = TaigaUtils.convertDateTimeToNativeDate(tuiStartTime)
    const endTime = TaigaUtils.convertDateTimeToNativeDate(tuiEndTime)

    return differenceInMilliseconds(endTime, startTime)
  }

  get endTime(): Date {
    return addMilliseconds(this.time, this.originalReservationLengthMs)
  }

  @ViewChild(PolymorpheusTemplate) rescheduleDialog: PolymorpheusTemplate<TuiDialogContext>

  readonly rescheduleForm = this.formBuilder.group(
    {
      time: this.formBuilder.group({
        startTime: [undefined, [tuiDateTimeRequired, tuiDateTimeFutureOnly]],
        endTime: [undefined, [tuiDateTimeRequired, tuiDateTimeFutureOnly]],
      }),
      locations: [undefined],
    },
    { asyncValidators: [timeAvailabilityValidator(this.injector)] },
  )

  readonly newStartTime$: Observable<Date> = this.rescheduleForm.get('time.startTime').valueChanges.pipe(
    filter(() => this.rescheduleForm.get('time.startTime').valid),
    map((tuiStartTime: [TuiDay, TuiTime]) => TaigaUtils.convertDateTimeToNativeDate(tuiStartTime)),
  )
  readonly newEndTime$: Observable<Date> = this.newStartTime$.pipe(
    map(newStartTime => addMilliseconds(newStartTime, this.originalReservationLengthMs)),
    tap(endTime => {
      const tuiEndDateTime = TaigaUtils.convertNativeDateToDateTime(endTime)
      this.rescheduleForm.get('time').patchValue({ endTime: tuiEndDateTime })
    }),
  )

  constructor(
    private readonly dialogService: TuiDialogService,
    private readonly formBuilder: FormBuilder,
    private readonly createReservationFormService: CreateReservationFormService,
    private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    const { locations } = this.createReservationFormService.form.value
    this.rescheduleForm.patchValue({ locations })
  }

  onOpenRescheduleDialog(): void {
    this.dialogService.open(this.rescheduleDialog, { label: 'Reschedule' }).subscribe()
  }

  onReschedule(): void {
    const { startTime: newTuiTime } = this.rescheduleForm.get('time').value
    const oldTime = this.time
    const newTime = TaigaUtils.convertDateTimeToNativeDate(newTuiTime)

    this.createReservationFormService.rescheduleTime(oldTime, newTime, this.isAvailable)
  }
}
