import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { AuthStateService } from 'src/app/auth/auth-state.service'

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: './sidebar-profile.component.html',
  styleUrls: ['./sidebar-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarProfileComponent {
  user$ = this.authStateService.user$

  constructor(private authStateService: AuthStateService) {}
}
