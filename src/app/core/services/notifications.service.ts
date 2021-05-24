import { Injectable } from '@angular/core'
import { TuiNotificationContentContext, TuiNotificationOptions, TuiNotificationsService } from '@taiga-ui/core'
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus'

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private readonly tuiNotificationsService: TuiNotificationsService) {}

  show(content: PolymorpheusContent<TuiNotificationContentContext<void, undefined>>, options: TuiNotificationOptions) {
    this.tuiNotificationsService.show(content, options).subscribe()
  }
}
