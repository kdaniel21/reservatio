import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { AuthStateService } from '../auth-state.service'

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedOnlyGuard implements CanActivate {
  constructor(private authStateService: AuthStateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authStateService.isAuthenticated$.pipe(
      first(),
      map(isAuthenticated => (isAuthenticated ? true : this.router.createUrlTree(['/', 'auth', 'login'])))
    )
  }
}
