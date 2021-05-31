import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { format } from 'date-fns'
import { BehaviorSubject, defer } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { TaigaUtils } from 'src/app/core/taiga-utils'
import { CreateReservationBaseComponent } from './create-reservation-base/create-reservation-base.component'
import { CreateReservationFormService } from './create-reservation-form.service'
import { CreateReservationService } from './create-reservation.service'

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
  providers: [CreateReservationFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReservationComponent extends CreateReservationBaseComponent {
  selectedStepIndex = 0

  get isFirstStepValid(): boolean {
    return this.createReservationForm.get('name').valid && this.createReservationForm.get('recurring').valid
  }

  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false)
  readonly isLoading$ = this.isLoadingSubject.asObservable()

  constructor(
    protected readonly createReservationFormService: CreateReservationFormService,
    private readonly createReservationService: CreateReservationService,
    private readonly router: Router,
  ) {
    super(createReservationFormService)
  }

  onNextStep(): void {
    this.selectedStepIndex++
  }

  onToggleLocation(path: string): void {
    this.createReservationFormService.toggleLocation(path)
  }

  onCreateReservation(): void {
    const {
      name,
      startTime: tuiStartTime,
      endTime: tuiEndTime,
      locations,
      recurring,
    } = this.createReservationForm.value
    const { isRecurring } = recurring

    const startTime = TaigaUtils.convertDateTimeToNativeDate(tuiStartTime)
    const endTime = TaigaUtils.convertDateTimeToNativeDate(tuiEndTime)

    const action = isRecurring
      ? this.createReservationService.createRecurringReservation({ name, locations, startTime, endTime, ...recurring })
      : this.createReservationService.createReservation({ name, startTime, endTime, locations })

    this.isLoadingSubject.next(true)

    // TODO: Make this more straightforward and investigate why simply subscribing is wrong?
    defer(() => action)
      .pipe(finalize(() => this.isLoadingSubject.next(false)))
      .subscribe({
        next: () => {
          const startDate = format(startTime, 'yyyy-MM-dd')
          this.router.navigate(['/', 'calendar'], { queryParams: { startDate } })
        },
      })
  }
}
