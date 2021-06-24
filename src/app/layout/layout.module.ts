import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LayoutComponent } from './layout.component'
import { LayoutTaigaModule } from './layout-taiga.module'
import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component'
import { DesktopSidebarComponent } from './desktop-sidebar/desktop-sidebar.component'
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component'
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component'
import { SidebarProfileComponent } from './sidebar-profile/sidebar-profile.component'
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from '../core/core.module'

@NgModule({
  declarations: [
    LayoutComponent,
    MobileNavbarComponent,
    DesktopSidebarComponent,
    MobileSidebarComponent,
    SidebarMenuComponent,
    SidebarProfileComponent,
  ],
  imports: [CoreModule, CommonModule, LayoutTaigaModule, RouterModule, BrowserAnimationsModule],
})
export class LayoutModule {}
