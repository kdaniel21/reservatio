import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TuiRootModule } from '@taiga-ui/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { LayoutModule } from './layout/layout.module'
import { HttpClientModule } from '@angular/common/http'
import { TranslocoRootModule } from './transloco/transloco-root.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
