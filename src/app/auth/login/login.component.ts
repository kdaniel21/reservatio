import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm = this.formBuilder.group({
    email: [undefined, Validators.required],
    password: [undefined, Validators.required],
  })

  private readonly isLoadingSubject = new BehaviorSubject(false)
  readonly isLoading$ = this.isLoadingSubject.asObservable()

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  onLogin() {
    this.isLoadingSubject.next(true)

    const { email, password } = this.loginForm.value
    this.authService
      .login(email, password)
      .pipe(finalize(() => this.isLoadingSubject.next(false)))
      .subscribe({
        next: () => {
          const { returnUrl } = this.route.snapshot.queryParams
          this.router.navigateByUrl(returnUrl || '/')
        },
      })
  }
}
