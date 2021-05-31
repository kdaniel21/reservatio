import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TuiDialogModule, TuiRootModule } from '@taiga-ui/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { LayoutModule } from './layout/layout.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TuiRootModule, CoreModule, LayoutModule, TuiDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
