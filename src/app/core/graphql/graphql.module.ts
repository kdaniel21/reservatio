import { HttpClientModule } from '@angular/common/http'
import { APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core'
import { NgModule } from '@angular/core'
import { environment } from 'src/environments/environment'

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.graphqlApiUrl,
          }),
        }
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule {}
