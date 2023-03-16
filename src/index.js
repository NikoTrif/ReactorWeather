import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/slices/weatherSlices'

const store = configureStore({ reducer: rootReducer });

createRoot(document.querySelector('#root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)