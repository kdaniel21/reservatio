import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, EMPTY, asapScheduler, asyncScheduler, queueScheduler, concat, defer } from 'rxjs'
import { distinctUntilChanged, map, tap, catchError, switchMapTo, finalize } from 'rxjs/operators'
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
    concat(this.refreshAccessToken(), this.fetchCurrentUser()).subscribe()
  }

  refreshAccessToken(): Observable<string> {
    return this.refreshAccessTokenGQL.fetch().pipe(
      map(res => res.data.refreshAccessToken.accessToken),
      tap(newAccessToken => this.accessTokenSubject.next(newAccessToken)),
      catchError(() => EMPTY)
    )
  }

  fetchCurrentUser(): Observable<RedactedUser> {
    return this.getCurrentUserGQL.fetch(undefined).pipe(
      map(res => res.data.currentUser),
      tap(currentUser => this.userSubject.next(currentUser)),
      catchError(() => EMPTY)
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
