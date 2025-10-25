import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/App.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter basename={process.env.PUBLIC_URL} > 
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </>
);