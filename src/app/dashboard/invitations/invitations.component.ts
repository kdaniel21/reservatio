import { Component, ChangeDetectionStrategy, Injector } from '@angular/core'
import { TuiDialogService } from '@taiga-ui/core'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { EditInvitationComponent } from './edit-invitation/edit-invitation.component'
import { InvitationListItem, InvitationsService } from './invitations.service'
import { SendInvitationComponent } from './send-invitation/send-invitation.component'

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationsComponent {
  readonly invitations$ = this.invitationsService.invitations$

  readonly columns = ['isRedeemable', 'emailAddress', 'expiresAt', 'isCompleted', 'actions']

  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly dialogService: TuiDialogService,
    private readonly injector: Injector,
  ) {}

  fetchMoreInvitations(): void {
    this.invitationsService.fetchMoreInvitations()
  }

  onSendNewInvitation(): void {
    const dialogComponent = new PolymorpheusComponent(SendInvitationComponent, this.injector)

    this.dialogService
      .open(dialogComponent, { label: 'Send invitation' })
      .subscribe({ next: () => this.invitationsService.reloadInvitations() })
  }

  onEditInvitation(invitation: Pick<InvitationListItem, 'id'>): void {
    const dialogComponent = new PolymorpheusComponent(EditInvitationComponent, this.injector)

    this.dialogService
      .open(dialogComponent, { label: 'Edit invitation', data: { invitationId: invitation.id } })
      .subscribe({ next: () => this.invitationsService.reloadInvitations() })
  }
}
