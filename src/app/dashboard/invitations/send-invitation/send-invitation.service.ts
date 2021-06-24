import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { mapTo, tap } from 'rxjs/operators'
import { SendInvitationGQL } from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'
import { NotificationsService } from 'src/app/core/services/notifications.service'

@Injectable({ providedIn: 'root' })
export class SendInvitationService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  constructor(
    private readonly sendInvitationGQL: SendInvitationGQL,
    private readonly notificationsService: NotificationsService,
  ) {}

  sendInvitation(emailAddress: string): Observable<void> {
    return this.sendInvitationGQL.mutate({ emailAddress }).pipe(
      tap(() => this.notificationsService.showSuccess(`Invitation has been successfully sent to ${emailAddress}!`)),
      mapTo(void 0),
      handleRetry(this, 'Could not send invitation!'),
    )
  }
}
