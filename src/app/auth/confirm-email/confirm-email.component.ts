import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfirmEmailService } from './confirm-email.service'

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent {
  readonly isLoading$ = this.confirmEmailService.loader.isLoading$
  readonly hasError$ = this.confirmEmailService.retryHandler.hasError$

  readonly tosForm = this.formBuilder.group({
    isAccepted: [false, Validators.requiredTrue],
  })

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public readonly confirmEmailService: ConfirmEmailService,
  ) {}

  onConfirmEmail() {
    const confirmationToken = this.route.snapshot.paramMap.get('token')

    this.confirmEmailService.confirmEmail(confirmationToken).subscribe({
      next: () => {
        this.router.navigate(['/', 'auth', 'login'])
      },
    })
  }
}
