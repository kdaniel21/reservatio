import { Component, ChangeDetectionStrategy } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { CreateReservationBaseComponent } from '../create-reservation-base/create-reservation-base.component'

@Component({
  selector: 'app-create-reservation-locations',
  templateUrl: './create-reservation-locations.component.html',
  styleUrls: ['./create-reservation-locations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReservationLocationsComponent extends CreateReservationBaseComponent {
  get locationsControl(): AbstractControl {
    return this.createReservationForm.get('locations')
  }

  onToggleLocation(path: string): void {
    const currentValue = this.locationsControl.get(path).value

    this.locationsControl.get(path).setValue(!currentValue)
    this.locationsControl.get(path).markAsTouched()
  }
}
