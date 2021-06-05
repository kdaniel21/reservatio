import { Injectable } from '@angular/core'
import { TuiNotification } from '@taiga-ui/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import {
  AreTimesAvailableGQL,
  CreateRecurringReservationGQL,
  CreateRecurringReservationMutationVariables,
  CreateReservationGQL,
  CreateReservationMutation,
  CreateReservationMutationVariables,
  IsRecurringTimeAvailableGQL,
  IsRecurringTimeAvailableQueryVariables,
  IsRecurringTimeAvailableResponseDto,
  TimeAvailableInputDto,
} from 'src/app/core/graphql/generated'
import { NotificationsService } from 'src/app/core/services/notifications.service'

export type RedactedReservation = CreateReservationMutation['createReservation']

export type IsRecurringTimeAvailableResponse = Omit<IsRecurringTimeAvailableResponseDto, '__typename'>

@Injectable({ providedIn: 'root' })
export class CreateReservationService {
  constructor(
    private readonly areTimesAvailableGQL: AreTimesAvailableGQL,
    private readonly createReservationGQL: CreateReservationGQL,
    private readonly notificationsService: NotificationsService,
    private readonly isRecurringTimeAvailableGQL: IsRecurringTimeAvailableGQL,
    private readonly createRecurringReservationGQL: CreateRecurringReservationGQL,
  ) {}

  isTimeAvailable(params: TimeAvailableInputDto): Observable<boolean> {
    return this.areTimesAvailableGQL
      .fetch({ timeProposals: [params] }, { fetchPolicy: 'network-only' })
      .pipe(map(res => res.data.areTimesAvailable[0].isTimeAvailable))
  }

  isRecurringTimeAvailable(
    params: IsRecurringTimeAvailableQueryVariables,
  ): Observable<IsRecurringTimeAvailableResponse> {
    return this.isRecurringTimeAvailableGQL.fetch(params, { fetchPolicy: 'network-only' }).pipe(
      map(res => res.data.isRecurringTimeAvailable),
      map(availability => ({
        availableTimes: availability.availableTimes.map(time => new Date(time)),
        unavailableTimes: availability.unavailableTimes.map(time => new Date(time)),
      })),
    )
  }

  createReservation(params: CreateReservationMutationVariables): Observable<RedactedReservation> {
    return this.createReservationGQL.mutate(params).pipe(
      map(res => res.data.createReservation),
      tap(createdReservation => {
        const notificationText = `Reservation ${createdReservation.name} has been successfully created!`
        this.notificationsService.show(notificationText, { status: TuiNotification.Success, hasIcon: true })
      }),
    )
  }

  createRecurringReservation(params: CreateRecurringReservationMutationVariables): Observable<{ count: number }> {
    return this.createRecurringReservationGQL.mutate(params).pipe(
      map(res => ({ count: res.data.createRecurringReservation.count })),
      tap(count => {
        const notificationText = `${count} reservations have been successfully created!`
        this.notificationsService.show(notificationText, { status: TuiNotification.Success, hasIcon: true })
      }),
    )
  }
}
