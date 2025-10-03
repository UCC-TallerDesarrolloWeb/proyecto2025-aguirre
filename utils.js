// 1. CONSTANTE DE VEHÍCULOS (Datos)
const vehiculos = [
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
        imageUrl: "images/Jeep/Jeep%20Cherokee%20(1).jpg"
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
        imageUrl: "images/VW%20Taos/Taos%20(1).jpg"
    },
    {
        title: "Audi A3 Sedan",
        type: "sedan",
        price: 18000,
        rating: 4.5,
        reviews: 15,
        distance: 5.2,
        location: "Palermo, CABA",
        specs: "Automático | 4 Asientos | Aire Acondicionado",
        features: ["auto", "ac"],
        imageUrl: ""
    },
    {
        title: "Renault Kwid 2021",
        type: "hatchback",
        price: 8500,
        rating: 4.2,
        reviews: 35,
        distance: 1.5,
        location: "Microcentro, CABA",
        specs: "Manual | 4 Asientos | Aire Acondicionado",
        features: ["ac"],
        imageUrl: ""
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
        imageUrl: ""
    },
    
    {
        title: "Ford Ecosport 2019",
        type: "suv",
        price: 10000,
        rating: 4.0,
        reviews: 28,
        distance: 7.8,
        location: "Belgrano, CABA",
        specs: "Manual | 5 Asientos | Aire Acondicionado",
        features: ["ac"],
        imageUrl: ""
    },
    {
        title: "Toyota Yaris 2024",
        type: "hatchback",
        price: 12500,
        rating: 4.7,
        reviews: 10,
        distance: 1.1,
        location: "Villa Urquiza, CABA",
        specs: "Automático | 5 Asientos | Aire Acondicionado",
        features: ["auto", "ac"],
        imageUrl: ""
    }
];

// 2. FUNCIÓN PARA GENERAR EL HTML DE UNA TARJETA
const createCarCardHTML = (car) => {
    const dataFeatures = car.features.join(' ');
    const formatPrice = (price) => price.toLocaleString('es-AR');

    // Mapeo de texto a clases para los specs
    const getSpecsHTML = (specs) => {
        let html = specs.replace(/Automático/g, '<span class="spec-auto">Automático</span>');
        html = html.replace(/Aire Acondicionado/g, '<span class="spec-ac">Aire Acondicionado</span>');
        html = html.replace(/GPS/g, '<span class="spec-gps">GPS</span>');
        return html;
    };

    return `
        <div class="search-car-card"
             data-distance="${car.distance}"
             data-features="${dataFeatures}"
             data-price="${car.price}"
             data-rating="${car.rating}"
             data-type="${car.type}">

            <img alt="Miniatura del auto: ${car.title}" class="card-thumbnail" src="${car.imageUrl || 'images/default-car.jpg'}">

            <div class="card-details">
                <h3 class="car-title">${car.title}</h3>
                <p class="car-specs">
                    ${getSpecsHTML(car.specs)}
                </p>
                <p class="car-location">📍 ${car.location}</p>
            </div>

            <div class="card-price-info">
                <span class="daily-price">$${formatPrice(car.price)}</span> / día
                <p class="car-rating">⭐ <span class="rating-value">${car.rating}</span> (${car.reviews} reviews)</p>
                <button class="reserve-btn">Reservar</button>
            </div>
        </div>
    `;
};

// 3. FUNCIÓN PRINCIPAL PARA CARGAR TODOS LOS VEHÍCULOS
const renderCars = (carList) => {
    const resultsList = document.querySelector('.results-list');
    if (!resultsList) return;

    resultsList.innerHTML = '';

    // Si no hay coches, muestra un mensaje
    if (carList.length === 0) {
        resultsList.innerHTML = '<p style="padding: 20px; text-align: center;">No se encontraron autos con los filtros seleccionados.</p>';
        return;
    }

    const allCarsHTML = carList.map(createCarCardHTML).join('');
    resultsList.innerHTML = allCarsHTML;
};


