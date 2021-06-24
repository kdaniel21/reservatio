import { Injectable } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, scan, shareReplay, switchMap, tap } from 'rxjs/operators'
import { GetInvitationsGQL, GetInvitationsQuery } from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'

export type InvitationListItem = GetInvitationsQuery['invitations']['edges'][number]['node']

@Injectable({ providedIn: 'root' })
export class InvitationsService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  private fetchMoreInvitationsSubject = new BehaviorSubject<void>(undefined)
  private lastCursor: string
  private hasReachedEnd = false

  readonly invitations$: Observable<InvitationListItem[]> = this.fetchMoreInvitationsSubject.pipe(
    switchMap(() => this.getInvitations()),
    scan((loadedInvitations, newInvitations) => [...loadedInvitations, ...newInvitations], []),
    shareReplay(1),
  )

  constructor(private readonly getInvitationsGQL: GetInvitationsGQL, private readonly transloco: TranslocoService) {}

  fetchMoreInvitations(): void {
    if (!this.hasReachedEnd) this.fetchMoreInvitationsSubject.next()
  }

  reloadInvitations(): void {
    this.lastCursor = undefined
    this.hasReachedEnd = false
    this.fetchMoreInvitations()
  }

  private getInvitations(): Observable<InvitationListItem[]> {
    const { lastCursor } = this

    // TODO: Better caching
    return this.getInvitationsGQL.fetch({ first: 25, after: lastCursor }, { fetchPolicy: 'network-only' }).pipe(
      tap(res => {
        const { endCursor } = res.data.invitations.pageInfo
        if (!endCursor) {
          this.hasReachedEnd = true
          return
        }

        this.lastCursor = endCursor
      }),
      map(res => res.data.invitations.edges.map(edge => edge.node)),
      handleRetry(this, this.transloco.translate('dashboard.invitation.loading_error')),
    )
  }
}
