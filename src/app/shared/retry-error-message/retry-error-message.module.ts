import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RetryErrorMessageComponent } from './retry-error-message.component'
import { TuiMarkerIconModule } from '@taiga-ui/kit'
import { TuiButtonModule } from '@taiga-ui/core'
import { CoreModule } from 'src/app/core/core.module'

@NgModule({
  declarations: [RetryErrorMessageComponent],
  imports: [CommonModule, CoreModule, TuiMarkerIconModule, TuiButtonModule],
  exports: [RetryErrorMessageComponent],
})
export class RetryErrorMessageModule {}
