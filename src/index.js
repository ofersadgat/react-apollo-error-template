import "./index.css";

import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import { link } from "./graphql/link";
import { ApolloLink } from 'apollo-link';
import App from "./App";

import { withClientState } from 'apollo-link-state';

//This is the same cache you pass into new ApolloClient
const cache = new InMemoryCache();

const stateLink = withClientState({
	cache,
	defaults: {
    currentData: {
      __typename: 'MyData',
	  query: [{name: 'test',children:[]}],
    }
  },
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    link
  ]),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
