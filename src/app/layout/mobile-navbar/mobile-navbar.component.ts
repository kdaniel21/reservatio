import { Component, ChangeDetectionStrategy } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavbarComponent {
  private readonly isSidebarOpenSubject = new BehaviorSubject<boolean>(false)
  readonly isSidebarOpen$ = this.isSidebarOpenSubject.asObservable()

  toggleSidebar() {
    const currentState = this.isSidebarOpenSubject.getValue()
    this.isSidebarOpenSubject.next(!currentState)
  }
}
