import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import * as process from 'node:process';
// import { env } from 'src/environments/environment';
// todo: replace with env from environment.ts later (problems with workflows) or use the env server or store to provide variables or use
//  custom webpack
import * as dotenv from 'dotenv';
dotenv.config();

// const uri = env.apiUrl;
const uri = process.env['API_URL'] || '';
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
