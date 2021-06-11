import { Injector } from '@angular/core'
import { AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms'
import { Observable, of, timer } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { ReservationService } from 'src/app/core/services/reservation-service/reservation.service'
import { TaigaUtils } from 'src/app/core/taiga-utils'

export const timeAvailabilityValidator = (injector: Injector, excludedReservation?: string): AsyncValidatorFn => {
  const reservationService = injector.get(ReservationService)

  return (group: FormGroup): Observable<ValidationErrors> => {
    const { locations, time } = group.value

    const startTime = TaigaUtils.convertDateTimeToNativeDate(time.startTime)
    const endTime = TaigaUtils.convertDateTimeToNativeDate(time.endTime)

    return timer(500).pipe(
      switchMap(() => reservationService.isTimeAvailable({ startTime, endTime, locations, excludedReservation })),
      catchError(() => of(false)),
      map(isTimeAvailable => (isTimeAvailable ? null : { timeNotAvailable: 'Time is not available!' })),
    )
  }
}
