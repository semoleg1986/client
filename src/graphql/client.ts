import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://dj-auth-server.herokuapp.com/graphql/',
  cache: new InMemoryCache(),
});

export default client;
