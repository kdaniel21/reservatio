import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReservationLocationsSelectComponent } from './locations-select.component'
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core'
import { CoreModule } from 'src/app/core/core.module'

@NgModule({
  declarations: [ReservationLocationsSelectComponent],
  imports: [CommonModule, CoreModule, TuiGroupModule, TuiButtonModule],
  exports: [ReservationLocationsSelectComponent],
})
export class LocationsSelectModule {}
