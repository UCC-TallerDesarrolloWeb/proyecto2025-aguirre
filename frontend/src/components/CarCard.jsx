import React from 'react';
import Button from '@components/Button';

const CarCard = ({car, isCompact = false}) => {
    // Lógica de formato, adaptada de utils.js
    const formatPrice = (price) => price.toLocaleString('es-AR');

    const getSpecsHTML = (specs) => {
        // En React, el HTML se inserta con dangerouslySetInnerHTML o se parsea
        // Aquí lo simplificamos a texto plano para evitar complejidades.
        return specs.replace(/ \| /g, ', ');
    };

    return (
        <div className={isCompact ? "carCard" : "search-car-card"}
             data-distance={car.distance}
             data-features={car.features.join(' ')}
             data-price={car.price}
             data-rating={car.rating}
             data-type={car.type}>

            <img alt={`Miniatura del auto: ${car.title}`} className={isCompact ? "card-image" : "card-thumbnail"}
                 src={car.imageUrl}/>

            {isCompact ? (
                // Versión para el carrusel (index.html)
                <div className="card-content">
                    <h3 className="card-title">{car.title}</h3>
                    <p className="card-details">⭐ {car.rating} ({car.reviews} reviews)</p>
                    <p className="card-price">${formatPrice(car.price)}/Día</p>
                </div>
            ) : (
                // Versión para los resultados de búsqueda (car-search.html)
                <>
                    <div className="card-details">
                        <h3 className="car-title">{car.title}</h3>
                        <p className="car-specs">{getSpecsHTML(car.specs)}</p>
                        <p className="car-location">📍 {car.location}</p>
                    </div>
                    <div className="card-price-info">
                        <span className="daily-price">${formatPrice(car.price)}</span> / día
                        <p className="car-rating">⭐ <span
                            className="rating-value">{car.rating}</span> ({car.reviews} reviews)</p>
                        <Button className="reserve-btn"
                                onClick={() => alert("La función de Reserva se implementará pronto.")}>
                            Reservar
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CarCard;