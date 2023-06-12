import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://dj-auth-server.herokuapp.com/graphql/',
  // uri: 'http://127.0.0.1:8000/graphql/',
  cache: new InMemoryCache(),
});

export default client;
