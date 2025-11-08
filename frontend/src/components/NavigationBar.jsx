import React from 'react';
import {Link} from 'react-router-dom';
import offsetLogo from '../../public/offset-logo.png'; // Usando alias

const NavigationBar = () => {
    return (
        <nav id="navigationBar">
            <div className="nav-logo">
                <Link to="/">
                    <img alt="Offset Thera Logo" className="navLogo-img" src={offsetLogo}/>
                </Link>
            </div>

            {/* Este formulario de búsqueda solo aparece en car-search.html, lo omitimos aquí por ahora para simplificar el layout global */}

            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/faq.html">Preguntas Frecuentes</Link></li>
                <li><Link to="/account.html">Cuenta</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;