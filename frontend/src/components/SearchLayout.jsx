import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '@components/NavigationBar';

const SearchLayout = () => {
    return (
        <>
            <NavigationBar />
            <main>
                <Outlet /> {/* Aquí se renderizará CarSearchPage.jsx */}
            </main>
        </>
    );
};

export default SearchLayout;