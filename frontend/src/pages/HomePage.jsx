import React, {useEffect, useRef, useState} from 'react';
import NavigationBar from '@components/NavigationBar';
import {Link} from 'react-router-dom';
import Button from '@components/Button';
import CarCard from '@components/CarCard';
import {MOCK_VEHICLES} from '@api/vehiclesApi';
import {validateDateRange} from '../utils/dateValidation.js';

const whiteLogo = 'proyecto2025-aguirre/white-logo.png';

const HomePage = () => {
    const heroRef = useRef(null);
    const navBarRef = useRef(null);
    const [navHeight, setNavHeight] = useState(0);
    const contentRef = useRef(null);

    const todayFormatted = new Date().toISOString().split('T')[0];
    const MAX_DATE = "2026-12-31"; // Límite superior definido

    // Inicialización del estado de fechas
    const [startDate, setStartDate] = useState(todayFormatted);
    const [endDate, setEndDate] = useState(todayFormatted);

    const popularCars = MOCK_VEHICLES.slice(0, 7);

    // Handler para la fecha de inicio
    const handleStartDateChange = (e) => {
        const validatedDate = validateDateRange(e.target.value, todayFormatted, MAX_DATE);
        setStartDate(validatedDate);

        if (endDate < validatedDate) {
            setEndDate(validatedDate);
        }
    };

    const handleEndDateChange = (e) => {
        const validatedDate = validateDateRange(e.target.value, todayFormatted, MAX_DATE);
        setEndDate(validatedDate);
    };

    useEffect(() => {
        const dateStartInput = document.getElementById('searchBar_dateStart');
        if (dateStartInput) {
            dateStartInput.setAttribute('min', todayFormatted);
        }
    }, [todayFormatted]);

    useEffect(() => {
        if (!navBarRef.current || !heroRef.current) return;
        if (navHeight === 0) {
            const measureHeight = () => {
                setNavHeight(navBarRef.current.offsetHeight);
            };
            const timer = setTimeout(measureHeight, 50);
            return () => clearTimeout(timer);
        }

        const handleScroll = () => {
            const heroBottom = heroRef.current.getBoundingClientRect().bottom;
            if (heroBottom <= 0) {
                navBarRef.current.classList.add('nav-sticky');
                if (contentRef.current) contentRef.current.style.paddingTop = `${navHeight}px`;
            } else {
                navBarRef.current.classList.remove('nav-sticky');
                if (contentRef.current) contentRef.current.style.paddingTop = '0';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navHeight]);
    // Depende de navHeight una vez (cuando es 0), y después funciona con el valor fijo.

    return (
        <>
            {/* 1. HEADER / HERO */}
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

            {/* 2. NAVIGATION BAR (Wrapper con REF para manipular su clase) */}
            <div ref={navBarRef}>
                <NavigationBar/>
            </div>

            {/* 3. Contenido principal */}
            <section className="content" ref={contentRef}>
                <div className="text">
                    <br/>
                    <h1> Bienvenido a Thera, la plataforma para renta de autos entre personas más grande de
                        Argentina.</h1>
                    <p> ¡Con Thera podrás alquilar vehículos por la cantidad de tiempo que necesites! Ya sea para un
                        viaje que
                        tengas programado o quieras probar un vehículo en particular.</p>
                </div>
            </section>

            <section className="searchBar">
                <div className="searchBar-container">
                    <form className="search-form" action="/car-search.html" method="GET">
                        <input name="location" placeholder="Ciudad, Barrio o Aeropuerto" required type="text" maxLength="40"/>

                        {/* FECHA DE INICIO */}
                        <input
                            id="searchBar_dateStart"
                            type="date"
                            placeholder="Fecha de Inicio"
                            value={startDate}
                            // Eliminamos el min/max del JSX para confiar completamente en el handler (Cross-browser validation)
                            onChange={handleStartDateChange}
                        />

                        {/* FECHA DE FIN */}
                        <input
                            id="searchBar_dateEnd"
                            type="date"
                            placeholder="Fecha de Fin"
                            value={endDate}
                            min={startDate} // Restricción reactiva
                            // Eliminamos el min/max del JSX para confiar completamente en el handler (Cross-browser validation)
                            onChange={handleEndDateChange}
                        />
                        <Button variant="search" type="submit">Buscar</Button>
                    </form>
                </div>
            </section>

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
                            <input className="faq-toggle" id="faq4" name="faq4" type="checkbox"/>
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