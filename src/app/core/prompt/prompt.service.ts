import { Injectable, Provider } from '@angular/core'
import { AbstractTuiDialogService, TUI_DIALOGS } from '@taiga-ui/cdk'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { PromptComponent } from './prompt.component'

export interface PromptButton {
  readonly text: string
  readonly value: any
}

export interface PromptOptions {
  readonly heading: string
  readonly buttons: [PromptButton, PromptButton]
}

@Injectable({ providedIn: 'root' })
export class PromptService extends AbstractTuiDialogService<PromptOptions> {
  readonly defaultOptions: PromptOptions = {
    heading: 'Are you sure?',
    buttons: [
      { text: 'No', value: false },
      { text: 'Yes', value: true },
    ],
  }

  readonly component = new PolymorpheusComponent(PromptComponent)
}

export const PROMPT_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: PromptService,
  multi: true,
}
