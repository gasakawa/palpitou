import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import './src/index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found. Make sure <div id='root'></div> exists in index.html");
}
