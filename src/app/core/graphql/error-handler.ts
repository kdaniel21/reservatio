import { Injector } from '@angular/core'
import { onError } from '@apollo/client/link/error'
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core'
import { errorMap } from './error-map'

export interface GraphqlContext extends Record<string, any> {
  avoidErrorNotification?: boolean
}

export const errorHandler = (injector: Injector) =>
  onError(({ graphQLErrors, networkError, operation }) => {
    const context: GraphqlContext = operation.getContext()
    if (context.avoidErrorNotification) return

    const notificationsService = injector.get(TuiNotificationsService)

    let errorCode: string

    if (graphQLErrors) errorCode = graphQLErrors[0].extensions?.code
    else if (networkError) errorCode = 'NETWORK_ERROR'

    const errorMessage = errorMap.get(errorCode) || errorMap.get('DEFAULT')
    notificationsService.show(errorMessage, { status: TuiNotification.Error }).subscribe()
  })
