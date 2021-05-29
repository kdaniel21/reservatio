import { NgModule } from '@angular/core'
import { TuiOverscrollModule } from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiCalendarModule,
  TuiDataListModule,
  TuiExpandModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core'
import { TuiCheckboxLabeledModule, TuiInputDateModule, TuiIslandModule, TuiMultiSelectModule } from '@taiga-ui/kit'

const taigaModules = [
  TuiOverscrollModule,
  TuiIslandModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiHostedDropdownModule,
  TuiDataListModule,
  TuiMultiSelectModule,
  TuiInputDateModule,
  TuiCalendarModule,
  TuiCheckboxLabeledModule,
  TuiExpandModule,
]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class CalendarTaigaModule {}
