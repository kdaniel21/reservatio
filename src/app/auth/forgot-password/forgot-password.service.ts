import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { mapTo } from 'rxjs/operators'
import { ResetPasswordGQL } from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  constructor(private readonly resetPasswordGQL: ResetPasswordGQL) {}

  resetPassword(email: string): Observable<void> {
    return this.resetPasswordGQL
      .mutate({ email })
      .pipe(mapTo(void 0), handleRetry(this, 'Could not sent password reset email!'))
  }
}
