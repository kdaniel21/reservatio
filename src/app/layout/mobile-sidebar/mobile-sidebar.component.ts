import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSidebarComponent {
  @Input() isOpen = false
}
