import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TuiRootModule } from '@taiga-ui/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TuiRootModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
