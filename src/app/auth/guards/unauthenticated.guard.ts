import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthStateService } from '../auth-state.service'

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private readonly authStateService: AuthStateService, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authStateService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) return true

        return this.router.createUrlTree(['/'])
      })
    )
  }
}
