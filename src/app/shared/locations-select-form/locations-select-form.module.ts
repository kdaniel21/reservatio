import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LocationsSelectFormComponent } from './locations-select-form.component'
import { LocationsSelectFormService } from './locations-select-form.service'
import { ReactiveFormsModule } from '@angular/forms'
import { LocationsSelectModule } from 'src/app/shared/locations-select/locations-select.module'
import { CoreModule } from 'src/app/core/core.module'

@NgModule({
  declarations: [LocationsSelectFormComponent],
  imports: [CommonModule, CoreModule, ReactiveFormsModule, LocationsSelectModule],
  exports: [LocationsSelectFormComponent],
  providers: [LocationsSelectFormService],
})
export class LocationsSelectFormModule {}
