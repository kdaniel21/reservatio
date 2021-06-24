import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { AuthStateService } from '../auth-state.service'

@Injectable({ providedIn: 'root' })
export class AdminOnlyGuard implements CanActivate {
  constructor(private readonly authStateService: AuthStateService, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authStateService.isAdmin$.pipe(
      first(),
      map(isAdmin => {
        if (isAdmin) return true

        return this.router.createUrlTree(['/', 'calendar'])
      }),
    )
  }
}
