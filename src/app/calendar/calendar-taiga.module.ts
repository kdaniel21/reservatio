import { NgModule } from '@angular/core'
import {
  TuiButtonModule,
  TuiCalendarModule,
  TuiDataListModule,
  TuiExpandModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiSvgModule,
} from '@taiga-ui/core'
import { TuiCheckboxLabeledModule, TuiIslandModule } from '@taiga-ui/kit'

const taigaModules = [
  TuiIslandModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiHostedDropdownModule,
  TuiCalendarModule,
  TuiCheckboxLabeledModule,
  TuiExpandModule,
  TuiDataListModule,
  TuiLoaderModule,
]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class CalendarTaigaModule {}
