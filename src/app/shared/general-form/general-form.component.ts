import { Component, ChangeDetectionStrategy } from '@angular/core'
import { GeneralFormService } from './general-form.service'

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralFormComponent {
  readonly generalForm = this.generalFormService.form

  constructor(private readonly generalFormService: GeneralFormService) {}
}
