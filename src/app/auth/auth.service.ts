import { Injectable } from '@angular/core'
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs'
import { catchError, distinctUntilChanged, map, mapTo, switchMapTo, tap } from 'rxjs/operators'
import { GetCurrentUserGQL, GetCurrentUserQuery, LoginGQL, RefreshAccessTokenGQL } from '../core/graphql/generated'

export type RedactedUser = GetCurrentUserQuery['currentUser']

@Injectable({ providedIn: 'root' })
export class AuthService {
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

  private getCurrentUserSubject = new Subject<void>()
  private getCurrentUserAction$: Observable<void> = this.getCurrentUserSubject.pipe(
    switchMapTo(this.getCurrentUserGQL.fetch(undefined)),
    map(res => res.data.currentUser),
    tap(currentUser => this.userSubject.next(currentUser)),
    catchError(() => of(void 0)),
    mapTo(void 0)
  )

  constructor(
    private readonly loginGQL: LoginGQL,
    private readonly refreshAccessTokenGQL: RefreshAccessTokenGQL,
    private getCurrentUserGQL: GetCurrentUserGQL
  ) {
    this.getCurrentUserAction$.subscribe()

    this.refreshAccessToken()
      .pipe(tap(() => this.getCurrentUser()))
      .subscribe()
  }

  login(email: string, password: string): Observable<void> {
    return this.loginGQL.mutate({ email, password }).pipe(
      map(res => res.data?.login),
      tap(loginData => this.accessTokenSubject.next(loginData?.accessToken)),
      map(loginData => loginData?.user),
      tap(user => this.userSubject.next(user)),
      mapTo(void 0)
    )
  }

  refreshAccessToken(): Observable<string> {
    return this.refreshAccessTokenGQL.fetch().pipe(
      map(res => res.data.refreshAccessToken.accessToken),
      tap(newAccessToken => this.accessTokenSubject.next(newAccessToken)),
      catchError(() => EMPTY)
    )
  }

  getCurrentUser() {
    this.getCurrentUserSubject.next()
  }
}
