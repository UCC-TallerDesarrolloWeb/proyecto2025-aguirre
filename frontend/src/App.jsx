import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '@components/Footer';

function AppLayout() {
    return (
        <div id="app-container">
            {/* NO RENDERIZAR Nav Bar aquí */}
            <main id="content-area">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;