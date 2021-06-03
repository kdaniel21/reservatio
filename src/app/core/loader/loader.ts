import { BehaviorSubject } from 'rxjs'

export class Loader {
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false)
  readonly isLoading$ = this.isLoadingSubject.asObservable()

  startLoading() {
    this.isLoadingSubject.next(true)
  }

  stopLoading() {
    this.isLoadingSubject.next(false)
  }
}
