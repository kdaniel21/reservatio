import { Component, ChangeDetectionStrategy } from '@angular/core'
import { AuthService } from 'src/app/auth/auth.service'

interface MenuItem {
  text: string
  icon: string
  route?: string
  action?: () => void
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent {
  readonly menuItems: MenuItem[] = [
    { text: 'Home', icon: 'tuiIconStopLarge' },
    { text: 'Calendar', icon: 'tuiIconCalendarLarge' },
    { text: 'Dashboard', icon: 'tuiIconStructureLarge' },
    { text: 'Sign out', icon: 'tuiIconLogoutLarge', action: () => this.onLogout() },
  ]

  constructor(private readonly authService: AuthService) {}

  onMenuItemClick(itemText: string) {
    const menuItem = this.menuItems.find(item => item.text === itemText)
    if (!menuItem) return

    if (typeof menuItem.action === 'function') menuItem.action()
  }

  onLogout() {
    return this.authService.logout().subscribe()
  }
}
