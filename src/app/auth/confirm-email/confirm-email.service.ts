import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { mapTo, tap } from 'rxjs/operators'
import { ConfirmEmailAddressGQL } from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { NotificationsService } from 'src/app/core/services/notifications.service'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'
import { TranslocoService } from '@ngneat/transloco'

@Injectable({ providedIn: 'root' })
export class ConfirmEmailService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  constructor(
    private readonly confirmEmailGQL: ConfirmEmailAddressGQL,
    private readonly notificationsService: NotificationsService,
    private readonly transloco: TranslocoService,
  ) {}

  confirmEmail(confirmationToken: string): Observable<void> {
    return this.confirmEmailGQL.mutate({ token: confirmationToken }).pipe(
      tap(() => {
        const notificationText = this.transloco.translate('auth.confirm_email_success')
        this.notificationsService.showSuccess(notificationText)
      }),
      mapTo(void 0),
      handleRetry(this, this.transloco.translate('auth.confirm_email_fail')),
    )
  }
}