// ===============================================
// 4. LÓGICA DE CONTROL (Dentro de DOMContentLoaded)
// ===============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias del DOM (Seguro que existen aquí) ---
    const toggleSortBtn = document.getElementById('toggleSort');
    const sortPanel = document.getElementById('sort-panel');
    const toggleFiltersBtn = document.getElementById('toggleFilters');
    const filtersPanel = document.getElementById('filters-panel');
    const applySortBtn = document.querySelector('.apply-sort-btn');
    const sortBySelect = document.getElementById('sort-by');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const priceRangeInput = document.getElementById('price-range');
    const currentPriceSpan = document.getElementById('current-price');
    const clearFiltersBtn = document.createElement('button');

    // Salir si faltan elementos cruciales
    if (!filtersPanel || !sortPanel) return;


    /**
     * Alterna la visibilidad de los paneles de filtro/ordenamiento.
     */
    const togglePanel = (panel) => {
        // Cierra el otro panel si está abierto
        const otherPanel = (panel === sortPanel) ? filtersPanel : sortPanel;
        if (!otherPanel.classList.contains('hidden')) {
            otherPanel.classList.add('hidden');
        }

        // Alterna la visibilidad del panel actual
        panel.classList.toggle('hidden');
    };


    // --- Lógica de Ordenamiento ---
    const applySort = () => {
        const sortValue = sortBySelect.value;
        let sortedVehicles = [...vehiculos]; // Copia el array original

        sortedVehicles.sort((a, b) => {
            if (sortValue === 'price-asc') {
                return a.price - b.price;
            } else if (sortValue === 'price-desc') {
                return b.price - a.price;
            } else if (sortValue === 'rating') {
                return b.rating - a.rating;
            } else if (sortValue === 'distance') {
                return a.distance - b.distance;
            }
            return 0;
        });

        renderCars(sortedVehicles);
        sortPanel.classList.add('hidden');
    };


    // --- Lógica de Filtrado ---
    const applyFilters = () => {
        // 1. Obtener filtros de Tipo de Vehículo
        // Se buscan todos los checkboxes de tipo (sedan, suv, hatchback) que estén marcados
        const typeCheckboxes = filtersPanel.querySelectorAll('input[name="type"]:checked, input[name="hatchback"]:checked');
        const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);

        // 2. Obtener filtro de Precio Máximo
        const maxPrice = parseInt(priceRangeInput.value, 10);

        // 3. Obtener filtros de Características
        const featureCheckboxes = filtersPanel.querySelectorAll('input[name="feature"]:checked');
        const requiredFeatures = Array.from(featureCheckboxes).map(cb => cb.value);

        // Aplicar los filtros
        const filteredVehicles = vehiculos.filter(car => {
            // Filtro 1: Tipo de Vehículo (Si no se selecciona ninguno, pasa todos)
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(car.type);
            if (!typeMatch) return false;

            // Filtro 2: Precio Máximo
            const priceMatch = car.price <= maxPrice;
            if (!priceMatch) return false;

            // Filtro 3: Características (el coche debe tener TODAS las características)
            const featuresMatch = requiredFeatures.every(feature => car.features.includes(feature));
            if (!featuresMatch) return false;

            return true;
        });

        renderCars(filteredVehicles);
        filtersPanel.classList.add('hidden');
    };

    // --- Lógica de Limpiar Filtros ---
    const clearFilters = () => {
        // 1. Limpiar checkboxes
        filtersPanel.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // 2. Restablecer el rango de precio al máximo (y actualizar el texto)
        const maxVal = parseInt(priceRangeInput.max, 10);
        priceRangeInput.value = maxVal;
        currentPriceSpan.textContent = maxVal.toLocaleString('es-AR');

        // 3. Renderizar todos los vehículos originales
        renderCars(vehiculos);
    };


    // ===============================================
    // 5. ASIGNACIÓN DE EVENT LISTENERS
    // ===============================================

    // 1. Carga inicial
    renderCars(vehiculos);

    // 2. Desplegables (Toggle)
    toggleSortBtn.addEventListener('click', () => togglePanel(sortPanel));
    toggleFiltersBtn.addEventListener('click', () => togglePanel(filtersPanel));

    // 3. Aplicar
    applySortBtn.addEventListener('click', applySort);
    applyFiltersBtn.addEventListener('click', applyFilters);

    // 4. Rango de precio (input en vivo)
    priceRangeInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        currentPriceSpan.textContent = value.toLocaleString('es-AR');
    });

    // 5. Botón de Limpiar Filtros (Creación e Inserción)
    clearFiltersBtn.textContent = 'Limpiar Filtros';
    clearFiltersBtn.classList.add('apply-filters-btn', 'clear-filters-btn');

    // Buscamos el último grupo de filtros para insertar el botón de limpiar después
    const lastFilterGroup = filtersPanel.querySelector('.filter-group:last-of-type');
    if (lastFilterGroup) {
        lastFilterGroup.insertAdjacentElement('afterend', clearFiltersBtn);
    } else {
        // En caso de que la estructura cambie, lo ponemos al final del panel
        filtersPanel.appendChild(clearFiltersBtn);
    }

    clearFiltersBtn.addEventListener('click', clearFilters);
});