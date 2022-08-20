import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


//create all structure about redux

import { Provider } from 'react-redux'

import {store} from './story'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider story ={store} >
    <App />
    </Provider>
  </React.StrictMode>
);


