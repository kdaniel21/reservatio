import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, EMPTY, asapScheduler, concat } from 'rxjs'
import { distinctUntilChanged, map, tap, catchError } from 'rxjs/operators'
import { GraphqlContext } from '../core/graphql/error-handler'
import { GetCurrentUserGQL, GetCurrentUserQuery, RefreshAccessTokenGQL } from '../core/graphql/generated'

export type RedactedUser = GetCurrentUserQuery['currentUser']

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly userSubject = new BehaviorSubject<RedactedUser | undefined>(undefined)
  readonly user$: Observable<RedactedUser | undefined> = this.userSubject.pipe(distinctUntilChanged())
  get user(): RedactedUser | undefined {
    return this.userSubject.getValue()
  }

  readonly isAuthenticated$: Observable<boolean> = this.user$.pipe(
    map(user => !!user),
    distinctUntilChanged()
  )
  get isAuthenticated(): boolean {
    return !!this.user
  }

  private readonly accessTokenSubject = new BehaviorSubject<string | undefined>(undefined)
  accessToken$: Observable<string | undefined> = this.accessTokenSubject.asObservable()
  get accessToken(): string | undefined {
    return this.accessTokenSubject.getValue()
  }

  constructor(
    private readonly refreshAccessTokenGQL: RefreshAccessTokenGQL,
    private readonly getCurrentUserGQL: GetCurrentUserGQL
  ) {
    asapScheduler.schedule(() => this.initAuthState())
  }

  initAuthState() {
    concat(this.refreshAccessToken(), this.fetchCurrentUser())
      .pipe(catchError(() => EMPTY))
      .subscribe()
  }

  refreshAccessToken(): Observable<string> {
    return this.refreshAccessTokenGQL
      .fetch(undefined, { context: { avoidErrorNotification: true } as GraphqlContext })
      .pipe(
        map(res => res.data.refreshAccessToken.accessToken),
        tap(newAccessToken => this.accessTokenSubject.next(newAccessToken))
      )
  }

  fetchCurrentUser(): Observable<RedactedUser> {
    return this.getCurrentUserGQL.fetch().pipe(
      map(res => res.data.currentUser),
      tap(currentUser => this.userSubject.next(currentUser))
    )
  }

  setUser(newUser: RedactedUser) {
    this.userSubject.next(newUser)
  }

  resetUser() {
    this.userSubject.next(undefined)
  }

  setAccessToken(newAccessToken: string) {
    this.accessTokenSubject.next(newAccessToken)
  }

  resetAccessToken() {
    this.accessTokenSubject.next(undefined)
  }
}
