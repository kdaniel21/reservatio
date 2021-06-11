import { Component, ChangeDetectionStrategy } from '@angular/core'
import { startWith } from 'rxjs/operators'
import { LocationsSelectFormService } from './locations-select-form.service'

@Component({
  selector: 'app-locations-select-form',
  templateUrl: './locations-select-form.component.html',
  styleUrls: ['./locations-select-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsSelectFormComponent {
  readonly locationsForm = this.locationsSelectFormService.form

  readonly selectedLocation$ = this.locationsForm.valueChanges.pipe(startWith(this.locationsForm.value))

  constructor(private readonly locationsSelectFormService: LocationsSelectFormService) {}

  onToggleLocation(path: string): void {
    const currentValue = this.locationsForm.get(path).value

    this.locationsForm.get(path).markAsTouched()
    this.locationsForm.get(path).markAsDirty()
    this.locationsForm.markAsDirty()
    this.locationsForm.get(path).setValue(!currentValue)
  }
}
