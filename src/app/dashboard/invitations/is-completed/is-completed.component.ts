import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'app-is-completed',
  template: `
    <tui-svg [src]="isCompleted ? 'tuiIconCheckCircle' : 'tuiIconCloseLarge'"></tui-svg>
    {{ isCompleted ? 'Completed' : 'Not completed' }}
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsCompletedComponent {
  @Input() isCompleted = true
}
