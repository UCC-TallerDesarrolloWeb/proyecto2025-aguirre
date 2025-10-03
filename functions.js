document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el contenedor deslizable
    const slider = document.querySelector('.carOptionsCarousel-container');

    // Variables de estado
    let isDown = false; // Indica si el botón del mouse está presionado
    let startX;         // Posición X donde comienza el arrastre
    let scrollLeft;     // Posición de desplazamiento inicial

    if (slider) {
        // 1. Mouse Down (Presionar)
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active'); // Para cambiar el cursor a 'grabbing'
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        // 2. Mouse Leave (Salir del área) y Mouse Up (Soltar)
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        // 3. Mouse Move (Mover)
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return; // Si no está presionado, ignora el movimiento
            e.preventDefault();  // Detiene la selección de texto

            // Calcula la nueva posición del mouse
            const x = e.pageX - slider.offsetLeft;

            // Calcula cuánto debe moverse el scroll. (1.5 es un multiplicador de velocidad)
            const walk = (x - startX) * 1.5;

            // Aplica el desplazamiento
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================
    // LÓGICA DE FILTROS Y ORDENAR (Página de Búsqueda - car-search.html)
    // =========================================================

    // Referencias a los elementos del DOM
    const toggleSortButton = document.getElementById('toggleSort');
    const sortPanel = document.getElementById('sort-panel');
    const toggleFiltersButton = document.getElementById('toggleFilters');
    const filtersPanel = document.getElementById('filters-panel');

    // Referencias internas de los filtros
    const priceRange = document.getElementById('price-range');
    const currentPriceSpan = document.getElementById('current-price');
    const sortBySelect = document.getElementById('sort-by');
    const applyFiltersButton = document.querySelector('.apply-filters-btn');
    const applySortButton = document.querySelector('.apply-sort-btn');


    // ---------------------------------------------------------
    // 1. GESTIÓN DE PANELES (Abrir/Cerrar y Auto-cierre)
    // ---------------------------------------------------------

    // Función para cerrar todos los paneles excepto el actual
    const closeAllPanels = (exceptionPanel) => {
        [sortPanel, filtersPanel].forEach(panel => {
            if (panel && panel !== exceptionPanel && !panel.classList.contains('hidden')) {
                panel.classList.add('hidden');
                const button = panel.previousElementSibling;
                if (button) {
                    button.classList.remove('active');
                }
            }
        });
    };

    // Función de Toggle genérica para ambos botones
    const setupToggleButton = (button, panel) => {
        if (button && panel) {
            button.addEventListener('click', () => {
                const isHidden = panel.classList.contains('hidden');
                closeAllPanels(panel); // Cierra el otro panel

                if (isHidden) {
                    panel.classList.remove('hidden');
                    button.classList.add('active');
                } else {
                    panel.classList.add('hidden');
                    button.classList.remove('active');
                }
            });
        }
    };

    // Asignar funcionalidad de Toggle a ambos botones
    setupToggleButton(toggleSortButton, sortPanel);
    setupToggleButton(toggleFiltersButton, filtersPanel);


    // Cierre de paneles al hacer clic fuera (global)
    document.addEventListener('click', (e) => {
        const isClickInsideSort = (sortPanel && sortPanel.contains(e.target)) || (toggleSortButton && toggleSortButton.contains(e.target));
        const isClickInsideFilters = (filtersPanel && filtersPanel.contains(e.target)) || (toggleFiltersButton && toggleFiltersButton.contains(e.target));

        if (!isClickInsideSort && !isClickInsideFilters) {
            closeAllPanels(null);
        }
    });

    // ---------------------------------------------------------
    // 2. Lógica de Filtrado y Ordenamiento
    // ---------------------------------------------------------

    // Obtiene todos los parámetros de filtrado y ordenamiento activos
    const getCurrentParams = () => {
        const filters = {};
        const sort = {};

        // 1. Obtener Filtros de Checkbox
        const checkboxes = document.querySelectorAll('#filters-panel input[type="checkbox"]:checked');
        checkboxes.forEach(cb => {
            const groupName = cb.name;
            if (!filters[groupName]) {
                filters[groupName] = [];
            }
            filters[groupName].push(cb.value);
        });

        // 2. Obtener Filtro de Precio Máximo
        if (priceRange) {
            filters.priceMax = parseInt(priceRange.value);
        }

        // 3. Obtener Ordenamiento
        if (sortBySelect) {
            sort.by = sortBySelect.value;
        }

        return { filters, sort };
    };

    // Función principal para filtrar y ordenar los resultados
    const updateResults = () => {
        const { filters, sort } = getCurrentParams();
        const resultsList = document.querySelector('.results-list');
        const allCards = Array.from(document.querySelectorAll('.search-car-card'));

        // 1. Filtrar las tarjetas
        const filteredCards = allCards.filter(card => {

            // A. Filtrar por Precio
            const cardPrice = parseInt(card.getAttribute('data-price'));
            if (filters.priceMax && cardPrice > filters.priceMax) {
                return false;
            }

            // B. Filtrar por Tipo (sedan, suv, etc.)
            if (filters.type && filters.type.length > 0) {
                const cardType = card.getAttribute('data-type');
                if (!filters.type.includes(cardType)) {
                    return false;
                }
            }

            // C. Filtrar por Características (automatic, ac)
            if (filters.feature && filters.feature.length > 0) {
                const cardFeatures = card.getAttribute('data-features').split(' ');
                // Comprueba si la tarjeta tiene *todas* las características seleccionadas
                for (const requiredFeature of filters.feature) {
                    if (!cardFeatures.includes(requiredFeature)) {
                        return false;
                    }
                }
            }

            return true; // Pasa todos los filtros
        });

        // 2. Ordenar las tarjetas filtradas
        filteredCards.sort((a, b) => {
            // Se asume que el valor de data-* a ordenar es el mismo que la primera parte del sort.by
            const sortKey = sort.by.split('-')[0]; // 'price', 'rating', 'distance'
            const sortValueA = parseFloat(a.getAttribute(`data-${sortKey}`));
            const sortValueB = parseFloat(b.getAttribute(`data-${sortKey}`));
            const direction = sort.by.endsWith('desc') ? -1 : 1;

            if (sortKey === 'price' || sortKey === 'distance') {
                return (sortValueA - sortValueB) * direction;
            } else if (sortKey === 'rating') {
                // Calificación: siempre es mejor mostrar más alto primero (descendente)
                return (sortValueB - sortValueA);
            }

            return 0;
        });

        // 3. Re-renderizar (actualizar la vista)
        resultsList.innerHTML = ''; // Limpiar la lista actual
        filteredCards.forEach(card => {
            resultsList.appendChild(card); // Añadir las tarjetas filtradas y ordenadas
        });

        // Muestra u oculta las tarjetas originales que no pasaron el filtro (solo si no se re-renderiza)
        // allCards.forEach(card => card.style.display = filteredCards.includes(card) ? 'flex' : 'none');
    };

    // ---------------------------------------------------------
    // 3. FUNCIONALIDAD DE FILTROS INDIVIDUALES
    // ---------------------------------------------------------

    // Funcionalidad del Range Slider (Precio Máximo)
    if (priceRange && currentPriceSpan) {
        currentPriceSpan.textContent = parseInt(priceRange.value).toLocaleString('es-AR');

        priceRange.addEventListener('input', (e) => {
            const price = parseInt(e.target.value);
            currentPriceSpan.textContent = price.toLocaleString('es-AR');
        });
    }

    // Lógica para el botón Aplicar Filtros
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            updateResults(); // Aplica filtros y ordena
            console.log("Filtros Aplicados. Resultados Actualizados.");
            closeAllPanels(null);
        });
    }

    // Lógica para el botón Aplicar Sort By
    if (applySortButton) {
        applySortButton.addEventListener('click', () => {
            updateResults(); // Ordena los resultados
            console.log("Ordenamiento Aplicado. Resultados Actualizados.");
            closeAllPanels(null);
        });
    }
});