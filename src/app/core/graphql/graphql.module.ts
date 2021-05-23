import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core'
import { NgModule } from '@angular/core'
import { environment } from 'src/environments/environment'
import { TokenRefreshInterceptorService } from './token-refresh-interceptor.service'

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenRefreshInterceptorService, multi: true },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({ uri: environment.graphqlApiUrl, withCredentials: true }),
      }),
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule {}
