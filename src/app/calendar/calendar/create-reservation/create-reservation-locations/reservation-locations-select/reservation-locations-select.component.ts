import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core'
import { ReservationLocations } from '../../../calendar.service'

interface LocationOption {
  icon: string
  value: string
  name: string
}

@Component({
  selector: 'app-reservation-locations-select',
  templateUrl: './reservation-locations-select.component.html',
  styleUrls: ['./reservation-locations-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationLocationsSelectComponent {
  @Input() locations: ReservationLocations
  @Input() isDisabled = false
  @Input() isLoading = false

  @Output() toggleLocation = new EventEmitter<string>()

  readonly locationOptions: LocationOption[] = [
    { icon: 'tuiIconCallLarge', value: 'tableTennis', name: 'Table tennis' },
    { icon: 'tuiIconCallLarge', value: 'badminton', name: 'Badminton' },
  ]

  onToggleLocation(locationName: string): void {
    this.toggleLocation.next(locationName)
  }
}
