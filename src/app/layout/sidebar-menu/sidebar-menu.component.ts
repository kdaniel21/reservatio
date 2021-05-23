import { Component, ChangeDetectionStrategy } from '@angular/core'

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
    { text: 'Sign out', icon: 'tuiIconLogoutLarge' },
  ]
}
