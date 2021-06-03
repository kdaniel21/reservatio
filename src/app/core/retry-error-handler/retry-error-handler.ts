import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus'
import { BehaviorSubject, Subject } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

export class RetryErrorHandler {
  private readonly messageSubject = new BehaviorSubject<PolymorpheusContent | null>(null)
  readonly message$ = this.messageSubject.asObservable()

  private readonly retryAfterErrorSubject = new Subject<void>()
  readonly throttledRetryAfterError$ = this.retryAfterErrorSubject.pipe(throttleTime(1000))

  retryAfterError() {
    this.retryAfterErrorSubject.next()
  }

  setErrorMessage(content: PolymorpheusContent) {
    this.messageSubject.next(content)
  }

  resetErrorMessage() {
    this.messageSubject.next(null)
  }
}
