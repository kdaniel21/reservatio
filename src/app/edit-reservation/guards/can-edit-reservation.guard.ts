import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'
import { AuthStateService } from 'src/app/auth/auth-state.service'
import { ReservationService } from 'src/app/core/services/reservation-service/reservation.service'

@Injectable({ providedIn: 'root' })
export class CanEditReservationGuard implements CanActivate {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly authStateService: AuthStateService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const reservationId = route.paramMap.get('id')

    return this.reservationService.getReservation(reservationId).pipe(
      withLatestFrom(this.authStateService.user$, this.authStateService.isAdmin$),
      map(([reservation, user, isAdmin]) => {
        if (isAdmin) return true

        const isReservationActive = reservation.isActive
        const isReservationFuture = reservation.startTime.getTime() > Date.now()
        const doesReservationBelongToUser = reservation.customer.id === user.customer.id
        return doesReservationBelongToUser && isReservationActive && isReservationFuture
      }),
    )
  }
}
