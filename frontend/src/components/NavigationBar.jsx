import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import offsetLogo from '../../public/offset-logo.png';

const NavigationBar = () => {
    const location = useLocation();
    // Verifica si la ruta actual es la página de búsqueda
    const isSearchPage = location.pathname === '/car-search.html';

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
                    <input autocomplete="off"
                           className="location-input search-input"
                           id="location-search-input"
                           maxlength="40"
                           placeholder="Ciudad, Barrio o Aeropuerto"
                           type="text"
                    />
                    {/* Nota: En React real, la lógica de autocompletado requeriría un componente o hook */}
                    <div className="autocomplete-items" id="autocomplete-list"></div>

                    <label><input className="date-input search-input" id="searchBar_dateStart" placeholder="Fecha de Inicio"
                                  type="date" defaultValue="" /> </label>
                    <label><input className="date-input search-input" id="searchBar_dateEnd" placeholder="Fecha de Fin" type="date"
                                  defaultValue="" /></label>
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