import { Component, ChangeDetectionStrategy } from '@angular/core'
import { CreateReservationBaseComponent } from '../create-reservation-base/create-reservation-base.component'

@Component({
  selector: 'app-create-reservation-general',
  templateUrl: './create-reservation-general.component.html',
  styleUrls: ['./create-reservation-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReservationGeneralComponent extends CreateReservationBaseComponent {}
