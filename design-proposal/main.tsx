import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './proposal.css';
import { Proposal } from './Proposal';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Proposal />
  </StrictMode>,
);
