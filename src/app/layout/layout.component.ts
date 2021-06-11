import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { WINDOW } from '@ng-web-apis/common'
import { Observable, fromEvent } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly MAX_MOBILE_WIDTH = 768

  readonly isMobile$: Observable<boolean> = fromEvent(this.window, 'resize').pipe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map((event: any) => event.target.innerWidth),
    startWith(this.window.innerWidth),
    map((width: number) => width <= this.MAX_MOBILE_WIDTH),
  )

  constructor(@Inject(WINDOW) private window: Window) {}
}
