import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { map, withLatestFrom } from 'rxjs/operators'
import { AuthStateService } from 'src/app/auth/auth-state.service'
import { AuthService } from 'src/app/auth/auth.service'
import { CustomerRole } from 'src/app/core/graphql/generated'

interface MenuItem {
  translationKey: string
  icon: string
  route?: string[]
  action?: () => void
  roles?: CustomerRole[]
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent {
  private readonly authenticatedMenuItems: MenuItem[] = [
    { translationKey: 'calendar', icon: 'tuiIconCalendarLarge', route: ['/', 'calendar'] },
    { translationKey: 'new_reservation', icon: 'tuiIconPlusLarge', route: ['/', 'create'] },
    {
      translationKey: 'dashboard',
      icon: 'tuiIconStructureLarge',
      roles: [CustomerRole.Admin],
      route: ['/', 'dashboard'],
    },
    { translationKey: 'sign_out', icon: 'tuiIconLogoutLarge', action: () => this.onLogout() },
  ]

  private readonly guestMenuItems: MenuItem[] = [
    { translationKey: 'login', icon: 'tuiIconLoginLarge', route: ['/', 'auth', 'login'] },
  ]

  readonly menuItems$ = this.authStateService.isAuthenticated$.pipe(
    map(isAuthenticated => (isAuthenticated ? this.authenticatedMenuItems : this.guestMenuItems)),
    withLatestFrom(this.authStateService.user$),
    map(([menuItems, user]) => menuItems.filter(item => !item.roles || item.roles.includes(user.customer.role))),
  )

  constructor(
    private readonly authService: AuthService,
    private readonly authStateService: AuthStateService,
    private readonly router: Router,
  ) {}

  onMenuItemClick(translationKey: string) {
    const allMenuItems = [...this.authenticatedMenuItems, ...this.guestMenuItems]
    const menuItem = allMenuItems.find(item => item.translationKey === translationKey)
    if (!menuItem) return

    if (typeof menuItem.action === 'function') menuItem.action()
  }

  onLogout() {
    this.authService.logout().subscribe({ next: () => this.router.navigate(['/']) })
  }
}
