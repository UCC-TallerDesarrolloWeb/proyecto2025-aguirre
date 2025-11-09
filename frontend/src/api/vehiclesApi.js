// Import imagenes vehiculos
import jeepCherokeeImg from '@assets/Jeep/Jeep Cherokee (1).jpg';
import vwTaosImg from '@assets/VW Taos/Taos (1).jpg';
import audiRS3Img from '@assets/Audi/RS3 (1).jpg';
import fordF150RaptorImg from '@assets/Ford/Raptor (1).jpg';
import fiatCronosImg from '@assets/Fiat/Cronos (1).jpg';
import fordEcosportImg from '@assets/Ford/Ecosport (1).jpg';
import toyotaYarisImg from '@assets/Toyota/Yaris (1).jpg';

// Mock de la data de utils.js
export const MOCK_VEHICLES = [
    {
        title: "Jeep Cherokee 2020",
        type: "suv",
        price: 18000,
        rating: 4.8,
        reviews: 20,
        distance: 5.2,
        location: "Palermo, CABA",
        specs: "Automático | 5 Asientos | Aire Acondicionado",
        features: ["auto", "ac"],
        imageUrl: jeepCherokeeImg,
        id: 1
    },
    {
        title: "VW Taos 2023",
        type: "suv",
        price: 11500,
        rating: 4.5,
        reviews: 12,
        distance: 2.1,
        location: "Villa Crespo, CABA",
        specs: "Automático | 5 Asientos | GPS",
        features: ["auto", "gps"],
        imageUrl: vwTaosImg,
        id: 2
    },
    {
        title: "Audi RS3 Sedan 2023",
        type: "sedan",
        price: 18000,
        rating: 4.5,
        reviews: 15,
        distance: 5.2,
        location: "Palermo, CABA",
        specs: "Automático | 4 Asientos | Aire Acondicionado",
        features: ["auto", "ac"],
        imageUrl: audiRS3Img,
        id: 3
    },
    {
        title: "Ford F-150 Raptor",
        type: "suv",
        price: 25000,
        rating: 4.8,
        reviews: 35,
        distance: 1.5,
        location: "Cordoba, Cordoba",
        specs: "Automático | 5 Asientos | Aire Acondicionado | GPS",
        features: ["auto", "ac", "gps"],
        imageUrl: fordF150RaptorImg,
        id: 4
    },
    {
        title: "Fiat Cronos 2022",
        type: "sedan",
        price: 9000,
        rating: 4.1,
        reviews: 50,
        distance: 3.5,
        location: "Almagro, CABA",
        specs: "Manual | 5 Asientos | Aire Acondicionado",
        features: ["ac"],
        imageUrl: fiatCronosImg,
        id: 5
    },
    {
        title: "Ford Ecosport 2019",
        type: "suv",
        price: 10000,
        rating: 4.0,
        reviews: 28,
        distance: 7.8,
        location: "Cordoba, Cordoba",
        specs: "Manual | 5 Asientos | Aire Acondicionado",
        features: ["ac"],
        imageUrl: fordEcosportImg,
        id: 6
    },
    {
        title: "Toyota GR Yaris 2024",
        type: "hatchback",
        price: 12500,
        rating: 4.7,
        reviews: 10,
        distance: 1.1,
        location: "Belgrano, CABA",
        specs: "Manual | 2 Asientos | Aire Acondicionado",
        features: ["ac"],
        imageUrl: toyotaYarisImg,
        id: 7
    }
];

/** Requisito: Usar fetch y async/await (mock GET/READ) */
export async function getAllVehicles() {
    // Simulación de fetch
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Mock API: Vehículos obtenidos.");
            resolve(MOCK_VEHICLES);
        }, 500);
    });
}

/** Requisito: mock POST/ADD */
export async function addVehicle(newCarData) {
    return new Promise(resolve => {
        setTimeout(() => {
            const newId = MOCK_VEHICLES.length + 1;
            const newVehicle = {...newCarData, id: newId};
            MOCK_VEHICLES.push(newVehicle);
            console.log("Mock API: Vehículo añadido:", newVehicle);
            resolve(newVehicle);
        }, 500);
    });
}

// Función de utilidad para filtrar/ordenar que será usada en CarSearchPage
export const sortVehicles = (carList, sortValue) => {
    return carList.sort((a, b) => {
        if (sortValue === 'price-asc') return a.price - b.price;
        if (sortValue === 'price-desc') return b.price - a.price;
        if (sortValue === 'rating') return b.rating - a.rating;
        if (sortValue === 'distance') return a.distance - b.distance;
        return 0;
    });
};