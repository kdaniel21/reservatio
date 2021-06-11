import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PromptComponent } from './prompt.component'
import { TuiButtonModule, TuiDialogModule } from '@taiga-ui/core'
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus'

@NgModule({
  declarations: [PromptComponent],
  imports: [CommonModule, TuiButtonModule, PolymorpheusModule, TuiDialogModule],
})
export class PromptModule {}
