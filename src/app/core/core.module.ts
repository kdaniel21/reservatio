import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GraphqlModule } from './graphql/graphql.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserAnimationsModule, GraphqlModule],
  exports: [GraphqlModule],
})
export class CoreModule {}
