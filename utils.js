// Constante: La matriz de vehículos
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
        imageUrl: "Imagenes/Jeep/Jeep%20Cherokee%20(1).jpg"
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
        imageUrl: "Imagenes/VW%20Taos/Taos%20(1).jpg"
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
        features: ["auto", "ac"], imageUrl: "Imagenes/Audi/RS3 (1).jpg"
    },
    {
        title: "Ford F-150 Raptor",
        type: "suv",
        price: 25000,
        rating: 4.8,
        reviews: 35,
        distance: 1.5,
        location: "Cordoba, Cordoba",
        specs: "Automático | 5 Asientos | Aire Acondicionado",
        features: ["auto", "ac", "gps"],
        imageUrl: "Imagenes/Ford/Raptor (1).jpg"
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
        features: ["ac"], imageUrl: "Imagenes/Fiat/Cronos (1).jpg"
    },

    {
        title: "Ford Ecosport 2019",
        type: "suv",
        price: 10000,
        rating: 4.0,
        reviews: 28,
        distance: 7.8, location: "Cordoba, Cordoba",
        specs: "Manual | 5 Asientos | Aire Acondicionado",
        features: ["ac"], imageUrl: "Imagenes/Ford/Ecosport (1).jpg"
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
        imageUrl: "Imagenes/Toyota/Yaris (1).jpg"
    }
];

/**
 * Descripción: Genera la estructura HTML para una tarjeta de vehículo.
 * @method createCarCardHTML
 * @param {object} car - Objeto con los datos detallados del vehículo.
 * @return {string} El fragmento HTML completo para la tarjeta del vehículo.
 */
