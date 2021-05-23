import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GraphqlModule } from './graphql/graphql.module'
import { LayoutModule } from '../layout/layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [],
  imports: [CommonModule, GraphqlModule, BrowserAnimationsModule, LayoutModule],
  exports: [GraphqlModule],
})
export class CoreModule {}
