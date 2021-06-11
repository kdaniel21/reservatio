import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { map, throttleTime } from 'rxjs/operators'

export class RetryErrorHandler {
  private readonly messageSubject = new BehaviorSubject<PolymorpheusContent | null>(null)
  readonly message$ = this.messageSubject.asObservable()

  private readonly retryAfterErrorSubject = new Subject<void>()
  readonly throttledRetryAfterError$ = this.retryAfterErrorSubject.pipe(throttleTime(1000))

  readonly hasError$: Observable<boolean> = this.message$.pipe(map(message => !!message))

  retryAfterError(): void {
    this.retryAfterErrorSubject.next()
  }

  setErrorMessage(content: PolymorpheusContent): void {
    this.messageSubject.next(content)
  }

  resetErrorMessage(): void {
    this.messageSubject.next(null)
  }
}
