import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { DashboardMainSelectComponent } from './dashboard-main-select/dashboard-main-select.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardTaigaModule } from './dashboard-taiga.module'
import { InvitationsComponent } from './invitations/invitations.component'
import { SendInvitationComponent } from './invitations/send-invitation/send-invitation.component'
import { EditInvitationComponent } from './invitations/edit-invitation/edit-invitation.component'
import { RetryErrorMessageModule } from '../shared/retry-error-message/retry-error-message.module'
import { IsCompletedComponent } from './invitations/is-completed/is-completed.component'
import { IsActiveComponent } from './invitations/is-active/is-active.component'
import { TranslocoRootModule } from '../transloco/transloco-root.module'
import { CoreModule } from '../core/core.module'

// TODO: Organize TranslocoRootModule
@NgModule({
  declarations: [
    DashboardMainSelectComponent,
    InvitationsComponent,
    SendInvitationComponent,
    EditInvitationComponent,
    IsCompletedComponent,
    IsActiveComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    DashboardRoutingModule,
    DashboardTaigaModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RetryErrorMessageModule,
    TranslocoRootModule,
  ],
})
export class DashboardModule {}
