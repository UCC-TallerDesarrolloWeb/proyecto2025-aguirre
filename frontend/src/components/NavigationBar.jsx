import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import offsetLogo from '../../public/offset-logo.png';
import {validateDateRange} from "../utils/dateValidation.js";

const NavigationBar = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === '/car-search.html';

    // --- Lógica de Fechas y Validación ---
    const todayFormatted = new Date().toISOString().split('T')[0];
    const MAX_DATE = "2026-12-31";

// Estado para la barra de búsqueda compacta
    const [compactStartDate, setCompactStartDate] = useState(todayFormatted);
    const [compactEndDate, setCompactEndDate] = useState(todayFormatted);

// Handler para la fecha de inicio compacta
    const handleCompactStartDateChange = (e) => {
        // Utilizamos la utilidad externa
        const validatedDate = validateDateRange(e.target.value, todayFormatted, MAX_DATE);
        setCompactStartDate(validatedDate);

        // Asegurar que la fecha de fin no sea anterior a la de inicio
        if (compactEndDate < validatedDate) {
            setCompactEndDate(validatedDate);
        }
    };

// Handler para la fecha de fin compacta
    const handleCompactEndDateChange = (e) => {
        // Utilizamos la utilidad externa
        const validatedDate = validateDateRange(e.target.value, todayFormatted, MAX_DATE);
        setCompactEndDate(validatedDate);
    };

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