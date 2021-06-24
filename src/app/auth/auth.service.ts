import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { TranslocoService } from '@ngneat/transloco'
import { Observable } from 'rxjs'
import { map, mapTo, tap } from 'rxjs/operators'
import { LoginGQL, LogoutGQL } from '../core/graphql/generated'
import { NotificationsService } from '../core/services/notifications.service'
import { AuthStateService } from './auth-state.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly authStateService: AuthStateService,
    private readonly loginGQL: LoginGQL,
    private readonly logoutGQL: LogoutGQL,
    private readonly notificationsService: NotificationsService,
    private readonly router: Router,
    private readonly transloco: TranslocoService,
  ) {}

  login(email: string, password: string): Observable<void> {
    return this.loginGQL.mutate({ email, password }).pipe(
      map(res => res.data.login),
      tap(loginData => this.authStateService.setAccessToken(loginData?.accessToken)),
      map(loginData => loginData?.user),
      tap(user => this.authStateService.setUser(user)),
      tap(() => this.notificationsService.showSuccess(this.transloco.translate('auth.login_success'))),
      mapTo(void 0),
    )
  }

  logout(): Observable<void> {
    return this.logoutGQL.mutate().pipe(
      tap(() => {
        this.authStateService.resetAccessToken()
        this.authStateService.resetUser()

        this.notificationsService.showSuccess(this.transloco.translate('auth.logout_success'))
        this.router.navigate(['/', 'auth', 'login'])
      }),
      mapTo(void 0),
    )
  }
}
