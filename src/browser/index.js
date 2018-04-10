import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../shared/store';

import style from '../css/main.css';

hydrate(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    ,
  document.getElementById('app')
);