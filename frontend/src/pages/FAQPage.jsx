import React from 'react';

const FAQPage = () => {
    return (
        <div className="content-page-wrapper">
            <div className="content-page-container">

                <h1>Preguntas Frecuentes</h1>
                <p className="tagline">Encuentra respuestas a las dudas más comunes sobre el alquiler de vehículos.</p>

                <div className="faq-container">

                    {/* Pregunta 1: Requisitos */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq1" name="faq1" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq1">¿Cuales son los requisitos para alquilar un
                            auto?</label>
                        <div className="faq-answer">
                            <p>¡Es muy sencillo! Solo tienes que ser mayor de 18 años, tener una licencia de conducir
                                vigente y una tarjeta de crédito a tu nombre.</p>
                        </div>
                    </div>

                    {/* Pregunta 2: Tarjeta de Débito */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq2" name="faq2" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq2">¿Puedo usar mi tarjeta de débito para
                            pagar?</label>
                        <div className="faq-answer">
                            <p>¡Sí! El alquiler del vehículo puedes pagarlo con tarjeta de débito o crédito. Sin
                                embargo, ten en cuenta que el depósito de seguridad sí requiere una tarjeta de
                                crédito.</p>
                        </div>
                    </div>

                    {/* Pregunta 3: Límite de Kilómetros */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq3" name="faq3" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq3">¿Existe algún límite de kilómetros?</label>
                        <div className="faq-answer">
                            <p>¡Depende del dueño del vehículo! Muchos propietarios ofrecen kilometraje ilimitado en sus
                                anuncios. Para estar completamente seguro, te recomendamos revisar los términos de cada
                                publicación antes de reservar.</p>
                        </div>
                    </div>

                    {/* Pregunta 4: Cargo Extra por Edad (Menor de 25) */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq4" name="faq4" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq4">Tengo menos de 25 años, ¿hay algún cargo extra
                            por eso?</label>
                        <div className="faq-answer">
                            <p>Sí, aplicamos una tarifa adicional para conductores entre 18 y 24 años. Estadísticamente,
                                este grupo es más propenso a sufrir accidentes. Esta tarifa no es reembolsable y los
                                detalles son:</p>
                            <ul>
                                <li>Entre 18 y 21 años: un extra de $10.000/Día.</li>
                                <li>Entre 22 y 24 años: un extra de $5.000/Día.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Pregunta 5: Depósito de Seguridad */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq5" name="faq5" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq5">¿Cómo funciona el depósito de seguridad?</label>
                        <div className="faq-answer">
                            <p>Al retirar el vehículo, retenemos un monto en tu tarjeta de crédito. No te preocupes,
                                este depósito se liberará automáticamente (generalmente entre 5 y 10 días hábiles) una
                                vez que devuelvas el auto en las mismas buenas condiciones.</p>
                        </div>
                    </div>

                    {/* Pregunta 6: Conductor Adicional */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq7" name="faq7" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq7">¿Puedo añadir un conductor adicional?</label>
                        <div className="faq-answer">
                            <p>¡Absolutamente! Puedes añadir conductores adicionales antes de que inicies tu reserva.
                                Ten en cuenta que, una vez que el viaje ha comenzado, ya no podrás hacerlo. Recuerda que
                                el conductor extra debe presentar su licencia y, si es menor de 25 años, se podría
                                aplicar una tarifa diaria.</p>
                        </div>
                    </div>

                    {/* Pregunta 7: Cancelación */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq8" name="faq8" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq8">¿Qué pasa si tengo que cancelar mi
                            reserva?</label>
                        <div className="faq-answer">
                            <p>Nuestra política de cancelación es muy flexible: puedes cancelar gratis hasta 48 horas
                                antes de la hora de recogida. Si la cancelación se realiza después de ese plazo, podría
                                aplicarse una penalización o retención de la tarifa.</p>
                        </div>
                    </div>

                    {/* Pregunta 8: Seguro */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq9" name="faq9" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq9">¿El precio del alquiler ya incluye el
                            seguro?</label>
                        <div className="faq-answer">
                            <p>¡Sí! Todas nuestras tarifas ya incluyen un seguro básico obligatorio. Además, durante la
                                reserva, tienes la opción de agregar coberturas extras (como exención de daños por
                                colisión y protección contra robo) para reducir tu responsabilidad.</p>
                        </div>
                    </div>

                    {/* Pregunta 9: Avería/Accidente */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq10" name="faq10" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq10">Tuve un problema con el auto (avería o
                            accidente), ¿qué hago?</label>
                        <div className="faq-answer">
                            <p>¡Lamentamos el inconveniente! Llámanos inmediatamente a nuestro servicio de asistencia en
                                carretera 24/7. El número de emergencia lo encontrarás en tu contrato de alquiler y
                                también en nuestra página web. ¡Estamos aquí para ayudarte!</p>
                        </div>
                    </div>

                    {/* Pregunta 10: Retraso en la Recogida */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq11" name="faq11" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq11">¿Qué sucede si me retraso un poco para recoger
                            el auto?</label>
                        <div className="faq-answer">
                            <p>Entendemos que los imprevistos suceden. Solemos ofrecer un período de gracia (normalmente
                                entre 1 y 2 horas). Si sabes que llegarás tarde, ¡es crucial que nos llames! Si no
                                avisas y te demoras demasiado, podríamos tener que marcar tu reserva como "no show" y el
                                vehículo podría ser alquilado a otra persona.</p>
                        </div>
                    </div>

                    {/* Pregunta 11: Multas */}
                    <div className="faq-item">
                        <input className="faq-toggle" id="faq12" name="faq12" type="checkbox"/>
                        <label className="faq-question" htmlFor="faq12">¿Qué debo hacer si recibo una multa de tráfico o
                            peaje durante el alquiler?</label>
                        <div className="faq-answer">
                            <p>Como conductor, tú eres responsable de todas las multas y peajes. El dueño del auto
                                recibirá la notificación y luego te la facturará, a menudo con una pequeña tasa
                                administrativa por la gestión.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FAQPage;