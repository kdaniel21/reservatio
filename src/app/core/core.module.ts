import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GraphqlModule } from './graphql/graphql.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PROMPT_PROVIDER } from './prompt/prompt.service'
import { TuiDialogModule } from '@taiga-ui/core'

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, GraphqlModule, TuiDialogModule],
  exports: [GraphqlModule],
  providers: [PROMPT_PROVIDER],
})
export class CoreModule {}
