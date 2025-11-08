import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <section className="footer">
            <footer className="main-footer">
                <div className="footer-container">
                    <div className="footer-col brand-info">
                        <h3 className="footer-logo">T H E R A</h3>
                        <p className="tagline">La libertad de andar en auto sin tenerlo.</p>
                        <p className="copyright">© 2025 Thera. Todos los derechos reservados.</p>
                    </div>

                    <div className="footer-col quick-links">
                        <h4>Navegación</h4>
                        <Link to="/">Inicio</Link>
                        <Link to="/car-search.html">Alquilar un Auto</Link>
                        <Link to="/faq.html">Preguntas Frecuentes</Link>
                    </div>

                    <div className="footer-col legal-support">
                        <h4>Soporte</h4>
                        <Link to="/account.html">Mi Cuenta</Link>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Footer;