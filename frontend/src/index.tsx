import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './shared/styles/main.scss';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
