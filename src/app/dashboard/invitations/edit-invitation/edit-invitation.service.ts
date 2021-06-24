import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, mapTo, tap } from 'rxjs/operators'
import {
  GetInvitationGQL,
  GetInvitationQuery,
  UpdateInvitationGQL,
  UpdateInvitationMutationVariables,
} from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'
import { NotificationsService } from 'src/app/core/services/notifications.service'

export type Invitation = GetInvitationQuery['invitation']

@Injectable({ providedIn: 'root' })
export class EditInvitationService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  constructor(
    private readonly getInvitationGQL: GetInvitationGQL,
    private readonly updateInvitationGQL: UpdateInvitationGQL,
    private readonly notificationsService: NotificationsService,
  ) {}

  updateInvitation(updatedInvitation: UpdateInvitationMutationVariables): Observable<void> {
    return this.updateInvitationGQL.mutate(updatedInvitation).pipe(
      tap(() => this.notificationsService.showSuccess('Invitation has been updated successfully!')),
      mapTo(void 0),
      handleRetry(this, 'Could not update reservation!'),
    )
  }

  getInvitation(id: string): Observable<Invitation> {
    // TODO: Better caching
    return this.getInvitationGQL.fetch({ id }, { fetchPolicy: 'network-only' }).pipe(
      map(res => res.data.invitation),
      map(invitation => ({ ...invitation, expiresAt: new Date(invitation.expiresAt) })),
      handleRetry(this, 'Could not load invitation!'),
    )
  }
}
