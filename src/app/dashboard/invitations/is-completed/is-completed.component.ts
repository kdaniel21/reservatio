import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'app-is-completed',
  templateUrl: './is-completed.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsCompletedComponent {
  @Input() isCompleted = true
}
