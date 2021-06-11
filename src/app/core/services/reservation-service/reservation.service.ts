import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Reservation } from 'src/app/calendar/calendar/calendar-reservation-details/reservation-details.service'
import { AreTimesAvailableGQL, GetReservationGQL, TimeAvailableInputDto } from '../../graphql/generated'

// TODO: Implement better caching

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(
    private readonly getReservationGQL: GetReservationGQL,
    private readonly areTimesAvailableGQL: AreTimesAvailableGQL,
  ) {}

  getReservation(id: string): Observable<Reservation> {
    return this.getReservationGQL.fetch({ id }, { fetchPolicy: 'network-only' }).pipe(
      map(res => res.data.reservation),
      map(reservation => ({
        ...reservation,
        startTime: new Date(reservation.startTime),
        endTime: new Date(reservation.endTime),
      })),
    )
  }

  isTimeAvailable(timeProposal: TimeAvailableInputDto): Observable<boolean> {
    return this.areTimesAvailableGQL
      .fetch({ timeProposals: [timeProposal] }, { fetchPolicy: 'network-only' })
      .pipe(map(res => res.data.areTimesAvailable[0].isTimeAvailable))
  }
}
