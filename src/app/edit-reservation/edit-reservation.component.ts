import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { format } from 'date-fns'
import { Observable } from 'rxjs'
import { first, switchMap } from 'rxjs/operators'
import { TaigaUtils } from '../core/taiga-utils'
import { ConnectedUpdateFormService } from './connected-update-form/connected-update-form.service'
import { ConnectedUpdateService } from './connected-update-form/connected-update.service'
import { EditReservationFormService } from './edit-reservation-form.service'
import { EditReservationService } from './edit-reservation.service'

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EditReservationService,
    EditReservationFormService,
    ConnectedUpdateFormService,
    TuiDestroyService,
    ConnectedUpdateService,
  ],
})
export class EditReservationComponent {
  readonly editReservationForm: FormGroup = this.editReservationFormService.form

  readonly isLoading$ = this.editReservationService.loader.isLoading$
  readonly hasError$ = this.editReservationService.retryHandler.hasError$
  readonly editedReservation$ = this.editReservationService.editedReservation$

  constructor(
    private readonly editReservationFormService: EditReservationFormService,
    public readonly editReservationService: EditReservationService,
    private readonly router: Router,
  ) {}

  onRemove(): void {
    this.deleteReservation().subscribe({
      next: () => this.router.navigate(['/', 'calendar']),
    })
  }

  onUpdateReservation(): void {
    this.updateReservation().subscribe({
      next: () => {
        const startTime = TaigaUtils.convertDateTimeToNativeDate(this.editReservationForm.value.time.startTime)
        this.router.navigate(['/', 'calendar'], { queryParams: { startDate: format(startTime, 'yyyy-MM-dd') } })
      },
    })
  }

  private updateReservation(): Observable<void> {
    const connectedUpdates = this.editReservationFormService.getConnectedUpdatedIds()

    return this.editedReservation$.pipe(
      first(),
      switchMap(editedReservation => {
        const updatedProperties = this.editReservationFormService.getChangedValues(editedReservation)

        return this.editReservationService.updateReservation(editedReservation.id, updatedProperties, connectedUpdates)
      }),
    )
  }

  private deleteReservation(): Observable<void> {
    return this.editedReservation$.pipe(
      first(),
      switchMap(editedReservation => {
        const connectedUpdates = this.editReservationFormService.getConnectedUpdatedIds()

        return this.editReservationService.deleteReservation(editedReservation.id, connectedUpdates)
      }),
    )
  }
}
