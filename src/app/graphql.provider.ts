import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { env } from 'src/environments/environment';

const uri = env.apiUrl;

export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
