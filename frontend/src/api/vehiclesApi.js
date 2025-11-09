import db from '@data/db.json';

// 1. IMPORTACIÓN DE IMÁGENES COMO MÓDULOS JS

import jeepCherokeeImg from '@assets/Jeep/Jeep Cherokee (1).jpg';
import vwTaosImg from '@assets/VW Taos/Taos (1).jpg';
import audiRS3Img from '@assets/Audi/RS3 (1).jpg';
import fordRaptorImg from '@assets/Ford/Raptor (1).jpg';
import fiatCronosImg from '@assets/Fiat/Cronos (1).jpg';
import fordEcosportImg from '@assets/Ford/Ecosport (1).jpg';
import toyotaYarisImg from '@assets/Toyota/Yaris (1).jpg';


// 2. Mapeo de Rutas Estáticas (del db.json) a Rutas Procesadas (Módulos JS)
const IMAGE_MAP = {

    "/assets/Jeep/Jeep Cherokee (1).jpg": jeepCherokeeImg,
    "/assets/VW Taos/Taos (1).jpg": vwTaosImg,
    "/assets/Audi/RS3 (1).jpg": audiRS3Img,
    "/assets/Ford/Raptor (1).jpg": fordRaptorImg,
    "/assets/Fiat/Cronos (1).jpg": fiatCronosImg,
    "/assets/Ford/Ecosport (1).jpg": fordEcosportImg,
    "/assets/Toyota/Yaris (1).jpg": toyotaYarisImg,
};

// 3. Crear el Array Final de Vehículos con Rutas Resueltas
// Iteramos sobre la data del JSON y reemplazamos la ruta estática por la importada.
const MOCK_VEHICLES_DATA = db.vehiculos.map(car => ({
    ...car,
    // Reemplaza la ruta estática del JSON con el módulo JS importado
    imageUrl: IMAGE_MAP[car.imageUrl] || car.imageUrl
}));

/**
 * Simula una llamada GET para obtener todos los vehículos.
 */
export async function getAllVehicles() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Mock API: Vehículos obtenidos del db.json.");
            resolve(MOCK_VEHICLES_DATA); // Usamos el dato con rutas resueltas
        }, 500);
    });
}

/**
 * Simula una llamada POST para añadir un nuevo vehículo.
 */
export async function addVehicle(newCarData) {
    return new Promise(resolve => {
        setTimeout(() => {
            const newId = MOCK_VEHICLES_DATA.length + 1;
            const newVehicle = {...newCarData, id: newId};
            MOCK_VEHICLES_DATA.push(newVehicle);
            console.log("Mock API: Vehículo añadido:", newVehicle);
            resolve(newVehicle);
        }, 500);
    });
}

// EXPORTACIÓN DE DATA (Para HomePage y CarCard)
export const MOCK_VEHICLES = MOCK_VEHICLES_DATA;

/**
 * Función de utilidad para ordenar vehículos.
 */
export const sortVehicles = (carList, sortValue) => {
    return carList.sort((a, b) => {
        if (sortValue === 'price-asc') return a.price - b.price;
        if (sortValue === 'price-desc') return b.price - a.price;
        if (sortValue === 'rating') return b.rating - a.rating;
        if (sortValue === 'distance') return a.distance - b.distance;
        return 0;
    });
};