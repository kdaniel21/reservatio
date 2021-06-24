import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'app-is-active',
  templateUrl: './is-active.component.html',
  styleUrls: ['./is-active.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsActiveComponent {
  @Input() isActive = true
}
