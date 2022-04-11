import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
   
  
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: error.concat(
            httpLink.create({
              uri: 'api/graphql',
            })
          ),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'cache-and-network',
              errorPolicy: 'all',
            },
            query: {
              fetchPolicy: 'network-only',
              errorPolicy: 'all',
            },
            mutate: {
              errorPolicy: 'all',
            },
          },
        };
      },
      deps: [HttpLink],
    },
  

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
