import { Loader } from 'src/app/core/loader/loader'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'

export interface RetryableService {
  readonly loader: Loader
  readonly retryHandler: RetryErrorHandler
}
