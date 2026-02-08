import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import offsetLogo from '../../public/offset-logo.png';

const NavigationBar = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === '/car-search.html';

    // --- Lógica de Fechas y Validación ---
    const todayFormatted = new Date().toISOString().split('T')[0];
    const MAX_DATE = "2026-12-31"; // Límite superior definido

    // Estado para la barra de búsqueda compacta
    const [compactStartDate, setCompactStartDate] = useState(todayFormatted);
    const [compactEndDate, setCompactEndDate] = useState(todayFormatted);

    // Función de Validación y Reseteo (Duplicada/Adaptada de HomePage)
    const handleDateValidation = (currentDate, type) => {
        const todayDate = new Date(todayFormatted);
        const maxDate = new Date(MAX_DATE);
        const inputDate = new Date(currentDate);

        // Si la fecha es anterior a hoy O posterior a la fecha máxima
        if (inputDate < todayDate || inputDate > maxDate) {
            return todayFormatted;
        }
        return currentDate;
    };

    const handleCompactStartDateChange = (e) => {
        let newStartDate = e.target.value;

        // 1. Validar y resetear si es necesario
        newStartDate = handleDateValidation(newStartDate, 'start');

        setCompactStartDate(newStartDate);

        // 2. Asegurar que la fecha de fin no sea anterior a la de inicio
        if (compactEndDate < newStartDate) {
            setCompactEndDate(newStartDate);
        }
    };

    const handleCompactEndDateChange = (e) => {
        let newEndDate = e.target.value;

        // 1. Validar y resetear si es necesario
        newEndDate = handleDateValidation(newEndDate, 'end');

        setCompactEndDate(newEndDate);
    };

    // Efecto para asegurar que la fecha minima de inicio este bien
    useEffect(() => {
        if (!isSearchPage) return;
    }, [isSearchPage]);


    return (
        <nav id="navigationBar">
            <div className="nav-logo">
                <Link to="/">
                    <img alt="Offset Thera Logo" className="navLogo-img" src={offsetLogo} />
                </Link>
            </div>

            {/* BARRA DE BÚSQUEDA COMPACTA (Aparece solo en la página de búsqueda) */}
            {isSearchPage && (
                <form className="search-form compact-search-form">
                    <label htmlFor="location-search-input"></label>
                    <input autoComplete="off"
                           className="location-input search-input"
                           id="location-search-input"
                           maxLength="100"
                           placeholder="Ciudad, Barrio o Aeropuerto"
                           type="text"
                    />
                    <div className="autocomplete-items" id="autocomplete-list"></div>

                    {/* CAMPO FECHA DE INICIO (Compacta) */}
                    <label>
                        <input
                            className="date-input search-input"
                            id="searchBar_dateStart_compact" // Usar ID único
                            placeholder="Fecha de Inicio"
                            type="date"
                            value={compactStartDate}
                            min={todayFormatted}
                            max={MAX_DATE}
                            onChange={handleCompactStartDateChange}
                        />
                    </label>

                    {/* CAMPO FECHA DE FIN (Compacta) */}
                    <label>
                        <input
                            className="date-input search-input"
                            id="searchBar_dateEnd_compact" // Usar ID único
                            placeholder="Fecha de Fin"
                            type="date"
                            value={compactEndDate}
                            min={compactStartDate}
                            max={MAX_DATE}
                            onChange={handleCompactEndDateChange}
                        />
                    </label>

                    <button className="search-button" type="submit">Buscar</button>
                </form>
            )}

            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/faq.html">Preguntas Frecuentes</Link></li>
                <li><Link to="/account.html">Cuenta</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;