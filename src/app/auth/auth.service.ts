import { Injectable } from '@angular/core'
import { TuiNotification } from '@taiga-ui/core'
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
    private readonly notificationsService: NotificationsService
  ) {}

  login(email: string, password: string): Observable<void> {
    return this.loginGQL.mutate({ email, password }).pipe(
      map(res => res.data.login),
      tap(loginData => this.authStateService.setAccessToken(loginData?.accessToken)),
      map(loginData => loginData?.user),
      tap(user => this.authStateService.setUser(user)),
      tap(() =>
        this.notificationsService.show('You have successfully logged in!', { status: TuiNotification.Success })
      ),
      mapTo(void 0)
    )
  }

  logout(): Observable<void> {
    return this.logoutGQL.mutate().pipe(
      tap(() => {
        this.notificationsService.show('You have been successfully logged out!', { status: TuiNotification.Success })

        this.authStateService.resetAccessToken()
        this.authStateService.resetUser()
      }),
      mapTo(void 0)
    )
  }
}
