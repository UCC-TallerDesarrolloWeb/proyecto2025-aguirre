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

            // Aplica el scroll
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const dateStartInput = document.getElementById('searchBar_dateStart');
    const dateEndInput = document.getElementById('searchBar_dateEnd');
    // NOTA: 'maxDate' se obtiene del HTML (ej: 2026-12-31)
    const maxDate = dateStartInput.getAttribute('max');

    // --- CÁLCULO DE LA FECHA DE HOY ---
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${year}-${month}-${day}`;

    // 1. Establecer y asegurar el mínimo en el campo de inicio
    if (!dateStartInput.value) {
        dateStartInput.value = todayFormatted;
    }
    dateStartInput.setAttribute('min', todayFormatted);

    // 3. Validación de Rango (Min y Max): Si está fuera, se cambia a la fecha de hoy
    function validateAndResetDate(event) {
        const input = event.target;
        const inputDate = input.value;
        const originalValue = inputDate; // Guarda el valor para saber si hubo cambio

        // Comprueba si la fecha está fuera del rango (menor que hoy O mayor que maxDate)
        if (inputDate && (inputDate < todayFormatted || inputDate > maxDate)) {
            // Si la fecha está fuera de rango, la cambia a la fecha de hoy
            input.value = todayFormatted;
        }

        // Si el valor de dateStartInput cambió por esta validación, disparamos el 'change'
        // para que se actualice la restricción 'min' de dateEndInput inmediatamente.
        if (input === dateStartInput && originalValue !== input.value) {
            input.dispatchEvent(new Event('change'));
        }
    }

    // Aplicar validación al salir de cada campo
    dateStartInput.addEventListener('blur', validateAndResetDate);
    dateEndInput.addEventListener('blur', validateAndResetDate);

    // 2. Restricción: La fecha de devolución no debe ser anterior a la de alquiler
    dateStartInput.addEventListener('change', function () {
        // Ejecutar la validación del campo de inicio de nuevo para asegurar
        // que su valor sea válido ANTES de usarlo para establecer el 'min' de la devolución.
        // Esto previene que un valor fuera de rango establezca un min > max.
        validateAndResetDate({target: dateStartInput});

        // 1. Establece el 'min' de la fecha de fin igual a la fecha de inicio seleccionada
        dateEndInput.setAttribute('min', dateStartInput.value);

        // Forzar la validación de la fecha de fin contra el rango Min/Max
        // Esto es necesario para corregir cualquier valor inválido que aún persista en el campo de fin.
        validateAndResetDate({target: dateEndInput});

        // 2. Si la fecha de fin actual es anterior a la nueva fecha de inicio, la resetea
        if (dateEndInput.value && dateEndInput.value < dateStartInput.value) {
            dateEndInput.value = dateStartInput.value;
        }
    });

    // Aplicar la restricción inicial cuando la página carga
    dateEndInput.setAttribute('min', dateStartInput.value);
});