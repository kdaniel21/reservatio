import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core'
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk'
import { add } from 'date-fns'
import { merge, Observable } from 'rxjs'
import { filter, map, mapTo, startWith, takeUntil, tap } from 'rxjs/operators'
import { CreateReservationBaseComponent } from '../create-reservation-base/create-reservation-base.component'
import { CreateReservationFormService } from '../create-reservation-form.service'

@Component({
  selector: 'app-create-reservation-time',
  templateUrl: './create-reservation-time.component.html',
  styleUrls: ['./create-reservation-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class CreateReservationTimeComponent extends CreateReservationBaseComponent implements OnInit {
  get isRecurring(): boolean {
    return this.createReservationForm.value.recurring.isRecurring
  }

  readonly availableTimes$ = this.createReservationFormService.availableTimes$
  readonly unavailableTimes$ = this.createReservationFormService.unavailableTimes$

  readonly todayTuiDate: TuiDay = TuiDay.currentLocal()
  readonly oneYearFromNowTuiDate: TuiDay = TuiDay.fromLocalNativeDate(add(new Date(), { years: 1 }))

  readonly minEndTuiDate$: Observable<TuiDay> = this.createReservationForm.get('time.startTime').valueChanges.pipe(
    filter(startTuiDateTime => startTuiDateTime && startTuiDateTime[0]),
    map(startTuiDateTime => startTuiDateTime[0]),
    startWith(this.todayTuiDate),
  )
  readonly maxStartTuiDate$: Observable<TuiDay> = this.createReservationForm.get('time.endTime').valueChanges.pipe(
    filter(endTuiDateTime => endTuiDateTime && endTuiDateTime[0]),
    map(endTuiDateTime => endTuiDateTime[0]),
    startWith(this.oneYearFromNowTuiDate),
  )

  // TODO: Remove this action once there's a way to trigger change detection after async validator finishes
  // See: https://github.com/angular/angular/issues/10816
  private readonly detectChangesAfterAsyncValidator$: Observable<void> = this.createReservationForm.statusChanges.pipe(
    tap(() => this.changeDetectorRef.markForCheck()),
    mapTo(void 0),
  )

  constructor(
    protected readonly createReservationFormService: CreateReservationFormService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroy$: TuiDestroyService,
  ) {
    super(createReservationFormService)
  }

  ngOnInit(): void {
    merge(this.detectChangesAfterAsyncValidator$).pipe(takeUntil(this.destroy$)).subscribe()
  }
}
