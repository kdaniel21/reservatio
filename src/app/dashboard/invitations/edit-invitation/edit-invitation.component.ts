import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TuiDialogContext } from '@taiga-ui/core'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { isPast } from 'date-fns'
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, first, map, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { AuthStateService } from 'src/app/auth/auth-state.service'
import { tuiDateTimeFutureOnly } from 'src/app/core/form-validators/tui-date-time-future-only.validator'
import { tuiDateTimeRequired } from 'src/app/core/form-validators/tui-date-time-required.validator'
import { TaigaUtils } from 'src/app/core/taiga-utils'
import { EditInvitationService, Invitation } from './edit-invitation.service'

export interface EditInvitationModalContext {
  invitationId: string
}

@Component({
  selector: 'app-edit-invitation',
  templateUrl: './edit-invitation.component.html',
  styleUrls: ['./edit-invitation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInvitationComponent implements OnInit {
  readonly editInvitationForm: FormGroup = this.formBuilder.group({
    emailAddress: [undefined, [Validators.required, Validators.email]],
    expiresAt: [undefined, [tuiDateTimeFutureOnly, tuiDateTimeRequired]],
  })

  readonly isLoading$ = this.editInvitationService.loader.isLoading$
  readonly errorMessage$ = this.editInvitationService.retryHandler.message$

  private readonly selectInvitationSubject = new BehaviorSubject<string>(undefined)
  readonly editedInvitation$ = this.selectInvitationSubject.pipe(
    filter(val => !!val),
    switchMap(invitationId => this.editInvitationService.getInvitation(invitationId)),
    tap(editedInvitation => this.preFillForm(editedInvitation)),
    shareReplay(1),
  )

  readonly isInvitedByCurrentUser$: Observable<boolean> = this.editedInvitation$.pipe(
    withLatestFrom(this.authStateService.user$),
    map(([editedInvitation, currentUser]) => editedInvitation.inviter.id === currentUser.customer.id),
  )

  readonly isReadonly$: Observable<boolean> = this.editedInvitation$.pipe(
    map(editedInvitation => isPast(editedInvitation.expiresAt) || editedInvitation.isCompleted),
    tap(isReadonly => (isReadonly ? this.editInvitationForm.disable() : this.editInvitationForm.enable())),
  )

  constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, EditInvitationModalContext>,
    public readonly editInvitationService: EditInvitationService,
    private readonly authStateService: AuthStateService,
  ) {}

  ngOnInit(): void {
    const { invitationId } = this.context.data
    this.selectInvitationSubject.next(invitationId)
  }

  onSave(): void {
    this.updateInvitation().subscribe({
      next: () => this.closeDialog(),
    })
  }

  onUpdateIsActive(): void {
    this.toggleIsActive().subscribe({
      next: () => this.closeDialog(),
    })
  }

  closeDialog(): void {
    this.context.completeWith()
  }

  private preFillForm(invitation: Invitation): void {
    const tuiExpiresAt = TaigaUtils.convertNativeDateToDateTime(invitation.expiresAt)
    this.editInvitationForm.patchValue({ ...invitation, expiresAt: tuiExpiresAt })
  }

  private updateInvitation(): Observable<void> {
    return this.editedInvitation$.pipe(
      first(),
      map(editedInvitation => {
        const { emailAddress, expiresAt: tuiExpiresAt } = this.editInvitationForm.value
        const expiresAt = TaigaUtils.convertDateTimeToNativeDate(tuiExpiresAt)

        return { ...editedInvitation, emailAddress, expiresAt }
      }),
      switchMap(updatedInvitation => this.editInvitationService.updateInvitation(updatedInvitation)),
    )
  }

  private toggleIsActive(): Observable<void> {
    return this.editedInvitation$.pipe(
      first(),
      map(editedInvitation => ({ ...editedInvitation, isActive: !editedInvitation.isActive })),
      switchMap(updatedInvitation => this.editInvitationService.updateInvitation(updatedInvitation)),
    )
  }
}
