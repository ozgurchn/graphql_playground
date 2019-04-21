import React, {Component} from 'react';
import Home from './src/screens/home';
import createApolloClient from './apollo';
import { ApolloProvider } from 'react-apollo';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={createApolloClient()}>
        <Home />
      </ApolloProvider>
    );
  }
}
