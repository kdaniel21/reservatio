import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { ReservationLocations } from '../../calendar/calendar/calendar.service'

interface LocationOption {
  icon: string
  value: string
  name: string
}

@Component({
  selector: 'app-locations-select',
  templateUrl: './locations-select.component.html',
  styleUrls: ['./locations-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationLocationsSelectComponent {
  @Input() locations: ReservationLocations
  @Input() isDisabled = false
  @Input() isLoading = false

  @Output() toggleLocation = new EventEmitter<string>()

  readonly locationOptions: LocationOption[] = [
    { icon: 'tableTennisIcon', value: 'tableTennis', name: this.transloco.translate('reservation.table_tennis') },
    { icon: 'badmintonIcon', value: 'badminton', name: this.transloco.translate('reservation.badminton') },
  ]

  constructor(private readonly transloco: TranslocoService) {}

  onToggleLocation(locationName: string): void {
    this.toggleLocation.next(locationName)
  }
}
