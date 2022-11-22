import React from 'react';
import { createRoot } from 'react-dom/client';
import {App} from './components/App';
import GlobalStyles from './globalStyles';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.Fragment>
      <GlobalStyles />
      <App />
  </React.Fragment>
);
