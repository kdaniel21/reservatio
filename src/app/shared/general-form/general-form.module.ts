import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GeneralFormComponent } from './general-form.component'
import { GeneralFormService } from './general-form.service'
import { ReactiveFormsModule } from '@angular/forms'
import { TuiFieldErrorModule, TuiInputModule } from '@taiga-ui/kit'

const taigaModules = [TuiInputModule, TuiFieldErrorModule]

@NgModule({
  declarations: [GeneralFormComponent],
  imports: [CommonModule, ReactiveFormsModule, ...taigaModules],
  exports: [GeneralFormComponent],
  providers: [GeneralFormService],
})
export class GeneralFormModule {}
