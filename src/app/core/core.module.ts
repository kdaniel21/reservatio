import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GraphqlModule } from './graphql/graphql.module'
import { PROMPT_PROVIDER } from './prompt/prompt.service'
import { TuiDialogModule } from '@taiga-ui/core'
import { CUSTOM_TUI_ICONS_PROVIDER } from './taiga-utils/icons'
import { TranslocoRootModule } from '../transloco/transloco-root.module'

@NgModule({
  imports: [CommonModule, GraphqlModule, TuiDialogModule],
  exports: [GraphqlModule, TranslocoRootModule, CommonModule],
  providers: [PROMPT_PROVIDER, CUSTOM_TUI_ICONS_PROVIDER],
})
export class CoreModule {}
