import { AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms'
import { Observable, of } from 'rxjs'
import { debounceTime, catchError, map, finalize } from 'rxjs/operators'
import { TaigaUtils } from 'src/app/core/taiga-utils'
import { CreateReservationService } from '../create-reservation.service'

export const timeAvailabilityValidator = (createReservationService: CreateReservationService): AsyncValidatorFn => {
  return (group: FormGroup): Observable<ValidationErrors> => {
    const { locations, startTime: tuiStartTime, endTime: tuiEndTime } = group.value

    const startTime = TaigaUtils.convertDateTimeToNativeDate(tuiStartTime)
    const endTime = TaigaUtils.convertDateTimeToNativeDate(tuiEndTime)

    return createReservationService.isTimeAvailable({ startTime, endTime, locations }).pipe(
      debounceTime(500),
      catchError(() => of(false)),
      map(isTimeAvailable => (isTimeAvailable ? null : { timeNotAvailable: 'Time is not available!' })),
    )
  }
}
