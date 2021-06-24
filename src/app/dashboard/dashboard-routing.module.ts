import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardMainSelectComponent } from './dashboard-main-select/dashboard-main-select.component'
import { InvitationsComponent } from './invitations/invitations.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardMainSelectComponent },
  { path: 'invitations', component: InvitationsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
