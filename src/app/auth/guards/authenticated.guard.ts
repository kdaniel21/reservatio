import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { AuthStateService } from '../auth-state.service'

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly authStateService: AuthStateService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authStateService.isAuthenticated$.pipe(
      first(),
      map(isAuthenticated => {
        if (isAuthenticated) return true

        return this.router.createUrlTree(['/', 'auth', 'login'], { queryParams: { returnUrl: route.url } })
      }),
    )
  }
}
