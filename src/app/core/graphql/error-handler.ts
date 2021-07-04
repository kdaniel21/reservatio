import { Injector } from '@angular/core'
import { onError } from '@apollo/client/link/error'
import { TranslocoService } from '@ngneat/transloco'
import { NotificationsService } from '../services/notifications.service'

export interface GraphqlContext extends Record<string, any> {
  avoidErrorNotification?: boolean
}

export const errorHandler = (injector: Injector) =>
  onError(({ graphQLErrors, networkError, operation }) => {
    const context: GraphqlContext = operation.getContext()
    if (context.avoidErrorNotification) return

    const notificationsService = injector.get(NotificationsService)

    let errorCode: string

    if (graphQLErrors) errorCode = graphQLErrors[0].extensions?.code
    else if (networkError) errorCode = 'network_error'

    const transloco = injector.get(TranslocoService)
    const errorMessage =
      transloco.translate(`errors.${errorCode.toLowerCase()}`) || transloco.translate('errors.default')
    notificationsService.showError(errorMessage)
  })
