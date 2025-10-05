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

// 3. FUNCIÓN PRINCIPAL PARA CARGAR TODOS LOS VEHÍCULOS
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

// ===============================================
// 4. LÓGICA DE CONTROL (Dentro de DOMContentLoaded)
// ===============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Estado Actual de los Vehículos ---
    // Esta variable contendrá el array filtrado actualmente visible.
    let filteredVehiclesState = [...vehiculos];
    let currentSortValue = 'none'; // Almacena el último criterio de ordenamiento aplicado

    // --- Referencias del DOM ---
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


    if (!filtersPanel || !sortPanel) return;

    /**
     * Alterna la visibilidad de los paneles de filtro/ordenamiento.
     */
    const togglePanel = (panel) => {
        const otherPanel = (panel === sortPanel) ? filtersPanel : sortPanel;
        if (!otherPanel.classList.contains('hidden')) {
            otherPanel.classList.add('hidden');
        }
        panel.classList.toggle('hidden');
    };

    /**
     * Función que aplica el ordenamiento al array de vehículos proporcionado.
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

    // --- Lógica de Ordenamiento (Solo reordena el estado actual) ---
    const applySort = () => {
        currentSortValue = sortBySelect.value;

        // CORRECCIÓN CLAVE: Creamos una copia del estado filtrado para ordenarla.
        let sortedVehicles = [...filteredVehiclesState];

        sortedVehicles = sortVehicles(sortedVehicles, currentSortValue);

        renderCars(sortedVehicles);
        sortPanel.classList.add('hidden');
    };

    // --- Lógica de Filtrado (Calcula el nuevo estado y luego ordena) ---
    const applyFilters = () => {
        // 1. Obtener filtros de Tipo de Vehículo
        const typeCheckboxes = filtersPanel.querySelectorAll('input[name="type"]:checked, input[name="hatchback"]:checked');
        const selectedTypes = Array.from(typeCheckboxes).map(cb => cb.value);

        // 2. Obtener filtro de Precio Máximo
        const maxPrice = parseInt(priceRangeInput.value, 10);

        // 3. Obtener filtros de Características
        const featureCheckboxes = filtersPanel.querySelectorAll('input[name="feature"]:checked');

        // Mapear el valor del checkbox ('auto') al valor del modelo ('auto')
        const requiredFeatures = Array.from(featureCheckboxes).map(cb => {
            return cb.value === 'auto' ? 'auto' : cb.value;
        });

        // 4. Aplicar los filtros al array ORIGINAL 'vehiculos'
        const newlyFilteredVehicles = vehiculos.filter(car => {
            // Filtro 1: Tipo de Vehículo
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(car.type);
            if (!typeMatch) return false;

            // Filtro 2: Precio Máximo
            const priceMatch = car.price <= maxPrice;
            if (!priceMatch) return false;

            // Filtro 3: Características
            const featuresMatch = requiredFeatures.every(feature => car.features.includes(feature));
            if (!featuresMatch) return false;

            return true;
        });

        // 5. ACTUALIZAR EL ESTADO
        filteredVehiclesState = newlyFilteredVehicles;

        // 6. Aplicar el ÚLTIMO ordenamiento conocido al nuevo estado filtrado
        let vehiclesToRender = [...filteredVehiclesState];
        if (currentSortValue !== 'none') {
            vehiclesToRender = sortVehicles(vehiclesToRender, currentSortValue);
        }

        renderCars(vehiclesToRender);
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

        // 3. Resetear el estado de filtrado y ordenamiento
        filteredVehiclesState = [...vehiculos];
        currentSortValue = 'none';

        // 4. Renderizar todos los vehículos originales
        renderCars(vehiculos);
    };

    // ===============================================
    // 5. ASIGNACIÓN DE EVENT LISTENERS
    // ===============================================

    // Carga inicial: El estado y la vista iniciales son los vehículos originales.
    renderCars(vehiculos);

    // Desplegables (Toggle)
    toggleSortBtn.addEventListener('click', () => togglePanel(sortPanel));
    toggleFiltersBtn.addEventListener('click', () => togglePanel(filtersPanel));

    // Aplicar
    applySortBtn.addEventListener('click', applySort);
    applyFiltersBtn.addEventListener('click', applyFilters);

    // Rango de precio (input en vivo)
    priceRangeInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        currentPriceSpan.textContent = value.toLocaleString('es-AR');
    });

    // Botón de Limpiar Filtros (Creación e Inserción)
    clearFiltersBtn.textContent = 'Limpiar Filtros';
    clearFiltersBtn.classList.add('apply-filters-btn', 'clear-filters-btn');

    const lastFilterGroup = filtersPanel.querySelector('.filter-group:last-of-type');
    if (lastFilterGroup) {
        lastFilterGroup.insertAdjacentElement('afterend', clearFiltersBtn);
    } else {
        filtersPanel.appendChild(clearFiltersBtn);
    }

    clearFiltersBtn.addEventListener('click', clearFilters);

    // ===============================================
    // 6. ASIGNACIÓN DE EVENT LISTENER PARA BOTÓN RESERVAR (ALERTA) - ¡CORREGIDO!
    // ===============================================

    if (resultsList) { // resultsList ahora está garantizado de existir.
        // Usamos delegación de eventos en el contenedor principal
        resultsList.addEventListener('click', (event) => {
            const reserveBtn = event.target.closest('.reserve-btn');

            if (reserveBtn) {
                event.preventDefault();
                alert("La función de Reserva se implementará pronto.");
            }
        });
    }
});

// ===============================================================================================================
// ===============================================================================================================

/**
 * Alterna la visibilidad entre el panel de Login y el de Registro.
 * @param {string} panelId - El ID del formulario a mostrar ('login-panel' o 'register-panel').
 */
