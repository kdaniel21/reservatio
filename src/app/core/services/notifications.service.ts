import { Injectable } from '@angular/core'
import {
  TuiNotification,
  TuiNotificationContentContext,
  TuiNotificationOptions,
  TuiNotificationsService,
} from '@taiga-ui/core'
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus'

type NotificationContent = PolymorpheusContent<TuiNotificationContentContext<void, undefined>>

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor(private readonly tuiNotificationsService: TuiNotificationsService) {}

  show(content: NotificationContent, options: TuiNotificationOptions) {
    this.tuiNotificationsService.show(content, options).subscribe()
  }

  showSuccess(content: NotificationContent) {
    this.show(content, { status: TuiNotification.Success })
  }

  showError(content: NotificationContent) {
    this.show(content, { status: TuiNotification.Error })
  }

  showWarning(content: NotificationContent) {
    this.show(content, { status: TuiNotification.Warning })
  }

  showInfo(content: NotificationContent) {
    this.show(content, { status: TuiNotification.Info })
  }
}
