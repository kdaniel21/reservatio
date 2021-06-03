import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { ChangePasswordService } from './change-password.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  readonly isLoading$ = this.changePasswordService.loader.isLoading$
  readonly errorMessage$ = this.changePasswordService.retryHandler.message$

  private readonly hasChangedPasswordSubject = new BehaviorSubject<boolean>(false)
  readonly hasChangedPassword$ = this.hasChangedPasswordSubject.asObservable()

  readonly changePasswordForm = this.formBuilder.group(
    {
      password: [undefined, [Validators.required, Validators.minLength(8)]],
      passwordConfirm: [undefined, [Validators.required]],
    },
    { validators: [this.passwordConfirmValidator] },
  )

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changePasswordService: ChangePasswordService,
    private readonly route: ActivatedRoute,
  ) {}

  onChangePassword() {
    const { password, passwordConfirm } = this.changePasswordForm.value
    const passwordResetToken = this.route.snapshot.paramMap.get('token')

    this.changePasswordService.changePasswordUsingToken(passwordResetToken, password, passwordConfirm).subscribe({
      next: () => this.hasChangedPasswordSubject.next(true),
    })
  }

  onRetry() {
    this.changePasswordService.retryHandler.retryAfterError()
  }

  private passwordConfirmValidator(group: FormGroup) {
    const { password, passwordConfirm } = group.value

    const areMatching = password === passwordConfirm
    return areMatching ? null : { passwordConfirmation: false }
  }
}
