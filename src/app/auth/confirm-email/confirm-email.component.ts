import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { ConfirmEmailGQL } from 'src/app/core/graphql/generated'

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent {
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false)
  readonly isLoading$ = this.isLoadingSubject.asObservable()

  readonly tosForm = this.formBuilder.group({
    isAccepted: [false, Validators.requiredTrue],
  })

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly confirmEmailGQL: ConfirmEmailGQL,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  onConfirmEmail() {
    this.isLoadingSubject.next(true)

    const confirmationToken = this.route.snapshot.paramMap.get('token')

    this.confirmEmailGQL
      .mutate({ token: confirmationToken })
      .pipe(finalize(() => this.isLoadingSubject.next(false)))
      .subscribe({
        next: () => this.router.navigate(['/', 'auth', 'login']),
      })
  }
}
