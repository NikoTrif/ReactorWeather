import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([{
    path: '/',
    element: <App />
}]);

createRoot(document.querySelector('#root')).render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
)