import React from 'react';
import {ApolloProvider} from '@apollo/client';
import { createRoot } from 'react-dom/client';
import {App} from './components/App';
import GlobalStyles from './globalStyles';
import client from './apollo'
import {BrowserRouter} from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
