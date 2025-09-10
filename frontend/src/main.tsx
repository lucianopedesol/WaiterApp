import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {GlobalStyles} from './styles/GlobalStyles';
import { AuthProvider } from './contexts/authContext';
import './styles/styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <GlobalStyles />
    </AuthProvider>
  </React.StrictMode>,
);
