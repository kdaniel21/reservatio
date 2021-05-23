import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { ApolloLink, InMemoryCache } from '@apollo/client/core'
import { Injector, NgModule } from '@angular/core'
import { environment } from 'src/environments/environment'
import { setContext } from '@apollo/client/link/context'
import { AuthService } from 'src/app/auth/auth.service'
import { TokenRefreshInterceptorService } from './token-refresh-interceptor.service'

export const createApollo = (httpLink: HttpLink, injector: Injector) => {
  const auth = setContext(async (operation, context) => {
    const authService = injector.get(AuthService)
    const { accessToken } = authService
    if (!accessToken) return {}

    return { headers: { Authorization: accessToken } }
  })

  const link = ApolloLink.from([auth, httpLink.create({ uri: environment.graphqlApiUrl, withCredentials: true })])
  const cache = new InMemoryCache()

  return { link, cache }
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenRefreshInterceptorService, multi: true },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Injector],
    },
  ],
})
export class GraphqlModule {}
