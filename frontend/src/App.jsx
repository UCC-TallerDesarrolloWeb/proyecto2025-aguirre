import React from 'react';
import {Outlet} from 'react-router-dom';
import NavigationBar from '@components/NavigationBar';
import Footer from '@components/Footer';

// Este es el Layout principal que usa el <Outlet /> (Requisito)
function AppLayout() {
    return (
        <>
            <NavigationBar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}

export default AppLayout;