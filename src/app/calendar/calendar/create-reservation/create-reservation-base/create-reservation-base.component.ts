import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CreateReservationFormService } from '../create-reservation-form.service'

@Component({
  selector: 'app-create-reservation-base',
  template: ``,
  styles: [],
})
export class CreateReservationBaseComponent {
  get createReservationForm(): FormGroup {
    return this.createReservationFormService.form
  }

  constructor(protected readonly createReservationFormService: CreateReservationFormService) {}
}
