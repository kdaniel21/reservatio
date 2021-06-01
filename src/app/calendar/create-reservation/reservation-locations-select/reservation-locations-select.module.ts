import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReservationLocationsSelectComponent } from './reservation-locations-select.component'
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core'

@NgModule({
  declarations: [ReservationLocationsSelectComponent],
  imports: [CommonModule, TuiGroupModule, TuiButtonModule],
  exports: [ReservationLocationsSelectComponent],
})
export class ReservationLocationsSelectModule {}
