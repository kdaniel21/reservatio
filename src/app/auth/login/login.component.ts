import { Component, ChangeDetectionStrategy, Inject } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { TuiNotificationsService } from '@taiga-ui/core'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  })

  private readonly isLoadingSubject = new BehaviorSubject(false)
  readonly isLoading$ = this.isLoadingSubject.asObservable()

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  onLogin() {
    const { email, password } = this.loginForm.value
    this.authService.login(email, password).subscribe({
      next: () => {
        const { returnUrl } = this.route.snapshot.queryParams
        this.router.navigateByUrl(returnUrl)
      },
    })
  }
}
