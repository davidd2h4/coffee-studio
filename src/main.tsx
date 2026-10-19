import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// У production HTML уже згенеровано під час збірки — під’єднуємося до нього.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
