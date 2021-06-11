import { Injectable } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Injectable()
export class GeneralFormService {
  readonly form = this.formBuilder.group({
    name: [undefined, [Validators.required, Validators.minLength(3)]],
  })

  constructor(private readonly formBuilder: FormBuilder) {}
}
