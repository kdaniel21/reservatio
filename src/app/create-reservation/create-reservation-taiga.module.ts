import { NgModule } from '@angular/core'
import {
  TuiExpandModule,
  TuiTooltipModule,
  TuiDataListModule,
  TuiGroupModule,
  TuiNotificationModule,
  TuiErrorModule,
  TuiSvgModule,
  TuiButtonModule,
} from '@taiga-ui/core'
import {
  TuiStepperModule,
  TuiInputModule,
  TuiFieldErrorModule,
  TuiToggleModule,
  TuiSelectModule,
  TuiInputDateTimeModule,
  TuiIslandModule,
} from '@taiga-ui/kit'
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus'

const taigaModules = [
  TuiExpandModule,
  TuiStepperModule,
  TuiInputModule,
  TuiFieldErrorModule,
  TuiToggleModule,
  TuiTooltipModule,
  TuiSelectModule,
  TuiDataListModule,
  TuiGroupModule,
  TuiNotificationModule,
  TuiErrorModule,
  TuiInputDateTimeModule,
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
