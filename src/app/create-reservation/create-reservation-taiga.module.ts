import { NgModule } from '@angular/core'
import {
  TuiExpandModule,
  TuiTooltipModule,
  TuiDataListModule,
  TuiNotificationModule,
  TuiErrorModule,
  TuiSvgModule,
  TuiButtonModule,
} from '@taiga-ui/core'
import { TuiStepperModule, TuiToggleModule, TuiSelectModule, TuiIslandModule } from '@taiga-ui/kit'
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus'

const taigaModules = [
  TuiExpandModule,
  TuiStepperModule,
  TuiToggleModule,
  TuiTooltipModule,
  TuiSelectModule,
  TuiDataListModule,
  TuiNotificationModule,
  TuiErrorModule,
  PolymorpheusModule,
  TuiSvgModule,
  TuiIslandModule,
  TuiButtonModule,
]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class CreateReservationTaigaModule {}
