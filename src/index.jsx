import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { keepFresh } from './freshness';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

keepFresh();
