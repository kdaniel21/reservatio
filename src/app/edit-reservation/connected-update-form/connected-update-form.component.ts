import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { ConnectedUpdateFormService } from './connected-update-form.service'
import { ConnectedUpdateService } from './connected-update.service'

@Component({
  selector: 'app-connected-update-form',
  templateUrl: './connected-update-form.component.html',
  styleUrls: ['./connected-update-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedUpdateFormComponent {
  readonly connectedUpdateForm: FormGroup = this.connectedUpdateFormService.form

  get shouldUpdateConnected(): boolean {
    return this.connectedUpdateForm.value.shouldUpdateConnected
  }

  get connectedUpdates(): FormArray {
    return this.connectedUpdateFormService.connectedUpdates
  }

  readonly relatedReservations$ = this.connectedUpdateService.relatedReservations$
  readonly isLoading$ = this.connectedUpdateService.loader.isLoading$
  readonly hasError$ = this.connectedUpdateService.retryHandler.hasError$

  constructor(
    private readonly connectedUpdateFormService: ConnectedUpdateFormService,
    public readonly connectedUpdateService: ConnectedUpdateService,
  ) {}

  isObjectEmpty(object: object): boolean {
    return Object.keys(object).every(key => !object[key])
  }
}
