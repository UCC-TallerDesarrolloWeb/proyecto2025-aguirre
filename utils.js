// La matriz de vehículos (constante)
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
        location: "Microcentro, CABA",
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
        distance: 7.8,
        location: "Villa Urquiza, CABA",
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

// 1. FUNCIÓN FLECHA: Genera el HTML de una tarjeta.
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

// 2. FUNCIÓN FLECHA: Principal para cargar todos los vehículos
const renderCars = (carList) => {
    const resultsList = document.querySelector('.results-list');
    if (!resultsList) return;

    resultsList.innerHTML = '';

    if (carList.length === 0) {
        resultsList.innerHTML = '<p style="padding: 20px; text-align: center;">No se encontraron autos con los filtros seleccionados.</p>';
        return;
    }

    const allCarsHTML = carList.map(createCarCardHTML).join('');
    resultsList.innerHTML = allCarsHTML;
};

// =========================================================
// 3. FUNCIÓN FLECHA: Lógica de la interfaz de Login/Registro
// =========================================================

/**
 * Función Flecha: Alterna la visibilidad entre el panel de Login y el de Registro.
 * @param {string} panelId - El ID del formulario a mostrar ('login-panel' o 'register-panel').
 */
const showPanel = (panelId) => { // <-- ¡Corregida a Función Flecha!
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
 * Función Flecha: Maneja el envío del formulario de Registro.
 * @param {Event} event - El evento de envío del formulario.
 */
const handleRegister = (event) => { // <-- ¡Corregida a Función Flecha!
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

    event.target.reset();
    setTimeout(() => showPanel('login-panel'), 2000);
};


/**
 * Función Flecha: Maneja el envío del formulario de Inicio de Sesión.
 * @param {Event} event - El evento de envío del formulario.
 */
const handleLogin = (event) => { // <-- ¡Corregida a Función Flecha!
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
        // Aquí iría la redirección a la página principal
    } else {
        // Contraseña Incorrecta
        messageElement.textContent = "Error: Contraseña incorrecta.";
    }
};


// =========================================================
// 4. FUNCIÓN FLECHA: Lógica de Búsqueda y Filtros
// (El resto del código se mueve dentro de DOMContentLoaded para mejor manejo de variables locales)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Variables de Estado y Referencias del DOM ---
    let filteredVehiclesState = [...vehiculos];
    let currentSortValue = 'none';

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

    if (!filtersPanel || !sortPanel) {
        // Si no estamos en car-search.html, solo inicializa la vista de account.html si existe
        if (document.getElementById('login-panel')) {
            showPanel('login-panel');
        }
        return;
    }

    /**
     * Función Flecha: Alterna la visibilidad de los paneles de filtro/ordenamiento.
     */
    const togglePanel = (panel) => {
        const otherPanel = (panel === sortPanel) ? filtersPanel : sortPanel;
        if (!otherPanel.classList.contains('hidden')) {
            otherPanel.classList.add('hidden');
        }
        panel.classList.toggle('hidden');
    };

    /**
     * Función Flecha: Aplica el ordenamiento al array de vehículos proporcionado.
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

    // --- Lógica de Ordenamiento ---
    const applySort = () => {
        currentSortValue = sortBySelect.value;

        let sortedVehicles = [...filteredVehiclesState];
        sortedVehicles = sortVehicles(sortedVehicles, currentSortValue);

        renderCars(sortedVehicles);
        sortPanel.classList.add('hidden');
    };

    // --- FUNCIÓN FLECHA: CALCULO/MUESTRA (updatePriceDisplay) ---
    /**
     * Cumple con el requisito de JS de cálculo/mostrar en base a un input.
     */
    const updatePriceDisplay = () => {
        if (priceRangeInput && currentPriceSpan) {
            // Formatea el valor con separadores de miles
            currentPriceSpan.textContent = parseInt(priceRangeInput.value).toLocaleString('es-AR');
        }
    };


    // --- Inicializar Búsqueda Desde URL ---
    const initializeSearchFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const locationParam = params.get('location');

        if (locationParam && locationSearchInput) {
            locationSearchInput.value = locationParam;
            applyFilters();
        } else {
            renderCars(vehiculos);
        }
    };

    // --- Lógica de Filtrado ---
    const applyFilters = () => {
        const searchLocationTerm = locationSearchInput.value.toLowerCase().trim();
        const typeCheckboxes = filtersPanel.querySelectorAll('input[name="type"]:checked, input[name="hatchback"]:checked');
        const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);
        const maxPrice = parseInt(priceRangeInput.value, 10);
        const featureCheckboxes = filtersPanel.querySelectorAll('input[name="feature"]:checked');
        const requiredFeatures = Array.from(featureCheckboxes).map(cb => cb.value);

        const newlyFilteredVehicles = vehiculos.filter(car => {

            // FILTRO A: UBICACIÓN
            if (searchLocationTerm.length > 0) {
                const locationMatch = car.location.toLowerCase().includes(searchLocationTerm);
                if (!locationMatch) return false;
            }

            // FILTRO B: Tipo de Vehículo
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(car.type);
            if (!typeMatch) return false;

            // FILTRO C: Precio Máximo
            const priceMatch = car.price <= maxPrice;
            if (!priceMatch) return false;

            // FILTRO D: Características
            const featuresMatch = requiredFeatures.every(feature => car.features.includes(feature));
            if (!featuresMatch) return false;

            return true;
        });

        filteredVehiclesState = newlyFilteredVehicles;

        let vehiclesToRender = [...filteredVehiclesState];
        if (currentSortValue !== 'none') {
            vehiclesToRender = sortVehicles(vehiclesToRender, currentSortValue);
        }

        renderCars(vehiclesToRender);
    };

    // --- Lógica de Limpiar Filtros ---
    const clearFilters = () => {
        locationSearchInput.value = '';

        filtersPanel.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        const maxVal = parseInt(priceRangeInput.max, 10);
        priceRangeInput.value = maxVal;
        updatePriceDisplay(); // Usa la función de flecha para actualizar el display

        filteredVehiclesState = [...vehiculos];
        currentSortValue = 'none';

        renderCars(vehiculos);
    };


    // ===============================================
    // 5. ASIGNACIÓN DE EVENT LISTENERS
    // ===============================================

    // Carga inicial y lógica de filtros
    initializeSearchFromUrl();

    // Asignación de la función de cálculo/muestra al input de rango
    updatePriceDisplay(); // Muestra el valor inicial
    priceRangeInput.addEventListener('input', updatePriceDisplay); // Actualiza al arrastrar


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