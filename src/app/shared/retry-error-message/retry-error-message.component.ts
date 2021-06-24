import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, TemplateRef } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'

@Component({
  selector: 'app-retry-error-message',
  templateUrl: './retry-error-message.component.html',
  styleUrls: ['./retry-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetryErrorMessageComponent {
  @Input() service: RetryableService
  @Input() message = this.transloco.translate('shared.retry_error.default_message')
  // TODO: Refactor to use PolymorpheusContent
  @Input() content: TemplateRef<any>

  @Output() retry = new EventEmitter<void>()

  constructor(private readonly transloco: TranslocoService) {}

  onRetry() {
    if (this.service) this.service.retryHandler.retryAfterError()

    this.retry.next()
  }
}
