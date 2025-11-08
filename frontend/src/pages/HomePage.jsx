import React, {useEffect, useRef} from 'react';
import NavigationBar from '@components/NavigationBar';
import {Link} from 'react-router-dom';
import Button from '@components/Button';
import CarCard from '@components/CarCard';
import {MOCK_VEHICLES} from '@api/vehiclesApi'; // Uso del mock data
import whiteLogo from '../../public/white-logo.png'; // Logo desde public

const HomePage = () => {
    // 1. Refs para la lógica de scroll
    const navWrapperRef = useRef(null);
    const heroRef = useRef(null);

    // Solo tomamos 7 autos populares para el carrusel
    const popularCars = MOCK_VEHICLES.slice(0, 7);

    // --- Lógica de Manejo de Fechas (functions.js) ---
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const dateStartInput = document.getElementById('searchBar_dateStart');
        // const dateEndInput = document.getElementById('searchBar_dateEnd'); // No se usa aquí, solo se define

        if (dateStartInput) {
            if (!dateStartInput.value) dateStartInput.value = today;
            dateStartInput.setAttribute('min', today);
        }
        // Nota: La lógica de restricción de dateEnd se aplicaría en el 'onChange' en un escenario completo de React.
    }, []);

    // --- Lógica de Sticky Navigation (Requisito: useEffect, useRef) ---
    useEffect(() => {
        const handleScroll = () => {
            if (!navWrapperRef.current || !heroRef.current) return;

            // Altura total del Hero (video + logo)
            const heroHeight = heroRef.current.offsetHeight;

            // Si el scroll vertical supera esa altura
            if (window.scrollY > heroHeight) {
                // Añadir clase definida en SASS para position: fixed
                navWrapperRef.current.classList.add('nav-sticky');
            } else {
                // Remover clase
                navWrapperRef.current.classList.remove('nav-sticky');
            }
        };

        // Escuchar el evento de scroll
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Ejecutar al inicio

        // Función de limpieza al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* 1. HEADER / HERO (Añadir REF para medir la altura del punto de quiebre) */}
            <header id="header" ref={heroRef}>
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

            {/* 2. NAVIGATION BAR (ENVUELTA con REF para aplicar el estilo sticky) */}
            <div ref={navWrapperRef}>
                <NavigationBar/>
            </div>

            {/* Contenido principal */}
            <section className="content">
                <div className="text">
                    <br/>
                    <h1> Bienvenido a Thera, la plataforma para renta de autos entre personas más grande de
                        Argentina.</h1>
                    <p> ¡Con Thera podrás alquilar vehículos por la cantidad de tiempo que necesites! Ya sea para un
                        viaje que
                        tengas programado o quieras probar un vehículo en particular.</p>
                </div>
            </section>

            {/* Search Bar */}
            <section className="searchBar">
                <div className="searchBar-container">
                    <form className="search-form" action="/car-search.html" method="GET">
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
            <section className="infoSection">
                <div className="infoSection-container">
                    <div className="col-aboutUs">
                        <section id="thera-resumen">
                            <h2>Acerca de Thera</h2>
                            <p>
                                ¡Te presentamos <strong>Thera</strong>, la plataforma que está transformando la forma en
                                que los
                                argentinos vemos el auto!
                            </p>

                            <p>
                                Thera es el <em>marketplace</em> de <em>carsharing</em> entre personas, seguro y
                                confiable. Si tenés
                                un auto, podés publicarlo y <strong>ganar dinero</strong> cuando no lo uses. Si
                                necesitás moverte,
                                podés alquilar el vehículo perfecto de un particular <strong>cerca de tu casa y a un
                                precio
                                justo</strong>.
                            </p>

                        </section>

                        <Link className="aboutUs-button" to="/about-us.html">Conoce más sobre nosotros</Link>
                    </div>

                    <div className="col-faq">
                        <h2>Preguntas Frecuentes</h2>

                        {/* Implementación de FAQ con la estructura original */}
                        <div className="faq-item">
                            <input className="faq-toggle" id="faq1" name="faq1" type="checkbox"/>
                            <label className="faq-question" htmlFor="faq1">¿Cuales son los requisitos para alquilar un
                                auto?</label>
                            <div className="faq-answer">
                                <p>¡Es muy sencillo! Solo tienes que ser mayor de 18 años, tener una licencia de
                                    conducir vigente y
                                    una tarjeta de crédito a tu nombre.</p>
                            </div>
                        </div>

                        <div className="faq-item">
                            <input className="faq-toggle" id="faq2" name="faq2" type="checkbox"/>
                            <label className="faq-question" htmlFor="faq2">¿Puedo usar mi tarjeta de débito para
                                pagar?</label>
                            <div className="faq-answer">
                                <p>¡Sí! El alquiler del vehículo puedes pagarlo con tarjeta de débito o crédito. Sin
                                    embargo, ten en
                                    cuenta que el depósito de seguridad sí requiere una tarjeta de crédito.</p>
                            </div>
                        </div>

                        <div className="faq-item">
                            <input className="faq-toggle" id="faq3" name="faq3" type="checkbox"/>
                            <label className="faq-question" htmlFor="faq3">¿Existe algún límite de kilómetros?</label>
                            <div className="faq-answer">
                                <p>¡Depende del dueño del vehículo! Muchos propietarios ofrecen kilometraje ilimitado en
                                    sus
                                    anuncios. Para estar completamente seguro, te recomendamos revisar los términos de
                                    cada
                                    publicación antes de reservar.</p>
                            </div>
                        </div>

                        <div className="faq-item">
                            <input className="faq-toggle" id="faq4" name="faq3" type="checkbox"/>
                            <label className="faq-question" htmlFor="faq4">¿Qué pasa si tengo que cancelar mi
                                reserva?</label>
                            <div className="faq-answer">
                                <p>Nuestra política de cancelación es muy flexible: puedes cancelar gratis hasta 48
                                    horas antes de
                                    la hora de recogida. Si la cancelación se realiza después de ese plazo, podría
                                    aplicarse una
                                    penalización o retención de la tarifa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Us Section */}
            <section className="joinUs">
                <div className="joinUs-container">
                    <h3>¿Listo para unirte a Thera?</h3>
                    <p>Explora la mayor flota de vehículos en Argentina o empieza a generar ingresos con tu propio
                        auto.</p>

                    <div className="joinUs-buttons">
                        <Button variant="primary" type="button">¡Alquila tu auto y gana!</Button>
                        <Link to="/car-search.html">
                            <Button variant="secondary" type="button">Alquilar un auto</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;