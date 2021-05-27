import { NgModule } from '@angular/core'
import { TuiOverscrollModule } from '@taiga-ui/cdk'
import { TuiButtonModule } from '@taiga-ui/core'
import { TuiIslandModule } from '@taiga-ui/kit'

const taigaModules = [TuiOverscrollModule, TuiIslandModule, TuiButtonModule]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class CalendarTaigaModule {}
