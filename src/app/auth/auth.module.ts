import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthTaigaModule } from './auth-taiga.module'
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component'

@NgModule({
  declarations: [LoginComponent, ConfirmEmailComponent],
  imports: [CommonModule, AuthTaigaModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
