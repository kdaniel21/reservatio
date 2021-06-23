import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { map, withLatestFrom } from 'rxjs/operators'
import { AuthStateService } from 'src/app/auth/auth-state.service'
import { AuthService } from 'src/app/auth/auth.service'
import { CustomerRole } from 'src/app/core/graphql/generated'

interface MenuItem {
  text: string
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
    { text: 'Calendar', icon: 'tuiIconCalendarLarge', route: ['/', 'calendar'] },
    { text: 'New reservation', icon: 'tuiIconPlusLarge', route: ['/', 'create'] },
    { text: 'Dashboard', icon: 'tuiIconStructureLarge', roles: [CustomerRole.Admin] },
    { text: 'Sign out', icon: 'tuiIconLogoutLarge', action: () => this.onLogout() },
  ]

  private readonly guestMenuItems: MenuItem[] = [
    { text: 'Login', icon: 'tuiIconLoginLarge', route: ['/', 'auth', 'login'] },
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

  onMenuItemClick(itemText: string) {
    const allMenuItems = [...this.authenticatedMenuItems, ...this.guestMenuItems]
    const menuItem = allMenuItems.find(item => item.text === itemText)
    if (!menuItem) return

    if (typeof menuItem.action === 'function') menuItem.action()
  }

  onLogout() {
    this.authService.logout().subscribe({ next: () => this.router.navigate(['/']) })
  }
}
