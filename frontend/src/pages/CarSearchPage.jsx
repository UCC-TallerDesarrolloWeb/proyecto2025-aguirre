import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import CarCard from '@components/CarCard';
import Button from '@components/Button';
import {getAllVehicles, sortVehicles} from '@api/vehiclesApi.js'; // Uso de async/await

const MAX_PRICE_DEFAULT = 30000;

const CarSearchPage = () => {
    // Hooks de Estado (Requisito: useState)
    const location = useLocation();
    const [allVehicles, setAllVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado de los controles
    const [sortValue, setSortValue] = useState('price-asc');
    const [filters, setFilters] = useState({
        location: '',
        types: [], // Ej: ['sedan', 'suv']
        maxPrice: MAX_PRICE_DEFAULT,
        features: [], // Ej: ['auto', 'ac']
    });
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Referencias del DOM para Controles (necesarias para la lógica de filtros)
    const resultsTitleH1 = document.querySelector('.car-list-column h1');

    // --- FUNCIONES DE LÓGICA DE FILTRADO Y ORDENAMIENTO (useCallback) ---

    /**
     * Aplica el filtrado a la lista completa de vehículos según el estado actual de los filtros.
     */
    const filterAndSort = useCallback((vehiclesList, currentFilters, currentSort) => {
        const {location, types, maxPrice, features} = currentFilters;
        const normalizedLocation = location.toLowerCase().trim();

        const newlyFiltered = vehiclesList.filter(car => {
            // Filtro por Ubicación
            if (normalizedLocation.length > 0 && !car.location.toLowerCase().includes(normalizedLocation)) {
                return false;
            }

            // Filtro por Tipo (si no hay tipos seleccionados, todos matchean)
            const typeMatch = types.length === 0 || types.includes(car.type);
            if (!typeMatch) return false;

            // Filtro por Precio
            if (car.price > maxPrice) return false;

            // Filtro por Características (debe tener TODAS las features requeridas)
            const featuresMatch = features.every(feature => car.features.includes(feature));
            if (!featuresMatch) return false;

            return true;
        });

        // Aplicar Ordenamiento
        const sorted = sortVehicles([...newlyFiltered], currentSort);
        setFilteredVehicles(sorted);
    }, [filters, sortValue]); // Depende de todos los estados de filtro/orden

    /**
     * Actualiza el H1 de resultados con la ubicación buscada.
     */
    const updateResultsTitle = (locationName) => {
        if (!resultsTitleH1) return;

        if (locationName && locationName.trim().length > 0) {
            const formattedName = locationName.charAt(0).toUpperCase() + locationName.slice(1);
            resultsTitleH1.textContent = `Autos disponibles en ${formattedName}`;
        } else {
            resultsTitleH1.textContent = "Autos disponibles en Argentina";
        }
    };

    // --- EFECTOS DE CARGA Y BÚSQUEDA INICIAL (Requisito: useEffect) ---

    /**
     * 1. Carga inicial de datos (async/await) y procesamiento de URL.
     */
    useEffect(() => {
        const fetchAndInitialize = async () => {
            setLoading(true);

            // Obtener datos del mock service
            const data = await getAllVehicles();
            setAllVehicles(data);

            // Inicializar filtros desde URL (ej: /car-search.html?location=Cordoba)
            const params = new URLSearchParams(location.search);
            const locationParam = params.get('location') || '';

            // Aplicar el estado inicial de la ubicación y precio
            setFilters(prev => ({
                ...prev,
                location: locationParam,
                maxPrice: MAX_PRICE_DEFAULT
            }));

            // Aplicar los filtros iniciales inmediatamente después de cargar
            filterAndSort(data, {
                location: locationParam,
                types: [],
                maxPrice: MAX_PRICE_DEFAULT,
                features: []
            }, sortValue);

            updateResultsTitle(locationParam);
            setLoading(false);
        };
        fetchAndInitialize();
    }, []); // Solo se ejecuta al montar el componente

    /**
     * 2. Re-ejecutar filtrado cuando cambian los filtros (después de la carga inicial).
     */
    useEffect(() => {
        if (!loading) {
            filterAndSort(allVehicles, filters, sortValue);
            updateResultsTitle(filters.location);
        }
    }, [filters, sortValue, allVehicles, loading, filterAndSort]);

    // --- MANEJADORES DE EVENTOS DE FORMULARIO ---

    const handleFilterChange = (e) => {
        const {name, value, checked, type} = e.target;

        if (type === 'checkbox') {
            setFilters(prev => {
                const newArray = checked
                    ? [...prev[name], value]
                    : prev[name].filter(item => item !== value);
                return {...prev, [name]: newArray};
            });
        } else if (type === 'range') {
            setFilters(prev => ({...prev, maxPrice: parseInt(value, 10)}));
        } else if (name === 'location') {
            setFilters(prev => ({...prev, location: value}));
        }
    };

    const handleApplyFilters = () => {
        // Cierra el panel y el useEffect se encarga de aplicar los filtros
        setIsFiltersOpen(false);
    };

    const handleClearFilters = () => {
        setFilters({
            location: '',
            types: [],
            maxPrice: MAX_PRICE_DEFAULT,
            features: [],
        });
        setSortValue('price-asc');
    };

    const handleApplySort = () => {
        // Cierra el panel y el useEffect se encarga de aplicar el orden
        setIsSortOpen(false);
    };

    // --- RENDERIZADO DE LA LISTA Y MENSAJE ---

    const renderCarList = () => {
        if (filteredVehicles.length === 0) {
            // Lógica migrada de utils.js para mensajes inteligentes
            const locationQuery = filters.location.trim();
            if (locationQuery.length > 0) {
                const locationExistsInDB = allVehicles.some(car => car.location.toLowerCase().includes(locationQuery.toLowerCase()));

                if (locationExistsInDB) {
                    return <p className="no-results-message">No se encontraron autos con los **filtros** seleccionados
                        en "{locationQuery}"</p>;
                } else {
                    return <p className="no-results-message">No hay autos listados en la localidad
                        "{locationQuery}"</p>;
                }
            }
            return <p className="no-results-message">No se encontraron autos con los filtros seleccionados</p>;
        }
        return filteredVehicles.map(car => <CarCard key={car.id} car={car}/>);
    };

    // --- Renderizado Principal (JSX) ---

    if (loading) return <main className="search-results-page">Cargando autos disponibles...</main>;

    return (
        <main className="search-results-page">
            <div className="car-list-column">

                {/* CONTROLES DE FILTRO Y ORDENAR */}
                <div className="controls-bar-split">
                    <div className="control-group">
                        <button className="toggle-control-btn" onClick={() => setIsSortOpen(!isSortOpen)}>
                            <span className="icon">⇅</span>Ordenar por
                        </button>
                        <div className={`control-panel ${isSortOpen ? '' : 'hidden'}`} id="sort-panel">
                            <div className="filter-group">
                                <label htmlFor="sort-by"></label>
                                <select
                                    className="sort-select"
                                    id="sort-by"
                                    value={sortValue}
                                    onChange={(e) => setSortValue(e.target.value)}
                                >
                                    <option value="price-asc">Precio (más bajo)</option>
                                    <option value="price-desc">Precio (más alto)</option>
                                    <option value="rating">Mejor Calificación</option>
                                    <option value="distance">Distancia</option>
                                </select>
                                <Button className="apply-sort-btn" onClick={handleApplySort}>Aplicar</Button>
                            </div>
                        </div>
                    </div>

                    <div className="control-group">
                        <button className="toggle-control-btn" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                            <span className="icon">▾</span>Filtros
                        </button>
                        <div className={`control-panel ${isFiltersOpen ? '' : 'hidden'}`} id="filters-panel">

                            {/* TIPO DE VEHÍCULO */}
                            <div className="filter-group">
                                <h4>Tipo de Vehículo</h4>
                                <div className="filter-options-grid">
                                    {['sedan', 'suv', 'hatchback'].map(type => (
                                        <label key={type}>
                                            <input
                                                name="types"
                                                type="checkbox"
                                                value={type}
                                                checked={filters.types.includes(type)}
                                                onChange={handleFilterChange}
                                            />
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <hr/>

                            {/* PRECIO MÁXIMO (Requisito: Cálculo/Muestra de input) */}
                            <div className="filter-group">
                                <h4>Precio Máximo</h4>
                                <label htmlFor="price-range"></label>
                                <input
                                    id="price-range"
                                    name="maxPrice"
                                    max={MAX_PRICE_DEFAULT}
                                    min="5000"
                                    step="1000"
                                    type="range"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                />
                                <p>Hasta $<span id="current-price">{filters.maxPrice.toLocaleString('es-AR')}</span> /
                                    día</p>
                            </div>
                            <hr/>

                            {/* CARACTERÍSTICAS */}
                            <div className="filter-group">
                                <h4>Características</h4>
                                {['auto', 'ac', 'gps'].map(feature => (
                                    <label key={feature}>
                                        <input
                                            name="features"
                                            type="checkbox"
                                            value={feature}
                                            checked={filters.features.includes(feature)}
                                            onChange={handleFilterChange}
                                        />
                                        {feature.toUpperCase()}
                                    </label>
                                ))}
                            </div>

                            <Button className="apply-filters-btn" onClick={handleApplyFilters}>Aplicar Filtros</Button>
                            <Button variant="primary" className="clear-filters-btn" onClick={handleClearFilters}>Limpiar
                                Filtros</Button>
                        </div>
                    </div>
                </div>

                {/* TÍTULO Y LISTA DE RESULTADOS */}
                <h1>Autos disponibles en {filters.location || 'Argentina'}</h1>
                <div className="results-list">
                    {renderCarList()}
                </div>
            </div>

            <div className="map-column">
                <div id="map-container">
                    <iframe
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d133823.20884157837!2d-64.18993869252525!3d-31.4221598890787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1759422980713!5m2!1ses!2sar"
                        style={{border: 0}}
                    ></iframe>
                </div>
            </div>
        </main>
    );
};

export default CarSearchPage;