import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, EMPTY, asapScheduler, concat } from 'rxjs'
import { distinctUntilChanged, map, tap, catchError, finalize, switchMapTo, skipWhile, filter } from 'rxjs/operators'
import { GraphqlContext } from '../core/graphql/error-handler'
import { GetCurrentUserGQL, GetCurrentUserQuery, RefreshAccessTokenGQL, Role } from '../core/graphql/generated'

export type RedactedUser = GetCurrentUserQuery['currentUser']

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private hasAttemptedAuthenticationSubject = new BehaviorSubject<boolean>(undefined)
  private hasAttemptedAuthentication$ = this.hasAttemptedAuthenticationSubject.pipe(
    filter(val => typeof val === 'boolean')
  )

  private readonly userSubject = new BehaviorSubject<RedactedUser>(undefined)
  readonly user$: Observable<RedactedUser> = this.hasAttemptedAuthentication$.pipe(switchMapTo(this.userSubject))
  get user(): RedactedUser {
    return this.userSubject.getValue()
  }

  readonly isAuthenticated$: Observable<boolean> = this.user$.pipe(
    map(user => !!user),
    distinctUntilChanged()
  )
  get isAuthenticated(): boolean {
    return !!this.user
  }

  readonly isAdmin$: Observable<boolean> = this.user$.pipe(map(user => user.customer.role === Role.Admin))
  get isAdmin(): boolean {
    return this.user.customer.role === Role.Admin
  }

  private readonly accessTokenSubject = new BehaviorSubject<string>(undefined)
  accessToken$: Observable<string> = this.accessTokenSubject.asObservable()
  get accessToken(): string {
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
      .pipe(
        finalize(() => this.hasAttemptedAuthenticationSubject.next(true)),
        catchError(() => EMPTY)
      )
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
