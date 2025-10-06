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