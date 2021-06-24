import { NgModule } from '@angular/core'
import { TuiTableModule } from '@taiga-ui/addon-table'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiGroupModule,
  TuiLoaderModule,
  TuiNotificationModule,
  TuiSvgModule,
} from '@taiga-ui/core'
import { TuiInputDateTimeModule, TuiInputModule } from '@taiga-ui/kit'

const taigaModules = [
  TuiButtonModule,
  TuiGroupModule,
  TuiTableModule,
  TuiSvgModule,
  TuiDialogModule,
  TuiInputModule,
  TuiInputDateTimeModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiNotificationModule,
]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class DashboardTaigaModule {}
