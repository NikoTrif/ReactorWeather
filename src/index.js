import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/store'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import openweather from './apis/openweather';

createRoot(document.querySelector('#root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)