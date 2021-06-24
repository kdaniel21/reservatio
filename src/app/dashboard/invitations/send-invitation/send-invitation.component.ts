import { Component, ChangeDetectionStrategy, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TuiDialogContext } from '@taiga-ui/core'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { SendInvitationService } from './send-invitation.service'

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.component.html',
  styleUrls: ['./send-invitation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendInvitationComponent {
  readonly sendInvitationForm: FormGroup = this.formBuilder.group({
    emailAddress: [undefined, [Validators.required, Validators.email]],
  })

  readonly isLoading$ = this.sendInvitationService.loader.isLoading$

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sendInvitationService: SendInvitationService,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, void>,
  ) {}

  onSendInvitation(): void {
    const { emailAddress } = this.sendInvitationForm.value

    this.sendInvitationService.sendInvitation(emailAddress).subscribe({
      next: () => this.closeDialog(),
    })
  }

  closeDialog(): void {
    this.context.completeWith()
  }
}
