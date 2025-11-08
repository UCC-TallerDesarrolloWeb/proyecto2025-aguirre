import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AppLayout from './App.jsx';
import SearchLayout from '@components/SearchLayout';
import '@styles/main.scss';

import HomePage from '@pages/HomePage';
import AboutPage from '@pages/AboutPage';
import FAQPage from '@pages/FAQPage';
import AccountPage from '@pages/AccountPage';
import CarSearchPage from '@pages/CarSearchPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>, // <--- A menudo el error está aquí si el nombre no coincide
        children: [
            {index: true, element: <HomePage/>}, // index.html
            {path: 'about-us.html', element: <AboutPage/>}, // about-us.html
            {path: 'faq.html', element: <FAQPage/>}, // faq.html
        ],
    },
    {
        path: '/',
        element: <SearchLayout/>,
        children: [
            {path: 'car-search.html', element: <CarSearchPage/>},
        ],
    },
    {
        // Ruta que no usa el Layout completo (solo para la página de login/registro)
        path: '/account.html',
        element: <AccountPage/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);