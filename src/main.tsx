import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './styles/site.css';
import './styles/print.css';

import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('The folio found no #root to bind to.');

hydrateRoot(
  container,
  <StrictMode>
    <App />
  </StrictMode>,
);
