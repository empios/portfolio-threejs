import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Order matters: the design system establishes the vocabulary, the folio speaks it.
import './styles/pangolin/tokens.css';
import './styles/pangolin/base.css';
import './styles/folio.css';
import './styles/print.css';

import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('The folio found no #root to bind to.');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
