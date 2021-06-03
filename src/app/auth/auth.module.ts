import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthTaigaModule } from './auth-taiga.module'
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module'
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { RetryErrorMessageModule } from '../shared/retry-error-message/retry-error-message.module';
import { ChangePasswordComponent } from './change-password/change-password.component'

@NgModule({
  declarations: [LoginComponent, ConfirmEmailComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [CommonModule, AuthTaigaModule, AuthRoutingModule, ReactiveFormsModule, RetryErrorMessageModule],
})
export class AuthModule {}
