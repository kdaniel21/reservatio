import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TuiRootModule } from '@taiga-ui/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { LayoutModule } from './layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TuiRootModule, CoreModule, LayoutModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
