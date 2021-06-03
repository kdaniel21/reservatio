import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RetryErrorMessageComponent } from './retry-error-message.component'
import { TuiMarkerIconModule } from '@taiga-ui/kit'
import { TuiButtonModule } from '@taiga-ui/core'

@NgModule({
  declarations: [RetryErrorMessageComponent],
  imports: [CommonModule, TuiMarkerIconModule, TuiButtonModule],
  exports: [RetryErrorMessageComponent],
})
export class RetryErrorMessageModule {}
