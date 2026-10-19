import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/** Рендерить сторінку в HTML під час збірки (див. scripts/prerender.mjs). */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
