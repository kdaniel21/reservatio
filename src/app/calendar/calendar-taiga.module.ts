import { NgModule } from '@angular/core'
import { TuiOverscrollModule } from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiCalendarModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiExpandModule,
  TuiGroupModule,
  TuiHostedDropdownModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTooltipModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputDateTimeModule,
  TuiInputModule,
  TuiInputTimeModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiStepperModule,
  TuiToggleModule,
} from '@taiga-ui/kit'
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus'

const taigaModules = [
  TuiOverscrollModule,
  TuiIslandModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiHostedDropdownModule,
  TuiCalendarModule,
  TuiCheckboxLabeledModule,
  TuiExpandModule,
  TuiStepperModule,
  TuiInputModule,
  TuiFieldErrorModule,
  TuiToggleModule,
  TuiTooltipModule,
  TuiSelectModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiMarkerIconModule,
  TuiGroupModule,
  TuiInputTimeModule,
  TuiNotificationModule,
  TuiErrorModule,
  TuiInputDateTimeModule,
  PolymorpheusModule,
]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class CalendarTaigaModule {}
