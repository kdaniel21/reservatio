import { NgModule } from '@angular/core'
import { TuiButtonModule, TuiNotificationModule } from '@taiga-ui/core'
import {
  TuiIslandModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiToggleModule,
  TuiMarkerIconModule,
} from '@taiga-ui/kit'

const taigaModules = [
  TuiIslandModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiButtonModule,
  TuiToggleModule,
  TuiMarkerIconModule,
  TuiNotificationModule,
]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class AuthTaigaModule {}
