import { NgModule } from '@angular/core'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiHintModule,
  TuiSvgModule,
  TuiTooltipModule,
} from '@taiga-ui/core'
import { TuiCheckboxModule, TuiIslandModule, TuiToggleModule } from '@taiga-ui/kit'

const taigaModules = [
  TuiButtonModule,
  TuiIslandModule,
  TuiToggleModule,
  TuiTooltipModule,
  TuiDataListModule,
  TuiCheckboxModule,
  TuiSvgModule,
  TuiHintModule,
  TuiErrorModule,
]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class EditReservationTaigaModule {}
