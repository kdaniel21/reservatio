import { Injectable } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { Observable } from 'rxjs'
import { mapTo } from 'rxjs/operators'
import { ChangePasswordUsingTokenGQL } from 'src/app/core/graphql/generated'
import { Loader } from 'src/app/core/loader/loader'
import { handleRetry } from 'src/app/core/retry-error-handler/handle-retry'
import { RetryErrorHandler } from 'src/app/core/retry-error-handler/retry-error-handler'
import { RetryableService } from 'src/app/core/retry-error-handler/retryable.service'

@Injectable({ providedIn: 'root' })
export class ChangePasswordService implements RetryableService {
  readonly loader = new Loader()
  readonly retryHandler = new RetryErrorHandler()

  constructor(
    private readonly changePasswordUsingTokenGQL: ChangePasswordUsingTokenGQL,
    private readonly transloco: TranslocoService,
  ) {}

  changePasswordUsingToken(token: string, password: string, passwordConfirm: string): Observable<void> {
    return this.changePasswordUsingTokenGQL
      .mutate({ token, password, passwordConfirm })
      .pipe(mapTo(void 0), handleRetry(this, this.transloco.translate('auth.change_password_fail')))
  }
}
