import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-retry-error-message',
  templateUrl: './retry-error-message.component.html',
  styleUrls: ['./retry-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetryErrorMessageComponent {
  @Input() message = 'Something went wrong. Please try again!'
  // TODO: Refactor to use PolymorpheusContent
  @Input() content: TemplateRef<any>

  @Output() retry = new EventEmitter<void>()

  onRetry() {
    this.retry.next()
  }
}
