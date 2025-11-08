import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from '@components/Button';
import CarCard from '@components/CarCard';
import {MOCK_VEHICLES} from '@api/vehiclesApi.js'; // Opcional, si quieres usar la lista sin un 'fetch'
import whiteLogo from '@assets/white-logo.png'; // Logo desde assets

const HomePage = () => {
    // Simulación del código de funciones.js para manejo de fechas (Usando Hooks)
    useEffect(() => {
        // Implementa aquí la lógica de validación de fechas de functions.js usando refs o estado
        const today = new Date().toISOString().split('T')[0];
        const dateStartInput = document.getElementById('searchBar_dateStart');
        const dateEndInput = document.getElementById('searchBar_dateEnd');

        if (dateStartInput) {
            if (!dateStartInput.value) dateStartInput.value = today;
            dateStartInput.setAttribute('min', today);
        }

        // El resto de la lógica de functions.js/date handling se migra aquí.

    }, []); // useEffect para ejecutar la lógica solo una vez al cargar

    // Solo tomamos 7 autos populares para el carrusel
    const popularCars = MOCK_VEHICLES.slice(0, 7);

    return (
        <>
            {/* Contenido del <header> (Video Opener) */}
            <header id="header">
                <section className="hero">
                    <div className="video-container">
                        <iframe
                            allow="autoplay"
                            src="https://www.youtube.com/embed/9ZP7bpAC3FM?autoplay=1&mute=1&loop=1&playlist=9ZP7bpAC3FM&controls=0&showinfo=0&fs=0&disablekb=1&rel=0"
                        ></iframe>
                    </div>
                    <div className="overlay"></div>
                    <div className="logo-container">
                        <img alt="White Thera Logo" className="heroLogo" src={whiteLogo}/>
                    </div>
                </section>
            </header>

            {/* Contenido principal (Section content) */}
            <section className="content">
                {/* ... Texto H1 y P ... */}
            </section>

            {/* Search Bar */}
            <section className="searchBar">
                <div className="searchBar-container">
                    <form className="search-form" action="/car-search.html" method="GET">
                        {/* Inputs y Botón (Reemplazando <button> por el componente genérico) */}
                        <input name="location" placeholder="Ciudad, Barrio o Aeropuerto" required type="text"/>
                        <input id="searchBar_dateStart" type="date" placeholder="Fecha de Inicio"/>
                        <input id="searchBar_dateEnd" type="date" placeholder="Fecha de Fin"/>
                        <Button variant="search" type="submit">Buscar</Button>
                    </form>
                </div>
            </section>

            {/* Car Options Slider (Carrusel) */}
            <section className="carOptions">
                <h2>Autos populares para alquilar</h2>
                <div className="carOptionsCarousel-container">
                    {popularCars.map(car => (
                        <CarCard key={car.id} car={car} isCompact={true}/>
                    ))}
                </div>
                <div>
                    <Link className="seeMore-button" to="/car-search.html">Ver más</Link>
                </div>
            </section>

            {/* Info Section (About Us y FAQ resumido) */}
            {/* ... Contenido de infoSection con Links y Button ... */}

            {/* Join Us Section */}
            <section className="joinUs">
                <div className="joinUs-container">
                    <h3>¿Listo para unirte a Thera?</h3>
                    <p>Explora la mayor flota de vehículos en Argentina o empieza a generar ingresos con tu propio
                        auto.</p>

                    <div className="joinUs-buttons">
                        <Button variant="primary">¡Alquila tu auto y gana!</Button>
                        <Link to="/car-search.html">
                            <Button variant="secondary">Alquilar un auto</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;