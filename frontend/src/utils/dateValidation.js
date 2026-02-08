/**
 * Valida si una fecha está dentro del rango permitido (Hoy - MAX_DATE).
 * @param {string} currentDate - La fecha ingresada por el usuario.
 * @param {string} todayFormatted - Fecha de hoy en formato YYYY-MM-DD.
 * @param {string} MAX_DATE - Fecha límite superior.
 * @returns {string} - La fecha validada o la fecha de hoy si es inválida.
 */
export const validateDateRange = (currentDate, todayFormatted, MAX_DATE) => {
    const todayDate = new Date(todayFormatted);
    const maxDate = new Date(MAX_DATE);
    const inputDate = new Date(currentDate);

    // Si la fecha es anterior a hoy O posterior a la fecha máxima, retornamos hoy
    if (inputDate < todayDate || inputDate > maxDate) {
        return todayFormatted;
    }

    return currentDate;
};