const createCarCardHTML = (car) => {
    const dataFeatures = car.features.join(' ');
    const formatPrice = (price) => price.toLocaleString('es-AR');

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
            <img alt="Miniatura del auto: ${car.title}" class="card-thumbnail" src="${car.imageUrl || 'Imagenes/default-car.jpg'}">
            <div class="card-details">
                <h3 class="car-title">${car.title}</h3>
                <p class="car-specs">${getSpecsHTML(car.specs)}</p>
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

/**
 * Descripción: Renderiza la lista completa de vehículos dentro del contenedor '.results-list'.
 * Si la lista está vacía, muestra un mensaje inteligente basado en los filtros.
 * @method renderCars
 * @param {Array<object>} carList - Lista de objetos de vehículos a mostrar en la interfaz.
 * @param {string} [locationQuery] - (Opcional) El término de búsqueda de ubicación que se utilizó.
 * @return {void}
 */
const renderCars = (carList, locationQuery = '') => {
    const resultsList = document.querySelector('.results-list');
    if (!resultsList) return;

    resultsList.innerHTML = '';

    if (carList.length === 0) {
        const query = locationQuery.trim();

        // Comprobamos si el motivo de 0 resultados fue una búsqueda por ubicación
        if (query.length > 0) {

            // ANÁLISIS ADICIONAL: Verificamos si la ubicación SÍ existe en nuestra
            // base de datos, pero los *otros filtros* (precio, tipo) fallaron.
            const locationExistsInDB = vehiculos.some(car => car.location.toLowerCase().includes(query.toLowerCase()));

            if (locationExistsInDB) {
                // La ubicación existe, pero los filtros (precio, tipo, etc.) no coincidieron
                resultsList.innerHTML = `<p class="no-results-message">No se encontraron autos con los filtros seleccionados en "${locationQuery}"</p>`;
            } else {
                // La ubicación NO existe en nuestra base de datos.
                resultsList.innerHTML = `<p class="no-results-message">No hay autos listados en la localidad "${locationQuery}"</p>`;
            }

        } else {
            // Mensaje genérico si no se buscó por ubicación (ej: solo se filtró por precio/tipo y no hubo match)
            resultsList.innerHTML = '<p class="no-results-message">No se encontraron autos con los filtros seleccionados</p>';
        }
        return;
    }

    const allCarsHTML = carList.map(createCarCardHTML).join('');
    resultsList.innerHTML = allCarsHTML;
};

// =========================================================
// Lógica de la interfaz de Login/Registro (Llamadas desde HTML)
// =========================================================

/**
 * Descripción: Alterna la visibilidad entre el panel de Login y el de Registro.
 * También limpia los mensajes de estado de los formularios.
 * @method showPanel
 * @param {string} panelId - El ID del panel a mostrar ('login-panel' o 'register-panel').
 * @return {void}
 */
const showPanel = (panelId) => {
    const loginPanel = document.getElementById('login-panel');
    const registerPanel = document.getElementById('register-panel');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');

    // Alternar visibilidad de formularios
    if (loginPanel) loginPanel.classList.toggle('hidden-form', panelId !== 'login-panel');
    if (registerPanel) registerPanel.classList.toggle('hidden-form', panelId !== 'register-panel');

    // Alternar clases activas de los botones
    if (tabLogin) tabLogin.classList.toggle('active', panelId === 'login-panel');
    if (tabRegister) tabRegister.classList.toggle('active', panelId === 'register-panel');

    // Limpiar mensajes al cambiar de pestaña
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');
    if (loginMessage) loginMessage.textContent = '';
    if (registerMessage) registerMessage.textContent = '';
};


/**
 * Descripción: Maneja el envío del formulario de Registro, valida contraseñas,
 * verifica existencia de usuario y guarda la información en localStorage.
 * @method handleRegister
 * @param {Event} event - El objeto de evento de envío del formulario (para prevenir el default).
 * @return {void}
 */
const handleRegister = (event) => {
    event.preventDefault();

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.toLowerCase().trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const messageElement = document.getElementById('register-message');

    messageElement.style.color = 'red';
    messageElement.textContent = '';

    if (password !== confirmPassword) {
        messageElement.textContent = "Error: Las contraseñas no coinciden.";
        return;
    }

    // 1. Verificar si el email ya está registrado
    const storedUsers = JSON.parse(localStorage.getItem('theraUsers')) || {};
    if (storedUsers[email]) {
        messageElement.textContent = "Error: Este correo electrónico ya está registrado.";
        return;
    }

    // 2. Crear y guardar el nuevo usuario
    storedUsers[email] = {name, password};
    localStorage.setItem('theraUsers', JSON.stringify(storedUsers));

    // 3. Mostrar éxito y redirigir
    console.log('Registro exitoso:', email);
    messageElement.style.color = 'green';
    messageElement.textContent = `¡Registro exitoso para ${name}! Redireccionando...`;

    event.target.reset(); // Limpiar formulario (blanqueo de contenido)
    setTimeout(() => showPanel('login-panel'), 2000);
};


/**
 * Descripción: Maneja el envío del formulario de Inicio de Sesión.
 * Comprueba si la cuenta existe en localStorage y si la contraseña es correcta.
 * @method handleLogin
 * @param {Event} event - El objeto de evento de envío del formulario (para prevenir el default).
 * @return {void}
 */
const handleLogin = (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.toLowerCase().trim();
    const password = document.getElementById('login-password').value;
    const messageElement = document.getElementById('login-message');

    messageElement.style.color = 'red';
    messageElement.textContent = '';

    const storedUsers = JSON.parse(localStorage.getItem('theraUsers')) || {};
    const user = storedUsers[email];

    // 1. Comprobar si existe la cuenta
    if (!user) {
        messageElement.textContent = "Error: No se encontró una cuenta con ese correo electrónico. Por favor, regístrese.";
        return;
    }

    // 2. Comprobar si la contraseña es correcta
    if (user.password === password) {
        // Login Exitoso
        messageElement.style.color = 'green';
        messageElement.textContent = `¡Bienvenido de vuelta, ${user.name}! Ingreso exitoso.`;
    } else {
        // Contraseña Incorrecta
        messageElement.textContent = "Error: Contraseña incorrecta.";
    }
};


// =========================================================
// Lógica de Búsqueda, Filtros y Orden (Ejecutada al cargar el DOM)
// =========================================================

/**
 * Descripción: Inicializa el script cuando el documento HTML ha sido completamente cargado
 * y define toda la lógica de filtros, ordenamiento y carga inicial de la página.
 * @method anonymous
 * @return {void}
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Variables de Estado y Referencias del DOM ---
    let filteredVehiclesState = [...vehiculos];
    let currentSortValue = 'none';

    // ... (Definiciones de constantes DOM)
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
    const resultsList = document.querySelector('.results-list');
    const searchForm = document.querySelector('.compact-search-form');
    const locationSearchInput = document.querySelector('.compact-search-form .location-input');
    const resultsTitleH1 = document.querySelector('.car-list-column h1');
    const defaultResultsTitle = resultsTitleH1 ? resultsTitleH1.textContent : "Autos disponibles";

    // Si no estamos en car-search.html, solo inicializa la vista de account.html si existe
    if (!filtersPanel || !sortPanel) {
        if (document.getElementById('login-panel')) {
            showPanel('login-panel');
        }
        return;
    }

    /**
     * Descripción: Alterna la clase 'hidden' para mostrar u ocultar un panel.
     * Cierra el panel opuesto si estuviera abierto.
     * @method togglePanel
     * @param {HTMLElement} panel - El panel DOM (filters-panel o sort-panel) a alternar.
     * @return {void}
     */
    const togglePanel = (panel) => {
        const otherPanel = (panel === sortPanel) ? filtersPanel : sortPanel;
        if (!otherPanel.classList.contains('hidden')) {
            otherPanel.classList.add('hidden');
        }
        panel.classList.toggle('hidden');
    };

    /**
     * Descripción: Aplica el ordenamiento al array de vehículos proporcionado según el valor de ordenamiento.
     * @method sortVehicles
     * @param {Array<object>} carList - Array de vehículos a ordenar.
     * @param {string} sortValue - El criterio de ordenamiento ('price-asc', 'price-desc', 'rating', 'distance').
     * @return {Array<object>} La lista de vehículos ordenada.
     */
    const sortVehicles = (carList, sortValue) => {
        return carList.sort((a, b) => {
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
    };

    /**
     * Descripción: Aplica el ordenamiento seleccionado al estado actual de vehículos filtrados y renderiza la lista.
     * @method applySort
     * @return {void}
     */
    const applySort = () => {
        currentSortValue = sortBySelect.value;
        let sortedVehicles = [...filteredVehiclesState];
        sortedVehicles = sortVehicles(sortedVehicles, currentSortValue);
        renderCars(sortedVehicles);
        sortPanel.classList.add('hidden');
    };

    /**
     * Descripción: Actualiza el texto junto al slider de precio con el valor actual del input.
     * Cumple con el requisito de cálculo/muestra de un input.
     * @method updatePriceDisplay
     * @return {void}
     */
    const updatePriceDisplay = () => {
        if (priceRangeInput && currentPriceSpan) {
            // Formatea el valor con separadores de miles
            currentPriceSpan.textContent = parseInt(priceRangeInput.value).toLocaleString('es-AR');
        }
    };

    /**
     * Descripción: Actualiza el H1 de la lista de resultados con la ubicación buscada.
     * Si no hay ubicación, restaura el título por defecto.
     * @method updateResultsTitle
     * @param {string} locationName - El nombre de la localidad a mostrar.
     * @return {void}
     */
    const updateResultsTitle = (locationName) => {
        if (!resultsTitleH1) return; // Salida segura si el H1 no existe

        if (locationName && locationName.trim().length > 0) {
            // Capitalizamos la primera letra para que se vea mejor
            const formattedName = locationName.charAt(0).toUpperCase() + locationName.slice(1).toLowerCase();
            resultsTitleH1.textContent = `Autos disponibles en ${formattedName}`;
        } else {
            // Si la búsqueda está vacía, restauramos el título original
            resultsTitleH1.textContent = defaultResultsTitle;
        }
    };

    /**
     * Descripción: Lee el parámetro 'location' de la URL al cargar la página.
     * Si existe, lo inserta en el input de búsqueda y aplica los filtros iniciales.
     * @method initializeSearchFromUrl
     * @return {void}
     */
    const initializeSearchFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const locationParam = params.get('location');

        if (locationParam && locationSearchInput) {
            locationSearchInput.value = locationParam;
            applyFilters();
        } else {
            updateResultsTitle('');
            renderCars(vehiculos);
        }
    };

    /**
     * Descripción: Recoge todos los filtros del DOM (ubicación, tipo, precio, características)
     * los aplica al array original de vehículos, actualiza el estado y vuelve a renderizar la lista.
     * @method applyFilters
     * @return {void}
     */
    const applyFilters = () => {
        const searchLocationTerm = locationSearchInput.value; // <-- Obtenemos el valor original (con mayúsculas) para mostrarlo
        const normalizedLocation = searchLocationTerm.toLowerCase().trim();

        updateResultsTitle(searchLocationTerm);

        const typeCheckboxes = filtersPanel.querySelectorAll('input[name="type"]:checked, input[name="hatchback"]:checked');
        const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);
        const maxPrice = parseInt(priceRangeInput.value, 10);
        const featureCheckboxes = filtersPanel.querySelectorAll('input[name="feature"]:checked');
        const requiredFeatures = Array.from(featureCheckboxes).map(cb => cb.value);

        const newlyFilteredVehicles = vehiculos.filter(car => {
            // Lógica de Filtrado...
            if (normalizedLocation.length > 0 && !car.location.toLowerCase().includes(normalizedLocation)) return false;
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(car.type);
            if (!typeMatch) return false;
            if (car.price > maxPrice) return false;
            const featuresMatch = requiredFeatures.every(feature => car.features.includes(feature));
            if (!featuresMatch) return false;
            return true;
        });

        filteredVehiclesState = newlyFilteredVehicles;

        let vehiclesToRender = [...filteredVehiclesState];
        if (currentSortValue !== 'none') {
            vehiclesToRender = sortVehicles(vehiclesToRender, currentSortValue);
        }

        // Pasamos el término de búsqueda original (ej: "Mendoza") a renderCars
        // para que pueda mostrar el mensaje de error correctamente.
        renderCars(vehiclesToRender, searchLocationTerm);
    };

    /**
     * Descripción: Restablece todos los filtros (input de ubicación, checkboxes, slider de precio)
     * y vuelve a renderizar el array completo de vehículos.
     * @method clearFilters
     * @return {void}
     */
    const clearFilters = () => {
        locationSearchInput.value = '';

        filtersPanel.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        const maxVal = parseInt(priceRangeInput.max, 10);
        priceRangeInput.value = maxVal;
        updatePriceDisplay(); // Actualiza el display del precio

        filteredVehiclesState = [...vehiculos];
        currentSortValue = 'none';

        updateResultsTitle('');

        renderCars(vehiculos);
    };


    // ===============================================
    // ASIGNACIÓN DE EVENT LISTENERS
    // ===============================================

    initializeSearchFromUrl();

    // Asignación de la función de cálculo/muestra al input de rango
    updatePriceDisplay();
    priceRangeInput.addEventListener('input', updatePriceDisplay);

    // BÚSQUEDA POR UBICACIÓN
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            applyFilters();
        });
    }

    // Desplegables
    toggleSortBtn.addEventListener('click', () => togglePanel(sortPanel));
    toggleFiltersBtn.addEventListener('click', () => togglePanel(filtersPanel));

    // Aplicar
    applySortBtn.addEventListener('click', applySort);
    applyFiltersBtn.addEventListener('click', applyFilters);

    // Botón de Limpiar Filtros
    clearFiltersBtn.textContent = 'Limpiar Filtros';
    clearFiltersBtn.classList.add('apply-filters-btn', 'clear-filters-btn');

    const lastFilterGroup = filtersPanel.querySelector('.filter-group:last-of-type');
    if (lastFilterGroup) {
        lastFilterGroup.insertAdjacentElement('afterend', clearFiltersBtn);
    } else {
        filtersPanel.appendChild(clearFiltersBtn);
    }

    clearFiltersBtn.addEventListener('click', clearFilters);

    // Botón Reservar
    if (resultsList) {
        resultsList.addEventListener('click', (event) => {
            const reserveBtn = event.target.closest('.reserve-btn');

            if (reserveBtn) {
                event.preventDefault();
                alert("La función de Reserva se implementará pronto.");
            }
        });
    }
});