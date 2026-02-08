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
        // One main root path
        path: '/',
        children: [
            {
                // Group 1: Using AppLayout
                element: <AppLayout/>,
                children: [
                    {index: true, element: <HomePage/>},
                    {path: 'about-us.html', element: <AboutPage/>},
                    {path: 'faq.html', element: <FAQPage/>},
                ]
            },
            {
                // Group 2: Using SearchLayout
                element: <SearchLayout/>,
                children: [
                    {path: 'car-search.html', element: <CarSearchPage/>},
                ]
            },
            {
                // Standalone page (No Layout)
                path: 'account.html',
                element: <AccountPage/>,
            },
        ],
    },
], {
    // This MUST match your vite.config.js base
    basename: '/proyecto2025-aguirre'
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);