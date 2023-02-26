import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import openweather from './apis/openweather';
import axios from 'axios';

async function LogData() {
    let data = await axios.get('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a043fe65d728314064a9719e20ff126f');
    console.log(data);
}

LogData();


const router = createBrowserRouter([{
    path: '/',
    element: <App />
}]);

createRoot(document.querySelector('#root')).render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
)