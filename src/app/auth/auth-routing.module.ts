import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email/:token', component: ConfirmEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password/:token', component: ChangePasswordComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
