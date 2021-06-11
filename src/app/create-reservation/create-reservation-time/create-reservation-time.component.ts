import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { merge, Observable } from 'rxjs'
import { mapTo, takeUntil, tap } from 'rxjs/operators'
import { CreateReservationFormService } from '../create-reservation-form.service'

@Component({
  selector: 'app-create-reservation-time',
  templateUrl: './create-reservation-time.component.html',
  styleUrls: ['./create-reservation-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class CreateReservationTimeComponent implements OnInit {
  get isRecurring(): boolean {
    return this.createReservationForm.value.recurring.isRecurring
  }

  readonly createReservationForm: FormGroup = this.createReservationFormService.form

  readonly availableTimes$ = this.createReservationFormService.availableTimes$
  readonly unavailableTimes$ = this.createReservationFormService.unavailableTimes$

  // TODO: Remove this action once there's a way to trigger change detection after async validator finishes
  // See: https://github.com/angular/angular/issues/10816
  private readonly detectChangesAfterAsyncValidator$: Observable<void> = this.createReservationForm.statusChanges.pipe(
    tap(() => this.changeDetectorRef.markForCheck()),
    mapTo(void 0),
  )

  constructor(
    private readonly createReservationFormService: CreateReservationFormService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroy$: TuiDestroyService,
  ) {}

  ngOnInit(): void {
    merge(this.detectChangesAfterAsyncValidator$).pipe(takeUntil(this.destroy$)).subscribe()
  }
}
