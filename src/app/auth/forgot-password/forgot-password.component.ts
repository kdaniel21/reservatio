import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { ForgotPasswordService } from './forgot-password.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  private readonly hasSentResetEmailSubject = new BehaviorSubject<boolean>(false)
  readonly hasSentResetEmail$ = this.hasSentResetEmailSubject.asObservable()

  readonly isLoading$ = this.forgotPasswordService.loader.isLoading$
  readonly hasError$ = this.forgotPasswordService.retryHandler.hasError$

  readonly forgotPasswordForm = this.formBuilder.group({
    email: [undefined, [Validators.required, Validators.email]],
  })

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly forgotPasswordService: ForgotPasswordService,
  ) {}

  onResetPassword() {
    const { email } = this.forgotPasswordForm.value

    this.forgotPasswordService.resetPassword(email).subscribe({
      next: () => this.hasSentResetEmailSubject.next(true),
    })
  }

}
