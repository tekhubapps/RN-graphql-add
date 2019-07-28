'use strict';

import React, {Component} from 'react';
import {name as appName} from '../app.json';
import { Provider } from 'react-redux';
import {AppRegistry} from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql'}),
});

import Store from './store/Store';
import RouteNavigator from './index';

/**
 * Sets the store and client to the providers
 */
export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <ApolloProvider client={client}>
          <RouteNavigator />
        </ApolloProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);