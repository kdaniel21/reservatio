import { Injectable } from '@angular/core'
import { EMPTY, Observable, of } from 'rxjs'
import { map, mapTo, switchMap, tap } from 'rxjs/operators'
import { LoginGQL, LogoutGQL } from '../core/graphql/generated'
import { AuthStateService } from './auth-state.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly authStateService: AuthStateService,
    private readonly loginGQL: LoginGQL,
    private readonly logoutGQL: LogoutGQL
  ) {}

  login(email: string, password: string): Observable<void> {
    return this.loginGQL.mutate({ email, password }).pipe(
      switchMap(res => (res.data ? of(res.data.login) : EMPTY)),
      tap(loginData => this.authStateService.setAccessToken(loginData?.accessToken)),
      map(loginData => loginData?.user),
      tap(user => this.authStateService.setUser(user)),
      mapTo(void 0)
    )
  }

  logout(): Observable<void> {
    return this.logoutGQL.mutate().pipe(
      tap(() => {
        this.authStateService.resetAccessToken()
        this.authStateService.resetUser()
      }),
      mapTo(void 0)
    )
  }
}
