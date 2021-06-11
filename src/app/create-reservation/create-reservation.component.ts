import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { format } from 'date-fns'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { TaigaUtils } from 'src/app/core/taiga-utils'
import { Loader } from '../core/loader/loader'
import { CreateReservationFormService } from './create-reservation-form.service'
import { CreateReservationRecurringService } from './create-reservation-recurring/create-reservation-recurring.service'
import { CreateReservationService } from './create-reservation.service'

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateReservationFormService, CreateReservationRecurringService, TuiDestroyService],
})
export class CreateReservationComponent {
  selectedStepIndex = 0

  get isFirstStepValid(): boolean {
    return this.createReservationForm.get('general').valid && this.createReservationForm.get('recurring').valid
  }

  readonly loader = new Loader()

  readonly createReservationForm: FormGroup = this.createReservationFormService.form

  constructor(
    private readonly createReservationFormService: CreateReservationFormService,
    private readonly createReservationService: CreateReservationService,
    private readonly router: Router,
  ) {}

  onNextStep(): void {
    this.selectedStepIndex++
  }

  onCreateReservation(): void {
    const { general, time, locations, recurring } = this.createReservationForm.value
    const { isRecurring } = recurring
    const { name } = general

    const startTime = TaigaUtils.convertDateTimeToNativeDate(time.startTime)
    const endTime = TaigaUtils.convertDateTimeToNativeDate(time.endTime)

    const action: Observable<any> = isRecurring
      ? this.createReservationService.createRecurringReservation({ name, locations, startTime, endTime, ...recurring })
      : this.createReservationService.createReservation({ name, startTime, endTime, locations })

    this.loader.startLoading()

    action.pipe(finalize(() => this.loader.stopLoading())).subscribe({
      next: () => {
        const startDate = format(startTime, 'yyyy-MM-dd')
        this.router.navigate(['/', 'calendar'], { queryParams: { startDate } })
      },
    })
  }
}
