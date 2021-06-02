import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email/:token', component: ConfirmEmailComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
