import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
const GRAPHQL_ENDPOINT = `https://api.yelp.com/v3/graphql`;
const TOKEN = 'dHHJvzqiTAkXW98KHgEDHHu0kNA87Er_k6znUk8YPRGaqpDjiERQb7pVaFkPmHEim2ntufUG9WDQixuY35OxiB0A-ejrj5DqWzkDBMjYT94hiCvaaR3nVzxa8LS8XHYx';

const createApolloClient = (token) => {
  const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/graphql'
    },
  });
  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  })
}
export default createApolloClient;