function showPanel(panelId) {
    const loginPanel = document.getElementById('login-panel');
    const registerPanel = document.getElementById('register-panel');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');

    // Alternar visibilidad de formularios
    loginPanel.classList.toggle('hidden-form', panelId !== 'login-panel');
    registerPanel.classList.toggle('hidden-form', panelId !== 'register-panel');

    // Alternar clases activas de los botones
    tabLogin.classList.toggle('active', panelId === 'login-panel');
    tabRegister.classList.toggle('active', panelId === 'register-panel');

    // Limpiar mensajes al cambiar de pestaña
    document.getElementById('login-message').textContent = '';
    document.getElementById('register-message').textContent = '';
}

/**
 * Maneja el envío del formulario de Registro.
 * Guarda el usuario en localStorage.
 */
function handleRegister(event) {
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
    storedUsers[email] = {
        name: name,
        password: password // NOTA: En producción, nunca guardes contraseñas sin hashear
    };
    localStorage.setItem('theraUsers', JSON.stringify(storedUsers));

    // 3. Mostrar éxito y redirigir
    console.log('Registro exitoso:', email);
    messageElement.style.color = 'green';
    messageElement.textContent = `¡Registro exitoso para ${name}! Redireccionando...`;

    event.target.reset(); // Limpiar formulario
    setTimeout(() => showPanel('login-panel'), 2000);
}

/**
 * Maneja el envío del formulario de Inicio de Sesión.
 * Compara con los datos guardados en localStorage.
 */
function handleLogin(event) {
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
        // Este es el mensaje que solicitaste si la cuenta no existe
        messageElement.textContent = "Error: No se encontró una cuenta con ese correo electrónico. Por favor, regístrese.";
        return;
    }

    // 2. Comprobar si la contraseña es correcta
    if (user.password === password) {
        // Login Exitoso
        messageElement.style.color = 'green';
        messageElement.textContent = `¡Bienvenido de vuelta, ${user.name}! Ingreso exitoso.`;
        // Aquí iría la redirección a la página principal
        // window.location.href = '/dashboard.html';
    } else {
        // Contraseña Incorrecta
        messageElement.textContent = "Error: Contraseña incorrecta.";
    }
}