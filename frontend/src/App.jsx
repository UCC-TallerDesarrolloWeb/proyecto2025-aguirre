import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '@components/Footer';

// Este es el Layout principal que usa el <Outlet /> (Requisito)
function AppLayout() {
    return (
        <div id="app-container">
            <main id="content-area">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default AppLayout;