import { AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms'
import { Observable, of } from 'rxjs'
import { debounceTime, catchError, map } from 'rxjs/operators'
import { TaigaUtils } from 'src/app/core/taiga-utils'
import { CreateReservationService } from '../create-reservation.service'

export const timeAvailabilityValidator = (createReservationService: CreateReservationService): AsyncValidatorFn => {
  return (group: FormGroup): Observable<ValidationErrors> => {
    const { locations, time } = group.value

    const startTime = TaigaUtils.convertDateTimeToNativeDate(time.startTime)
    const endTime = TaigaUtils.convertDateTimeToNativeDate(time.endTime)

    return createReservationService.isTimeAvailable({ startTime, endTime, locations }).pipe(
      debounceTime(500),
      catchError(() => of(false)),
      map(isTimeAvailable => (isTimeAvailable ? null : { timeNotAvailable: 'Time is not available!' })),
    )
  }
}
