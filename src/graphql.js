import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
  uri: 'https://api.smallstep.com/graphql',
  credentials: 'include',
  fetch,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
