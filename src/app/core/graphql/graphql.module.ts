import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { Injector, NgModule } from '@angular/core'
import { environment } from 'src/environments/environment'
import { TokenRefreshInterceptorService } from './token-refresh-interceptor.service'
import { TuiNotificationsModule } from '@taiga-ui/core'
import { errorHandler } from './error-handler'

const createApolloClient = (httpLink: HttpLink, injector: Injector): ApolloClientOptions<any> => {
  const http = httpLink.create({ uri: environment.graphqlApiUrl })
  const errorHandlerLink = errorHandler(injector)

  const link = errorHandlerLink.concat(http)

  const cache = new InMemoryCache()

  return { link, cache }
}

@NgModule({
  imports: [HttpClientModule, TuiNotificationsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenRefreshInterceptorService, multi: true },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApolloClient,
      deps: [HttpLink, Injector],
    },
  ],
})
export class GraphqlModule {}
