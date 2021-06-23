import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { mapTo, tap } from 'rxjs/operators'
import { ConfirmEmailAddressGQL } from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { NotificationsService } from 'src/app/core/services/notifications.service'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'

@Injectable({ providedIn: 'root' })
export class ConfirmEmailService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  constructor(
    private readonly confirmEmailGQL: ConfirmEmailAddressGQL,
    private readonly notificationsService: NotificationsService,
  ) {}

  confirmEmail(confirmationToken: string): Observable<void> {
    return this.confirmEmailGQL.mutate({ token: confirmationToken }).pipe(
      tap(() => {
        const notificationText = 'Your email address has been successfully confirmed. Now you can log in!'
        this.notificationsService.showSuccess(notificationText)
      }),
      mapTo(void 0),
      handleRetry(this, 'Could not confirm email address. Please try again!'),
    )
  }
}
