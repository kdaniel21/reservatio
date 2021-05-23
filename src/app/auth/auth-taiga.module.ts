import { NgModule } from '@angular/core'
import { TuiButtonModule } from '@taiga-ui/core'
import { TuiIslandModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit'

const taigaModules = [TuiIslandModule, TuiInputModule, TuiInputPasswordModule, TuiButtonModule]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class AuthTaigaModule {}
