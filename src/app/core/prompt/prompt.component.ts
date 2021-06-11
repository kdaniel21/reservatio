import { Component, ChangeDetectionStrategy, Inject } from '@angular/core'
import { TuiDialog } from '@taiga-ui/cdk'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { PromptOptions } from './prompt.service'

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptComponent {
  constructor(@Inject(POLYMORPHEUS_CONTEXT) readonly context: TuiDialog<PromptOptions, boolean>) {}

  onClick(response: boolean) {
    this.context.completeWith(response)
  }
}
