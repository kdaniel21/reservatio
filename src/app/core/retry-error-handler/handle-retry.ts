import { Observable } from 'rxjs'
import { finalize, retryWhen, tap } from 'rxjs/operators'
import { doOnSubscribe } from 'src/app/core/rxjs-operators/do-on-subscribe'
import { RetryableService } from './retryable.service'

export const handleRetry = <T>(service: RetryableService, message?: string) => {
  return (source: Observable<T>) => {
    return source.pipe(
      doOnSubscribe(() => {
        service.loader.startLoading()
        service.retryHandler.resetErrorMessage()
      }),
      tap({ error: () => service.retryHandler.setErrorMessage(message) }),
      finalize(() => service.loader.stopLoading()),
      retryWhen(() => service.retryHandler.throttledRetryAfterError$),
    )
  }
}
