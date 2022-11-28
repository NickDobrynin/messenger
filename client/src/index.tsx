import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { createRoot } from 'react-dom/client';
import {App} from './components/App';
import GlobalStyles from './globalStyles';

const container = document.getElementById('root')!;
const root = createRoot(container);

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
      <GlobalStyles />
      <App />
  </ApolloProvider>
);
