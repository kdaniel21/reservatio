import { Component, ChangeDetectionStrategy } from '@angular/core'
import { map } from 'rxjs/operators'
import { AuthStateService } from 'src/app/auth/auth-state.service'

@Component({
  selector: 'app-dashboard-main-select',
  templateUrl: './dashboard-main-select.component.html',
  styleUrls: ['./dashboard-main-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMainSelectComponent {
  readonly name$ = this.authStateService.user$.pipe(map(user => user.customer.name))

  constructor(private readonly authStateService: AuthStateService) {}
}
