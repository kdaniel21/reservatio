import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditReservationComponent } from './edit-reservation.component'
import { RouterModule } from '@angular/router'
import { CanEditReservationGuard } from './guards/can-edit-reservation.guard'
import { EditReservationTaigaModule } from './edit-reservation-taiga.module'
import { ReactiveFormsModule } from '@angular/forms'
import { TimeSelectFormModule } from '../shared/time-select-form/time-select-form.module'
import { ConnectedUpdateFormComponent } from './connected-update-form/connected-update-form.component'
import { GeneralFormModule } from '../shared/general-form/general-form.module'
import { LocationsSelectFormModule } from '../shared/locations-select-form/locations-select-form.module'
import { RetryErrorMessageModule } from '../shared/retry-error-message/retry-error-message.module'
import { PromptModule } from '../core/prompt/prompt.module'
import { TranslocoRootModule } from '../transloco/transloco-root.module'
import { CoreModule } from '../core/core.module'

@NgModule({
  declarations: [EditReservationComponent, ConnectedUpdateFormComponent],
  imports: [
    CoreModule,
    CommonModule,
    EditReservationTaigaModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditReservationComponent,
        canActivate: [CanEditReservationGuard],
      },
    ]),
    ReactiveFormsModule,
    TimeSelectFormModule,
    GeneralFormModule,
    LocationsSelectFormModule,
    RetryErrorMessageModule,
    PromptModule,
    TranslocoRootModule,
  ],
})
export class EditReservationModule {}
