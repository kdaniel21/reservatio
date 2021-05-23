import { NgModule } from '@angular/core'
import { TuiElasticStickyModule, TuiSidebarModule } from '@taiga-ui/addon-mobile'
import { TuiActiveZoneModule } from '@taiga-ui/cdk'
import { TuiButtonModule, TuiRootModule } from '@taiga-ui/core'
import { TuiActionModule, TuiAvatarModule } from '@taiga-ui/kit'

const taigaModules = [
  TuiRootModule,
  TuiElasticStickyModule,
  TuiButtonModule,
  TuiActiveZoneModule,
  TuiSidebarModule,
  TuiActionModule,
  TuiAvatarModule,
]

@NgModule({
  imports: taigaModules,
  exports: taigaModules,
})
export class LayoutTaigaModule {}
