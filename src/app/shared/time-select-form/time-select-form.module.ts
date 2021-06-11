import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TimeSelectFormComponent } from './time-select-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TimeSelectFormService } from './time-select-form.service'
import { TuiInputDateTimeModule } from '@taiga-ui/kit'
import { TuiGroupModule } from '@taiga-ui/core'

const taigaModules = [TuiInputDateTimeModule, TuiGroupModule]

@NgModule({
  declarations: [TimeSelectFormComponent],
  imports: [CommonModule, ReactiveFormsModule, ...taigaModules],
  exports: [TimeSelectFormComponent],
  providers: [TimeSelectFormService],
})
export class TimeSelectFormModule {}
