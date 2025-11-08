import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '@components/NavigationBar';

const AboutPage = () => {
    return (
        <>
            {/* 1. RENDERIZAR NAV BAR FIJA */}
            <NavigationBar/>

        <div className="content-page-wrapper">
            <div className="content-page-container">

                <h1>Thera: Compartir y Conectar el Futuro de la Movilidad en Argentina</h1>
                <p className="tagline">Somos la primera plataforma argentina de carsharing entre particulares.</p>

                <section className="about-section introduction-section">
                    <h2 className="about-heading">¿Quiénes Somos?</h2>

                    <p>
                        En <strong>Thera</strong>, estamos convencidos de que hay una manera más inteligente, amigable y
                        eficiente
                        de usar los autos en nuestras ciudades. Por eso, hemos creado la primera plataforma argentina de
                        {' '}<em>carsharing</em> o alquiler de vehículos entre particulares: un marketplace seguro y
                        confiable donde
                        los dueños de autos y quienes necesitan moverse se encuentran.
                    </p>
                </section>

                <section className="about-section mission-section">
                    <h2 className="about-heading">Nuestra Misión: Optimizar, Conectar y Liberar Potencial</h2>

                    <div className="mission-grid">
                        <div className="mission-item">
                            <h3 className="mission-title">Optimizar Recursos</h3>
                            <p>Queremos que los miles de autos que pasan la mayor parte del día parados, se conviertan
                                en una
                                fuente de ingresos para sus dueños y en una solución de transporte para la
                                comunidad.</p>
                        </div>
                        <div className="mission-item">
                            <h3 className="mission-title">Impulsar la Economía Colaborativa</h3>
                            <p>Buscamos construir una comunidad basada en la confianza, donde compartir el auto sea una
                                experiencia tan simple, segura y conveniente como comprar online.</p>
                        </div>
                    </div>

                    <div className="values-list">
                        <h3 className="mission-title">Nuestros Valores Centrales</h3>
                        <ol>
                            <li>
                                <strong>Seguridad y Confianza:</strong> Nuestro compromiso es garantizar que cada
                                transacción
                                sea fluida y segura. Por eso, integramos sistemas de verificación y, fundamentalmente,
                                contamos
                                con seguros que cubren cada viaje para que tanto el dueño como el conductor tengan total
                                tranquilidad.
                            </li>
                            <li>
                                <strong>Movilidad Flexible:</strong> Queremos ser la primera opción para quienes
                                necesitan un
                                vehículo por unas horas, un día o una semana, ofreciendo una experiencia de reserva 100%
                                online
                                y sin las largas filas de las agencias.
                            </li>
                            <li>
                                <strong>Impacto Sostenible:</strong> Al fomentar el uso compartido de autos, estamos
                                ayudando a
                                reducir la necesidad de comprar más vehículos, disminuyendo la congestión vehicular y
                                promoviendo un modelo de consumo más responsable.
                            </li>
                        </ol>
                    </div>
                </section>

                <section className="about-section benefits-section">
                    <h2 className="about-heading">¿Qué es Thera y por qué es importante?</h2>

                    <div className="mission-grid">
                        <div className="mission-item">
                            <h3 className="mission-title">Para Dueños de Autos</h3>
                            <p> Si tenés un vehículo que usás solo los fines de semana o por períodos cortos, Thera te
                                permite
                                ponerlo a trabajar. Publicalo, establecé tus tarifas y obtené ingresos extra para
                                compensar
                                los gastos fijos del auto (patente, seguro, service). ¡Es tu auto, tus reglas!
                            </p>
                        </div>

                        <div className="mission-item">
                            <h3 className="mission-title">Para Viajeros y Arrendatarios</h3>
                            <p> Accedé a una variedad de vehículos inigualable, desde un pequeño auto económico para la
                                ciudad hasta una camioneta para un viaje familiar, todo a precios más competitivos y, lo
                                mejor de todo, ¡alquilando directamente de alguien de tu propia comunidad!
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-section cta-section">
                    <p>Thera es la llave para un futuro de movilidad donde el auto que está estacionado en tu garaje
                        puede ayudarte a pagar la cuota, y el auto que necesitás para ese fin de semana está a solo un
                        clic.
                    </p>
                </section>
            </div>
        </div>
        </>
    );
};

export default AboutPage;